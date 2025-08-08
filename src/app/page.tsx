
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import type { Expense, Category } from '@/types';
import { initialExpenses, defaultCategories } from '@/lib/data';
import Header from '@/components/dashboard/Header';
import ExpenseForm from '@/components/dashboard/ExpenseForm';
import CategoryManager from '@/components/dashboard/CategoryManager';
import InsightsCard from '@/components/dashboard/InsightsCard';
import ExpenseTable from '@/components/dashboard/ExpenseTable';

export default function DashboardPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setExpenses(initialExpenses);
    setIsMounted(true);
  }, []);

  const handleAddExpense = (newExpense: Omit<Expense, 'id'>) => {
    setExpenses(prev => [{ ...newExpense, id: crypto.randomUUID() }, ...prev]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const handleAddCategory = (newCategory: Omit<Category, 'id'>) => {
    const categoryWithId = { ...newCategory, id: crypto.randomUUID() };
    setCategories(prev => [...prev, categoryWithId]);
    return categoryWithId;
  };

  const currentMonthExpenses = useMemo(() => {
    if (!isMounted) return [];
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    });
  }, [expenses, isMounted]);

  if (!isMounted) {
    return null; 
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 gap-6">
          <div className="lg:col-span-1 flex flex-col gap-6">
            <ExpenseForm categories={categories} onAddExpense={handleAddExpense} />
            <CategoryManager categories={categories} onAddCategory={handleAddCategory} />
          </div>
          <div className="lg:col-span-2 flex flex-col gap-6">
            <InsightsCard expenses={currentMonthExpenses} />
            <ExpenseTable
              expenses={expenses}
              categories={categories}
              onDeleteExpense={handleDeleteExpense}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
