import clientPromise from "@/lib/mongodb";
import { MoneyMakingSite } from "@/lib/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("earnmap");
    
    const sites = await db
      .collection<MoneyMakingSite>("moneymaking")
      .find({})
      .toArray();
    
    // Convert MongoDB document format for JSON response
    const serializedSites = sites.map(site => ({
      ...site,
      _id: site._id.toString() // Convert ObjectId to string
    }));
    
    return NextResponse.json(serializedSites);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch sites data" },
      { status: 500 }
    );
  }
} 