
'use server';

/**
 * @fileOverview Suggests a category for a given expense description.
 *
 * - suggestCategory - A function that suggests a category.
 * - SuggestCategoryInput - The input type for the suggestCategory function.
 * - SuggestCategoryOutput - The return type for the suggestCategory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { Category } from '@/types';

const SuggestCategoryInputSchema = z.object({
  notes: z.string().describe('The user-provided notes or description for an expense.'),
  categories: z.array(z.object({
    id: z.string(),
    name: z.string(),
  })).describe('The list of available expense categories.'),
});

export type SuggestCategoryInput = z.infer<typeof SuggestCategoryInputSchema>;


const SuggestCategoryOutputSchema = z.object({
  categoryId: z.string().describe('The ID of the suggested category. Should be one of the IDs from the input categories. If no category fits, return an empty string.'),
});

export type SuggestCategoryOutput = z.infer<typeof SuggestCategoryOutputSchema>;

export async function suggestCategory(input: SuggestCategoryInput): Promise<SuggestCategoryOutput> {
  return suggestCategoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCategoryPrompt',
  input: {schema: SuggestCategoryInputSchema},
  output: {schema: SuggestCategoryOutputSchema},
  prompt: `You are an expert financial assistant. Your task is to suggest the most appropriate spending category for a given expense based on its description.

Analyze the expense description and choose the best fit from the provided list of categories.

Expense Description:
"{{notes}}"

Available Categories (with IDs):
{{#each categories}}
- {{name}} (id: {{id}})
{{/each}}

Based on the description, return the ID of the single most relevant category.
The ID must be one of the provided category IDs.
If the description is ambiguous or doesn't seem to fit any category well, you must return an empty string for the categoryId.
Do not guess. Only return a categoryId if you are confident. Return ONLY the JSON output.
  `,
});


const suggestCategoryFlow = ai.defineFlow(
  {
    name: 'suggestCategoryFlow',
    inputSchema: SuggestCategoryInputSchema,
    outputSchema: SuggestCategoryOutputSchema,
  },
  async (input) => {
    if (!input.notes || input.notes.trim().length < 3) {
      return { categoryId: '' };
    }
    
    const {output} = await prompt(input);
    return output!;
  }
);

    