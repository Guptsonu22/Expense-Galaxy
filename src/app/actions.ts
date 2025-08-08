
'use server';

import { generateSpendingInsights } from '@/ai/flows/generate-spending-insights';
import { suggestCategory } from '@/ai/flows/suggest-category';
import type { Expense, Category } from '@/types';

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
      date: new Date(e.date).toISOString().split('T')[0],
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

type SuggestCategoryResult = {
  success: boolean;
  categoryId?: string;
  error?: string;
}

export async function suggestCategoryAction(notes: string, categories: Category[]): Promise<SuggestCategoryResult> {
  try {
    const simplifiedCategories = categories.map(({icon, ...rest}) => rest);
    const result = await suggestCategory({ notes, categories: simplifiedCategories });
    return { success: true, categoryId: result.categoryId };
  } catch (error) {
    console.error('Error suggesting category:', error);
    // We don't need to show this error to the user, as it's a non-critical feature
    return { success: false, error: 'Failed to suggest category.' };
  }
}
