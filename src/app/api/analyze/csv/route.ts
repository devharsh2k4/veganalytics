import { NextRequest, NextResponse } from "next/server";
import formidable, { Fields, Files } from "formidable";
import fs from "fs";
import csvParser from "csv-parser";
import path from "path";
import { IncomingMessage } from "http";
import { Socket } from "net";

const tempDir = path.join(process.cwd(), "tmp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parsing
  },
};

// Helper function to parse CSV
const parseCsv = async (filePath: string): Promise<Record<string, unknown>[]> => {
  return new Promise((resolve, reject) => {
    const data: Record<string, unknown>[] = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row) => data.push(row))
      .on("end", () => resolve(data))
      .on("error", (err) => reject(err));
  });
};

// Function to parse form data with formidable
const parseForm = (req: IncomingMessage): Promise<{ fields: Fields; files: Files }> => {
  const form = formidable({
    uploadDir: tempDir,
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB limit
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};

// Middleware to convert NextRequest to a Node.js IncomingMessage
async function toNodeJsRequest(req: NextRequest): Promise<IncomingMessage> {
  const reader = req.body?.getReader();
  if (!reader) throw new Error("Request body is empty");

  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }

  const buffer = Buffer.concat(chunks);
  const incomingMessage = new IncomingMessage(null as unknown as Socket);

  incomingMessage.push(buffer);
  incomingMessage.push(null);
  incomingMessage.headers = {};
  req.headers.forEach((value, key) => {
    incomingMessage.headers[key] = value;
  });
  incomingMessage.method = req.method;
  incomingMessage.url = req.url;

  return incomingMessage;
}

export async function POST(req: NextRequest) {
  try {
    // Convert NextRequest to IncomingMessage
    const incomingMessage = await toNodeJsRequest(req);

    // Parse form data using formidable
    const { files } = await parseForm(incomingMessage);

    if (!files.file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    const data = await parseCsv(file.filepath);

    // Clean up the temporary file
    fs.unlinkSync(file.filepath);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error processing CSV file:", error);
    return NextResponse.json(
      { error: "Failed to process CSV file" },
      { status: 500 }
    );
  }
}
