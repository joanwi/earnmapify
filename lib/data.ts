import clientPromise from "@/lib/mongodb"
import type { PlatformSubs, MoneyMakingSite, IndustryLeader } from "@/lib/types"
import { unstable_cache } from 'next/cache'

// 原始数据获取函数
async function _getPlatformDataFromDB() {
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
}

// 使用 Next.js 数据缓存
const _getCachedPlatformData = unstable_cache(
  _getPlatformDataFromDB,
  ['platform-data'],
  {
    revalidate: 43200, // 12小时
    tags: ['platform-data']
  }
);

export async function getPlatformData() {
  try {
    return await _getCachedPlatformData();
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

// 原始数据获取函数
async function _getTopPaidSitesFromDB() {
  const client = await clientPromise;
  const db = client.db("earnmap");
  
  const sites = await db
    .collection<MoneyMakingSite>("moneymaking")
    .find({})
    .toArray();
    
  return sites.map(site => {
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
}

// 使用 Next.js 数据缓存
const _getCachedTopPaidSites = unstable_cache(
  _getTopPaidSitesFromDB,
  ['top-paid-sites'],
  {
    revalidate: 43200, // 12小时
    tags: ['top-paid-sites']
  }
);

export async function getTopPaidSites() {
  try {
    return await _getCachedTopPaidSites();
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}


// 原始数据获取函数
async function _getIndustryLeadersFromDB() {
  const client = await clientPromise;
  const db = client.db("earnmap");
  
  const industryData = await db
    .collection<IndustryLeader>("industryleaders")
    .find({})
    .toArray();
  
  const industrySites = industryData.map(item => ({
    ...item,
    _id: item._id.toString(), 
  }));
  
  return industrySites;
}

// 使用 Next.js 数据缓存
const _getCachedIndustryLeaders = unstable_cache(
  _getIndustryLeadersFromDB,
  ['industry-leaders'],
  {
    revalidate: 43200, // 12小时
    tags: ['industry-leaders']
  }
);

export async function getIndustryLeaders() {
  try {
    return await _getCachedIndustryLeaders();
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
} 