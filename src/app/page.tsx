
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import type { Expense, Category } from '@/types';
import { initialExpenses, defaultCategories } from '@/lib/data';
import Header from '@/components/dashboard/Header';
import CategoryManager from '@/components/dashboard/CategoryManager';
import InsightsCard from '@/components/dashboard/InsightsCard';
import ExpenseTable from '@/components/dashboard/ExpenseTable';
import OverviewCard from '@/components/dashboard/OverviewCard';
import { withAuth } from '@/hooks/useAuth';

function DashboardPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    let storedExpenses: Expense[] = [];
    let storedCategories: Category[] = [];

    try {
      const expensesFromStorage = localStorage.getItem('expenses');
      if (expensesFromStorage) {
        storedExpenses = JSON.parse(expensesFromStorage, (key, value) => {
          if (key === 'date') return new Date(value);
          return value;
        });
      }
    } catch (error) {
      console.error("Failed to parse expenses from localStorage", error);
    }

    try {
      const categoriesFromStorage = localStorage.getItem('categories');
      if (categoriesFromStorage) {
        storedCategories = JSON.parse(categoriesFromStorage);
      }
    } catch (error) {
        console.error("Failed to parse categories from localStorage", error);
    }
    
    setExpenses(storedExpenses.length > 0 ? storedExpenses : initialExpenses);
    setCategories(storedCategories.length > 0 ? storedCategories : defaultCategories);
    
    setIsMounted(true);
  }, []);


  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('expenses', JSON.stringify(expenses));
    }
  }, [expenses, isMounted]);

  useEffect(() => {
    if (isMounted) {
      // Don't stringify icon components
      const categoriesToStore = categories.map(({icon, ...rest}) => rest);
      localStorage.setItem('categories', JSON.stringify(categoriesToStore));
    }
  }, [categories, isMounted]);


  const handleAddExpense = (newExpense: Omit<Expense, 'id'>) => {
    setExpenses(prev => [{ ...newExpense, id: crypto.randomUUID() }, ...prev]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const handleAddCategory = (newCategory: Omit<Category, 'id' | 'icon'>) => {
    const categoryWithId: Category = { ...newCategory, id: crypto.randomUUID(), icon: 'Tag' };
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
    <div className="flex flex-col min-h-screen">
      <Header categories={categories} onAddExpense={handleAddExpense}/>
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
             <OverviewCard expenses={currentMonthExpenses} categories={categories} />
             <InsightsCard expenses={currentMonthExpenses} />
          </div>
          <div className="lg:col-span-1 flex flex-col gap-6">
            <CategoryManager categories={categories} onAddCategory={handleAddCategory} />
          </div>
        </div>
        <div className="mt-8">
            <ExpenseTable
              expenses={expenses}
              categories={categories}
              onDeleteExpense={handleDeleteExpense}
            />
        </div>
      </main>
    </div>
  );
}

export default withAuth(DashboardPage);
