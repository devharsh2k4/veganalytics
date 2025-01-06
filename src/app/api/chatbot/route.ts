
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const BASE_API_URL = process.env.NEXT_PUBLIC_LANGFLOW_API_URL;
const LANGFLOW_ID = process.env.NEXT_PUBLIC_LANGFLOW_ID;
const ENDPOINT = process.env.NEXT_PUBLIC_LANGFLOW_ENDPOINT;
const APPLICATION_TOKEN = process.env.NEXT_PUBLIC_LANGFLOW_APPLICATION_TOKEN;

async function runFlow(
  message: string,
  endpoint: string = ENDPOINT || "defaultEndpoint",
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { message } = req.body;

    if (!message) {
      res.status(400).json({ error: "No message provided" });
      return;
    }

    try {
      const response = await runFlow(message);

      if (response.error) {
        res.status(500).json(response);
        return;
      }

      const messageData =
        response?.outputs?.[0]?.outputs?.[0]?.results?.message?.text ||
        "Sorry, I did not understand that.";

      res.status(200).json({ reply: messageData });
    } catch (error) {
      console.error("Error processing chatbot request:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
