'use server';
/**
 * @fileOverview This file implements a Genkit flow for automating multi-step LLM workflows.
 * It demonstrates chaining a text summarization step with a keyword extraction step.
 *
 * - automateLlmWorkflows - A function that orchestrates the multi-step LLM workflow.
 * - AutomateLlmWorkflowsInput - The input type for the automateLlmWorkflows function.
 * - AutomateLlmWorkflowsOutput - The return type for the automateLlmWorkflows function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutomateLlmWorkflowsInputSchema = z.object({
  text: z.string().describe('The input text to be processed by the workflow.'),
});
export type AutomateLlmWorkflowsInput = z.infer<typeof AutomateLlmWorkflowsInputSchema>;

const SummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the input text.'),
});

const KeywordsOutputSchema = z.object({
  keywords: z
    .array(z.string())
    .describe('A list of important keywords extracted from the summary.'),
});

const AutomateLlmWorkflowsOutputSchema = z.object({
  summary: z.string().describe('The generated summary of the text.'),
  keywords: z
    .array(z.string())
    .describe('A list of keywords extracted from the summary.'),
});
export type AutomateLlmWorkflowsOutput = z.infer<typeof AutomateLlmWorkflowsOutputSchema>;

export async function automateLlmWorkflows(
  input: AutomateLlmWorkflowsInput
): Promise<AutomateLlmWorkflowsOutput> {
  return automateLlmWorkflowsFlow(input);
}

const summaryPrompt = ai.definePrompt({
  name: 'summaryPrompt',
  input: {schema: AutomateLlmWorkflowsInputSchema},
  output: {schema: SummaryOutputSchema},
  prompt: `Please summarize the following text concisely and accurately. Focus on the main points and key information.

Text: {{{text}}}`,
});

const keywordExtractorPrompt = ai.definePrompt({
  name: 'keywordExtractorPrompt',
  input: {schema: SummaryOutputSchema},
  output: {schema: KeywordsOutputSchema},
  prompt: `Based on the following summary, extract a list of 5 to 10 most important keywords or key phrases. Provide them as a JSON array of strings.

Summary: {{{summary}}}`,
});

const automateLlmWorkflowsFlow = ai.defineFlow(
  {
    name: 'automateLlmWorkflowsFlow',
    inputSchema: AutomateLlmWorkflowsInputSchema,
    outputSchema: AutomateLlmWorkflowsOutputSchema,
  },
  async input => {
    // Step 1: Summarize the input text
    const {output: summaryResult} = await summaryPrompt({text: input.text});
    if (!summaryResult) {
      throw new Error('Failed to generate summary.');
    }
    const summary = summaryResult.summary;

    // Step 2: Extract keywords from the generated summary
    const {output: keywordsResult} = await keywordExtractorPrompt({summary});
    if (!keywordsResult) {
      throw new Error('Failed to extract keywords.');
    }
    const keywords = keywordsResult.keywords;

    return {
      summary,
      keywords,
    };
  }
);
