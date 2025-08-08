'use server';

/**
 * @fileOverview Generates AI-powered insights about a user's monthly spending habits.
 *
 * - generateSpendingInsights - A function that generates spending insights.
 * - GenerateSpendingInsightsInput - The input type for the generateSpendingInsights function.
 * - GenerateSpendingInsightsOutput - The return type for the generateSpendingInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSpendingInsightsInputSchema = z.object({
  monthlyExpenses: z
    .string()
    .describe(
      'A list of monthly expenses, with category, amount, and date, in JSON format.'
    ),
  userPreferences: z
    .string()
    .optional()
    .describe(
      'Optional user preferences to tailor insights, such as preferred savings categories or spending concerns, in JSON format.'
    ),
});
export type GenerateSpendingInsightsInput = z.infer<
  typeof GenerateSpendingInsightsInputSchema
>;

const GenerateSpendingInsightsOutputSchema = z.object({
  insights: z
    .string()
    .describe(
      'AI-generated insights about the user’s monthly spending habits, highlighting key spending patterns and potential savings areas.'
    ),
});
export type GenerateSpendingInsightsOutput = z.infer<
  typeof GenerateSpendingInsightsOutputSchema
>;

export async function generateSpendingInsights(
  input: GenerateSpendingInsightsInput
): Promise<GenerateSpendingInsightsOutput> {
  return generateSpendingInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSpendingInsightsPrompt',
  input: {schema: GenerateSpendingInsightsInputSchema},
  output: {schema: GenerateSpendingInsightsOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized insights into users' spending habits, helping them understand where their money goes and identify potential savings.

  Analyze the user's monthly expenses and preferences to generate insightful and actionable advice.

  Monthly Expenses (JSON):
  {{monthlyExpenses}}

  User Preferences (Optional JSON):
  {{userPreferences}}

  Provide a summary of key spending patterns, highlight any unusual or high expenses, and suggest areas where the user could potentially save money. Be concise and clear.
  Focus on actionable advice that the user can implement to improve their financial habits.
  If user preferences are available, tailor the insights accordingly. If no user preferences are provided, provide insights based on general best practices for personal finance.
  Make sure to return the data in a human-readable format.
  Do not mention that the data is from JSON, or that you are an AI. Act like a financial advisor.
  Ensure insights are easy to understand and implement.
  Return only the insights.
  `,
});

const generateSpendingInsightsFlow = ai.defineFlow(
  {
    name: 'generateSpendingInsightsFlow',
    inputSchema: GenerateSpendingInsightsInputSchema,
    outputSchema: GenerateSpendingInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
