# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Deploying to Vercel

This application is ready to be deployed to [Vercel](https://vercel.com/).

### Environment Variables

Before deploying, you will need to set up the following environment variable in your Vercel project settings:

- `GEMINI_API_KEY`: Your API key for Google Gemini. This is required for the GenAI features to work.

You can get your API key from [Google AI Studio](https://makersuite.google.com/).

### Local Models on Vercel

The functionality to connect to a local model (e.g., Ollama running on `http://localhost:11434`) will not work on your Vercel deployment. The deployed application runs in the cloud and cannot access services on your local machine.

To use a custom model on Vercel, it must be accessible via a public internet endpoint.

### Function Timeouts

This application is configured with a 60-second execution timeout for server functions, which is necessary for some AI-related tasks that can take longer to complete. This is handled via Next.js Route Segment Config.
