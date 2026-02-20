import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { endpoint } = await req.json();
    if (!endpoint) {
      return NextResponse.json(
        { error: 'Endpoint is required' },
        { status: 400 }
      );
    }

    const modelsUrl = new URL('/v1/models', endpoint).toString();
    const response = await fetch(modelsUrl, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Proxy error response text:", errorText);
        // Try to parse as JSON, but fall back to text
        try {
            const errorData = JSON.parse(errorText);
             throw new Error(errorData?.error?.message || `Endpoint responded with status: ${response.status}`);
        } catch (e) {
             throw new Error(errorText || `Endpoint responded with status: ${response.status}`);
        }
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to connect to the model endpoint.' },
      { status: 500 }
    );
  }
}
