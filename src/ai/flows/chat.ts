'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const ChatInputSchema = z.object({
  history: z.array(ChatMessageSchema),
  prompt: z.string(),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

export async function continueChat(input: ChatInput): Promise<string> {
  const { history, prompt } = input;

  const messages = [
    ...history.map((msg) => ({
      role: msg.role,
      content: [{ text: msg.content }],
    })),
    { role: 'user' as const, content: [{ text: prompt }] },
  ];

  try {
    const { output } = await ai.generate({
      prompt: messages,
    });
    return output?.text ?? 'Sorry, I could not generate a response.';
  } catch (e) {
    console.error(e);
    return 'An error occurred while processing your request.';
  }
}
