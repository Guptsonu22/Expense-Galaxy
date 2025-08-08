
import type { Category, Expense } from "@/types";

export const defaultCategories: Category[] = [
  { id: 'cat-1', name: 'Food & Drink', icon: 'UtensilsCrossed' },
  { id: 'cat-2', name: 'Travel', icon: 'PlaneTakeoff' },
  { id: 'cat-3', name: 'Housing', icon: 'Home' },
  { id: 'cat-4', name: 'Bills & Utilities', icon: 'Lightbulb' },
  { id: 'cat-5', name: 'Shopping', icon: 'ShoppingCart' },
  { id: 'cat-6', name: 'Entertainment', icon: 'Ticket' },
  { id: 'cat-7', name: 'Health & Wellness', icon: 'HeartPulse' },
  { id: 'cat-8', name: 'Groceries', icon: 'Carrot' },
  { id: 'cat-9', name: 'Transportation', icon: 'Car' },
  { id: 'cat-10', name: 'Other', icon: 'Tag' },
];

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const twoDaysAgo = new Date(today);
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
const lastMonth = new Date(today);
lastMonth.setMonth(lastMonth.getMonth() - 1);


export const initialExpenses: Expense[] = [
  { id: 'exp-1', amount: 12.50, categoryId: 'cat-1', date: today, notes: 'Lunch with colleagues' },
  { id: 'exp-2', amount: 250.00, categoryId: 'cat-2', date: yesterday, notes: 'Flight ticket for vacation' },
  { id: 'exp-3', amount: 1200.00, categoryId: 'cat-3', date: new Date(today.getFullYear(), today.getMonth(), 1), notes: 'Monthly rent' },
  { id: 'exp-4', amount: 75.80, categoryId: 'cat-4', date: twoDaysAgo, notes: 'Electricity bill' },
  { id: 'exp-5', amount: 55.00, categoryId: 'cat-5', date: today, notes: 'New shirt' },
  { id: 'exp-6', amount: 22.00, categoryId: 'cat-6', date: yesterday, notes: 'Movie ticket' },
  { id: 'exp-7', amount: 8.99, categoryId: 'cat-1', date: yesterday, notes: 'Morning coffee' },
  { id: 'exp-8', amount: 300.00, categoryId: 'cat-5', date: lastMonth, notes: 'New headphones' },
  { id: 'exp-9', amount: 45.30, categoryId: 'cat-8', date: twoDaysAgo, notes: 'Weekly groceries' },
  { id: 'exp-10', amount: 25.00, categoryId: 'cat-9', date: yesterday, notes: 'Gasoline top-up' },
];

    