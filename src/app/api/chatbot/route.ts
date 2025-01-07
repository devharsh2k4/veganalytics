import { NextRequest, NextResponse } from "next/server";

class LangflowClient {
  constructor(private baseURL: string, private applicationToken: string) {}

  async post(endpoint: string, body: Record<string, unknown>, headers: Record<string, string> = {}) {
    headers["Authorization"] = `Bearer ${this.applicationToken}`;
    headers["Content-Type"] = "application/json";

    const url = `${this.baseURL}${endpoint}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      const responseMessage = await response.text();

      if (!response.ok) {
        throw new Error(
          `${response.status} ${response.statusText} - ${responseMessage}`
        );
      }

      try {
        return JSON.parse(responseMessage);
      } catch {
        return responseMessage; // Handle non-JSON responses gracefully
      }
    } catch (error) {
      console.error("Request Error:", error);
      throw error;
    }
  }

  async runFlow(
    flowIdOrName: string,
    langflowId: string,
    inputValue: string,
    inputType = "chat",
    outputType = "chat",
    tweaks = {},
    stream = false
  ) {
    const endpoint = `/lf/${langflowId}/api/v1/run/${flowIdOrName}?stream=${stream}`;
    return this.post(endpoint, {
      input_value: inputValue,
      input_type: inputType,
      output_type: outputType,
      tweaks,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "No message provided" }, { status: 400 });
    }

    const flowIdOrName = process.env.FLOWID_NAME!;
    const langflowId = process.env.LANGFLOW_ID!;
    const applicationToken = process.env.LANGFLOW_APPLICATION_TOKEN!;
    const baseURL = process.env.BASE_API_URL!;

    const tweaks = {
      "Prompt-vTI5V": {
        template: "You are a social media analyst. Analyze the provided data and answer the user's question: '{question}'.",
      },
    };

    const langflowClient = new LangflowClient(baseURL, applicationToken);
    const response = await langflowClient.runFlow(
      flowIdOrName,
      langflowId,
      message,
      "chat",
      "chat",
      tweaks
    );

    let reply;

    if (typeof response === "string") {
      reply = response;
    } else {
      reply =
        response?.outputs?.[0]?.outputs?.[0]?.results?.message?.text ||
        "No response available from Langflow.";
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Error running Langflow API:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: String(error),
      },
      { status: 500 }
    );
  }
}
