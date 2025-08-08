
import { Home, Lightbulb, PlaneTakeoff, ShoppingCart, Tag, Ticket, UtensilsCrossed } from "lucide-react";
import type { Category, Expense } from "@/types";

export const defaultCategories: Category[] = [
  { id: 'cat-1', name: 'Food', icon: UtensilsCrossed },
  { id: 'cat-2', name: 'Travel', icon: PlaneTakeoff },
  { id: 'cat-3', name: 'Rent', icon: Home },
  { id: 'cat-4', name: 'Utilities', icon: Lightbulb },
  { id: 'cat-5', name: 'Shopping', icon: ShoppingCart },
  { id: 'cat-6', name: 'Entertainment', icon: Ticket },
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
];
