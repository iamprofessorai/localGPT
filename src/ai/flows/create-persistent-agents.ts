'use server';
/**
 * @fileOverview A Genkit flow for creating and managing persistent AI agents.
 *
 * - createPersistentAgent - A function that handles the creation of a persistent AI agent.
 * - CreatePersistentAgentInput - The input type for the createPersistentAgent function.
 * - CreatePersistentAgentOutput - The return type for the createPersistentAgent function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CreatePersistentAgentMemoryConfigSchema = z.object({
  type: z.enum(['short_term', 'long_term', 'conversational']).describe('The type of memory to configure.'),
  retentionPolicy: z.string().optional().describe('Policy for how long memories are retained (e.g., \'7_days\', \'session_only\', \'unlimited\').'),
  maxTokens: z.number().optional().describe('Maximum tokens for conversational memory.'),
});

const CreatePersistentAgentInputSchema = z.object({
  name: z.string().describe('The name of the persistent AI agent.'),
  systemPrompt: z.string().describe('The system prompt that defines the agent\'s persona and instructions.'),
  memoryConfig: CreatePersistentAgentMemoryConfigSchema.optional().describe('Configuration for the agent\'s memory.'),
  toolBindings: z.array(z.string()).optional().describe('A list of tool names that this agent can use.'),
});
export type CreatePersistentAgentInput = z.infer<typeof CreatePersistentAgentInputSchema>;

const CreatePersistentAgentOutputSchema = z.object({
  agentId: z.string().describe('A unique identifier for the created agent.'),
  message: z.string().describe('A confirmation message for the agent creation.'),
  agentDetails: z.object({
    name: z.string().describe('The name of the persistent AI agent.'),
    systemPrompt: z.string().describe('The system prompt that defines the agent\'s persona and instructions.'),
    memoryConfig: CreatePersistentAgentMemoryConfigSchema.optional().describe('Configuration for the agent\'s memory.'),
    toolBindings: z.array(z.string()).optional().describe('A list of tool names that this agent can use.'),
  }).describe('Details of the created agent.'),
});
export type CreatePersistentAgentOutput = z.infer<typeof CreatePersistentAgentOutputSchema>;

const createPersistentAgentPrompt = ai.definePrompt({
  name: 'createPersistentAgentPrompt',
  input: { schema: CreatePersistentAgentInputSchema },
  output: { schema: CreatePersistentAgentOutputSchema },
  prompt: `You are an AI assistant designed to create and configure persistent AI agents.
Based on the following input, generate a confirmation message for the creation of a new persistent AI agent and summarize its configuration.

Agent Name: {{{name}}}
System Prompt: {{{systemPrompt}}}

{{#if memoryConfig}}
Memory Configuration:
  Type: {{{memoryConfig.type}}}
  {{#if memoryConfig.retentionPolicy}}
  Retention Policy: {{{memoryConfig.retentionPolicy}}}
  {{/if}}
  {{#if memoryConfig.maxTokens}}
  Max Tokens: {{{memoryConfig.maxTokens}}}
  {{/if}}
{{else}}
Memory Configuration: None specified.
{{/if}}

{{#if toolBindings}}
Tool Bindings:
{{#each toolBindings}} - {{{this}}}
{{/each}}
{{else}}
Tool Bindings: None specified.
{{/if}}

Generate a concise confirmation message and the agent details based on this information. The agentId should be a simple representation like 'agent-{{name}}'.`,
});

const createPersistentAgentFlow = ai.defineFlow(
  {
    name: 'createPersistentAgentFlow',
    inputSchema: CreatePersistentAgentInputSchema,
    outputSchema: CreatePersistentAgentOutputSchema,
  },
  async (input) => {
    const { output } = await createPersistentAgentPrompt(input);
    // For agentId, we'll generate a simple ID using the name. In a real application,
    // this might involve storing the agent configuration in a database and getting a unique ID.
    const agentId = `agent-${input.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

    return {
      agentId: output?.agentId || agentId,
      message: output?.message || `Successfully configured agent '${input.name}'.`,
      agentDetails: {
        name: input.name,
        systemPrompt: input.systemPrompt,
        memoryConfig: input.memoryConfig,
        toolBindings: input.toolBindings,
      },
    };
  }
);

export async function createPersistentAgent(input: CreatePersistentAgentInput): Promise<CreatePersistentAgentOutput> {
  return createPersistentAgentFlow(input);
}
