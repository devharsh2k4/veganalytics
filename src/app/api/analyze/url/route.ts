import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const response = await axios.get(url);
    const data = response.data;

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching data from URL:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from the URL" },
      { status: 500 }
    );
  }
}
