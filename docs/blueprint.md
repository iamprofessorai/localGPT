# **App Name**: zeroLLM

## Core Features:

- Unified LLM Chat Interface: Provide a central dashboard for quick chat interactions, including active model selection, temperature control, max tokens, streaming toggle, and conversation saving across all configured LLM providers.
- LLM Provider Management: Enable users to add, configure, test connections, and toggle various LLM providers (e.g., Ollama, OpenAI, custom REST endpoints), including auto-detection for local servers.
- Advanced Prompt Playground: A dedicated power-user screen featuring a Monaco Editor for complex prompts, side-by-side model comparison, live streaming output, and real-time display of token counts, cost estimations (for paid APIs), and latency.
- Workflow Automation Builder: A visual drag-and-drop tool to construct linear LLM workflows by chaining blocks such as prompt templates, model calls (leveraging an AI tool), JSON extractors, and basic conditional logic.
- Persistent Agent System: Create and manage persistent agents with configurable memory, specific system prompts, and predefined tool bindings (e.g., file readers) for automated and specialized tasks.
- Usage & Cost Analytics: Display a dashboard with charts and metrics for monitoring LLM usage across providers, tracking cost over time, token consumption, and model latency, especially valuable for team and monetization features.
- Prompt & Config Presets: Allow users to save, manage, and load custom prompt templates, model configurations, and parameter sets as presets for rapid reuse in the chat interface or playground.

## Style Guidelines:

- Color scheme: Dark. Chosen to convey a sense of professionalism and focus, ideal for long work sessions by power users. It provides a contemporary, high-contrast canvas for technical applications.
- Primary color: '#5AC2FF'. A vibrant, cool blue for interactive elements like buttons, active states, and primary highlights. It offers a clear focal point against the dark background, signaling efficiency and precision.
- Background color: '#121A1E'. A very dark, subtly blue-tinted grey, providing a deep and understated base that is easy on the eyes. This dark neutral allows content and interactive elements to stand out without visual clutter.
- Accent color: '#AE99FF'. A soft, bright violet. This analogous color serves as a secondary highlight for specific data points, notifications, or less critical interactive elements, offering a pleasant visual contrast to the primary blue without overpowering it.
- Headline font: 'Space Grotesk' (sans-serif), for its modern, tech-inspired character that aligns with the 'control center' feel. Body font: 'Inter' (sans-serif), chosen for its readability and versatility in presenting detailed information for power users. Code font: 'Source Code Pro' (monospace), for code snippets within the Monaco editor and other technical displays.
- Use a set of clear, minimalist line icons. The style should be sharp and modern, providing immediate comprehension for various actions and system statuses, consistent with a sophisticated 'control center' aesthetic.
- Employ a 'Clean SaaS Style' layout: a fixed left sidebar for primary navigation, a top bar for global actions (model selection, user menu), and a dynamic main content area optimized for data-rich interfaces like chat logs, analytics dashboards, and workflow builders. Ensure responsiveness for different screen sizes while maintaining information density for power users.
- Implement subtle, functional animations for state transitions, loading indicators, and user feedback. Animations should feel fast and precise, contributing to a fluid user experience without being distracting or frivolous, reinforcing the app's 'control center' and efficiency theme.