import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { endpoint } = await req.json();
  if (!endpoint) {
    return NextResponse.json(
      { error: 'Endpoint is required' },
      { status: 400 }
    );
  }

  try {
    const modelsUrl = new URL('/v1/models', endpoint).toString();
    const response = await fetch(modelsUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
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
        // Not a JSON error, use text
      }
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('API models route error:', error);
    let message = error.message || 'Failed to connect to the model endpoint.';
    if (
      (error.cause as any)?.code === 'ECONNREFUSED' ||
      message.includes('fetch failed')
    ) {
      message = `Could not connect to the endpoint at ${endpoint}. Please ensure the server is running and accessible from the application environment. If you are connecting to a local server, it may not be reachable from the cloud development environment.`;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
