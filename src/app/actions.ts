
'use server';

import { generateSpendingInsights } from '@/ai/flows/generate-spending-insights';
import type { Expense } from '@/types';

type InsightsResult = {
  success: boolean;
  insights?: string;
  error?: string;
};

export async function getSpendingInsightsAction(expenses: Expense[]): Promise<InsightsResult> {
  if (expenses.length === 0) {
    return { success: true, insights: 'Not enough data for this month to generate insights. Please add more expenses.' };
  }
  
  try {
    const formattedExpenses = expenses.map(e => ({
      category: e.categoryId,
      amount: e.amount,
      date: e.date.toISOString().split('T')[0],
      description: e.notes || '',
    }));

    const result = await generateSpendingInsights({
      monthlyExpenses: JSON.stringify(formattedExpenses),
    });
    return { success: true, insights: result.insights };
  } catch (error) {
    console.error('Error generating spending insights:', error);
    return { success: false, error: 'An unexpected error occurred while generating insights. Please try again later.' };
  }
}
