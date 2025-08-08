
'use client'

import { useState } from 'react';
import { Logo } from "@/components/icons";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ExpenseForm from './ExpenseForm';
import type { Category, Expense } from '@/types';
import { PlusCircle, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { auth } from '@/lib/firebase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';


type HeaderProps = {
  categories: Category[];
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
};


export default function Header({ categories, onAddExpense }: HeaderProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { user } = useAuth();

  const handleExpenseAdded = () => {
    setIsFormOpen(false);
  }

  const handleSignOut = async () => {
    await auth.signOut();
  }

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return names[0][0] + names[names.length - 1][0];
    }
    return names[0][0];
  }

  return (
    <header className="px-4 sm:px-6 md:px-8 py-4 border-b border-white/10 sticky top-0 bg-background/90 backdrop-blur-sm z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Logo className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-headline font-semibold text-foreground">
            Expense Galaxy
          </h1>
        </div>
        <div className='flex items-center gap-4'>
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || 'User'} />
                      <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
                    </Avatar>
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className='p-2'>
                  <p className="font-semibold">{user?.displayName}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
