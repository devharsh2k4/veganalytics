import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const BASE_API_URL = process.env.NEXT_PUBLIC_LANGFLOW_API_URL;
const LANGFLOW_ID = process.env.NEXT_PUBLIC_LANGFLOW_ID;
const ENDPOINT = process.env.NEXT_PUBLIC_LANGFLOW_ENDPOINT || "defaultEndpoint";
const APPLICATION_TOKEN = process.env.NEXT_PUBLIC_LANGFLOW_APPLICATION_TOKEN;

async function runFlow(
  message: string,
  endpoint: string = ENDPOINT,
  outputType: string = "chat",
  inputType: string = "chat",
  tweaks?: Record<string, unknown>
) {
  const apiUrl = `${BASE_API_URL}/lf/${LANGFLOW_ID}/api/v1/run/${endpoint}`;
  const payload = {
    input_value: message,
    output_type: outputType,
    input_type: inputType,
    ...(tweaks && { tweaks }),
  };

  try {
    const response = await axios.post(apiUrl, payload, {
      headers: {
        Authorization: `Bearer ${APPLICATION_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error calling Langflow API:", error);
    return { error: "API request failed." };
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { error: "No message provided" },
        { status: 400 }
      );
    }

    const response = await runFlow(message);

    if (response.error) {
      return NextResponse.json(response, { status: 500 });
    }

    const messageData =
      response?.outputs?.[0]?.outputs?.[0]?.results?.message?.text ||
      "Sorry, I did not understand that.";

    return NextResponse.json({ reply: messageData });
  } catch (error) {
    console.error("Error processing chatbot request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
