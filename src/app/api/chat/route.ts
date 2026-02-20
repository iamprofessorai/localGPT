import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { endpoint, payload } = await req.json();

    if (!endpoint || !payload) {
      return NextResponse.json(
        { error: 'Endpoint and payload are required' },
        { status: 400 }
      );
    }

    const chatUrl = new URL('/v1/chat/completions', endpoint).toString();

    const response = await fetch(chatUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData?.error?.message || `Request failed with status: ${response.status}`
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: { message: error.message || 'An unexpected error occurred.' } },
      { status: 500 }
    );
  }
}
