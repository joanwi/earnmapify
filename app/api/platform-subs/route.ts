import clientPromise from "@/lib/mongodb";
import { PlatformSubs } from "@/lib/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("earnmap");
    
    const platformSubs = await db
      .collection<PlatformSubs>("platformsubs")
      .find({})
      .toArray();
    
    // 转换MongoDB文档格式以便JSON响应
    const serializedPlatformSubs = platformSubs.map(sub => ({
      ...sub,
      _id: sub._id.toString() // 将ObjectId转换为字符串
    }));
    
    return NextResponse.json(serializedPlatformSubs);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch platform subs data" },
      { status: 500 }
    );
  }
} 