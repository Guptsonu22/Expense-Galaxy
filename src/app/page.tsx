
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import type { Expense, Category, Badge } from '@/types';
import { initialExpenses, defaultCategories } from '@/lib/data';
import Header from '@/components/dashboard/Header';
import CategoryManager from '@/components/dashboard/CategoryManager';
import InsightsCard from '@/components/dashboard/InsightsCard';
import ExpenseTable from '@/components/dashboard/ExpenseTable';
import OverviewCard from '@/components/dashboard/OverviewCard';
import BudgetCard from '@/components/dashboard/BudgetCard';
import AchievementsCard from '@/components/dashboard/AchievementsCard';
import { Github, Linkedin, Heart } from 'lucide-react';
import Link from 'next/link';

const availableBadges: Omit<Badge, 'earned'>[] = [
  {
    id: 'badge-1',
    name: 'Budget Hero',
    description: "You've spent less than your budget this month. Great job!",
    icon: 'ShieldCheck',
  },
  {
    id: 'badge-2',
    name: 'Frugal Spender',
    description: 'Spent less than ₹500 with more than 5 expenses. Every penny counts!',
    icon: 'PiggyBank',
  },
  {
    id: 'badge-3',
    name: 'On a Roll',
    description: 'You logged an expense on 3 consecutive days. Keep the momentum!',
    icon: 'Flame',
  },
  {
    id: 'badge-4',
    name: 'Master Categorizer',
    description: 'You used at least 5 different categories this month. So organized!',
    icon: 'Library',
  },
];


function DashboardPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [budget, setBudget] = useState<number>(1000);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    let storedExpenses: Expense[] = [];
    let storedCategories: Category[] = [];
    let storedBudget: number | null = null;

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
    
    try {
      const budgetFromStorage = localStorage.getItem('budget');
      if (budgetFromStorage) {
        storedBudget = JSON.parse(budgetFromStorage);
      }
    } catch (error) {
        console.error("Failed to parse budget from localStorage", error);
    }

    setExpenses(storedExpenses.length > 0 ? storedExpenses : initialExpenses);
    setCategories(storedCategories.length > 0 ? storedCategories : defaultCategories);
    setBudget(storedBudget !== null ? storedBudget : 1000);
    
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

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('budget', JSON.stringify(budget));
    }
  }, [budget, isMounted]);


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
  
  const handleSetBudget = (newBudget: number) => {
    setBudget(newBudget);
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

  const totalSpentThisMonth = useMemo(() => {
    return currentMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  }, [currentMonthExpenses]);

  const earnedBadges = useMemo((): Badge[] => {
    const badges: Badge[] = [];
    if (!isMounted) return [];

    // Budget Hero
    if (totalSpentThisMonth < budget) {
      badges.push({ ...availableBadges[0], earned: true });
    }

    // Frugal Spender
    if (currentMonthExpenses.length > 5 && totalSpentThisMonth < 500) {
      badges.push({ ...availableBadges[1], earned: true });
    }
    
    // On a Roll
    const expenseDates = [...new Set(expenses.map(e => new Date(e.date).toDateString()))]
      .map(d => new Date(d).getTime())
      .sort((a,b) => b - a);

    let consecutiveDays = 1;
    for (let i = 0; i < expenseDates.length - 1; i++) {
        const diff = expenseDates[i] - expenseDates[i+1];
        if (diff === 24 * 60 * 60 * 1000) {
            consecutiveDays++;
        } else if (diff > 24 * 60 * 60 * 1000) {
            break;
        }
    }
    if (consecutiveDays >= 3) {
      badges.push({ ...availableBadges[2], earned: true });
    }

    // Master Categorizer
    const uniqueCategoriesThisMonth = new Set(currentMonthExpenses.map(e => e.categoryId));
    if (uniqueCategoriesThisMonth.size >= 5) {
      badges.push({ ...availableBadges[3], earned: true });
    }

    return availableBadges.map(b => {
      const isEarned = badges.some(eb => eb.id === b.id);
      return { ...b, earned: isEarned };
    });
  }, [isMounted, expenses, currentMonthExpenses, totalSpentThisMonth, budget]);


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
            <BudgetCard 
              budget={budget}
              totalSpent={totalSpentThisMonth}
              onSetBudget={handleSetBudget}
            />
            <AchievementsCard badges={earnedBadges} />
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
      <footer className="py-6 px-4 sm:px-6 md:px-8 text-muted-foreground text-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-1">
                Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> for students worldwide.
            </div>
            <div className="flex items-center gap-4">
                <Link href="https://github.com/Guptsonu22" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                    <Github className="h-5 w-5" />
                </Link>
                <Link href="https://www.linkedin.com/in/sonu-kumar-443803231/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                    <Linkedin className="h-5 w-5" />
                </Link>
                <p>&copy; {new Date().getFullYear()} Expense Galaxy. All rights reserved.</p>
            </div>
        </div>
      </footer>
    </div>
  );
}

export default DashboardPage;
