import clientPromise from "@/lib/mongodb"
import type { PlatformSubs, MoneyMakingSite } from "@/lib/types"

export async function getPlatformData() {
  try {
    const client = await clientPromise;
    const db = client.db("earnmap");
    
    const platformSubs = await db
      .collection<PlatformSubs>("platformsubs")
      .find({})
      .toArray();
      
    return platformSubs.map(sub => {
      let trafficShare = sub.trafficShare;
      if (trafficShare && !trafficShare.includes('%')) {
        trafficShare = `${trafficShare}%`;
      }
      return {
        ...sub,
        _id: sub._id.toString(), 
        trafficShare
      };
    });
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function getTopPaidSites() {
  try {
    const client = await clientPromise;
    const db = client.db("earnmap");
    
    const sites = await db
      .collection<MoneyMakingSite>("moneymaking")
      .find({})
      .toArray();
      
    return sites.map(site => {
      // 确保 trafficShare 格式一致
      let trafficShare = site.trafficShare;
      if (trafficShare && !trafficShare.includes('%')) {
        trafficShare = `${trafficShare}%`;
      }
      
      return {
        ...site,
        _id: site._id.toString(),
        trafficShare
      };
    });
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}