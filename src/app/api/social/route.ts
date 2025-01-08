
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';

const readCsv = async (filePath: string) => {
  return new Promise<{
    labels: string[];
    likes: number[];
    shares: number[];
    comments: number[];
  }>((resolve, reject) => {
    const data: {
      labels: string[];
      likes: number[];
      shares: number[];
      comments: number[];
    } = {
      labels: [],
      likes: [],
      shares: [],
      comments: [],
    };

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        try {
          data.labels.push(row['Post_Type']);
          data.likes.push(parseInt(row['Likes'], 10));
          data.shares.push(parseInt(row['Shares'], 10));
          data.comments.push(parseInt(row['Comments'], 10));
        } catch (err) {
          console.error('Error processing row:', err);
        }
      })
      .on('end', () => resolve(data))
      .on('error', reject);
  });
};


export async function GET() {
  const filePath = path.join(process.cwd(), 'data', 'data.csv');
  try {
    const data = await readCsv(filePath);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error reading CSV file:', error);
    return NextResponse.json({ error: 'Failed to read CSV file' }, { status: 500 });
  }
}
