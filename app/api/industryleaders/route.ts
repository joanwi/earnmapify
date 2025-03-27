import clientPromise from "@/lib/mongodb";
import { IndustryLeader } from "@/lib/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("earnmap");
    
    const industryData = await db
      .collection<IndustryLeader>("industryleaders")
      .find({})
      .toArray();
    
    // 转换MongoDB文档格式以便JSON响应
    const serializedData = industryData.map(item => ({
      ...item,
      _id: item._id.toString(), // 将ObjectId转换为字符串
    }));
    
    return NextResponse.json(serializedData);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch industry leaders data" },
      { status: 500 }
    );
  }
} 