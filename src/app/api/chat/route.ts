import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { endpoint, payload } = await req.json();

  if (!endpoint || !payload) {
    return NextResponse.json(
      { error: 'Endpoint and payload are required' },
      { status: 400 }
    );
  }

  try {
    const chatUrl = new URL('/v1/chat/completions', endpoint).toString();

    const response = await fetch(chatUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = errorText;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage =
          errorJson.error?.message ||
          errorJson.error ||
          errorJson.message ||
          errorText;
      } catch (e) {
        // Not JSON
      }
      return NextResponse.json({ error: errorMessage }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('API chat route error:', error);
    let message = error.message || 'An unexpected error occurred.';
    if (
      (error.cause as any)?.code === 'ECONNREFUSED' ||
      message.includes('fetch failed')
    ) {
      message = `Could not connect to the endpoint at ${endpoint}. Please ensure the server is running and accessible from the application environment. If you are connecting to a local server, it may not be reachable from the cloud development environment.`;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
