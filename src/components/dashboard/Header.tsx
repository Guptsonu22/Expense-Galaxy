
'use client'

import { useState } from 'react';
import { Logo } from "@/components/icons";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ExpenseForm from './ExpenseForm';
import type { Category, Expense } from '@/types';
import { PlusCircle } from 'lucide-react';

type HeaderProps = {
  categories: Category[];
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
};


export default function Header({ categories, onAddExpense }: HeaderProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleExpenseAdded = () => {
    setIsFormOpen(false);
  }

  return (
    <header className="px-4 sm:px-6 md:px-8 py-4 border-b border-white/10 sticky top-0 bg-background/50 backdrop-blur-sm z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Logo className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-headline font-semibold text-foreground">
            Expense Galaxy
          </h1>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle />
              Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-headline">Add New Expense</DialogTitle>
            </DialogHeader>
            <ExpenseForm categories={categories} onAddExpense={onAddExpense} onExpenseAdded={handleExpenseAdded}/>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
