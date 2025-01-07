import { NextResponse } from "next/server";
import fs from "fs";
import csvParser from "csv-parser";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "data.csv");

export async function GET() {
  try {
    // Check if the file exists
    if (!fs.existsSync(dataFilePath)) {
      return NextResponse.json(
        { error: "Data file not found" },
        { status: 404 }
      );
    }

    // Parse the CSV file
    const data = await new Promise((resolve, reject) => {
      const results: Record<string, string>[] = [];
      fs.createReadStream(dataFilePath)
        .pipe(csvParser())
        .on("data", (row) => results.push(row))
        .on("end", () => resolve(results))
        .on("error", (err) => reject(err));
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error reading data file:", error);
    return NextResponse.json(
      { error: "Failed to process data file" },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
