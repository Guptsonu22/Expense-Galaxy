
"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Target, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type BudgetCardProps = {
  budget: number;
  totalSpent: number;
  onSetBudget: (newBudget: number) => void;
};

export default function BudgetCard({ budget, totalSpent, onSetBudget }: BudgetCardProps) {
  const [open, setOpen] = useState(false);
  const [newBudget, setNewBudget] = useState<string>(budget.toString());
  const { toast } = useToast();

  const handleSetBudget = () => {
    const budgetValue = parseFloat(newBudget);
    if (!isNaN(budgetValue) && budgetValue > 0) {
      onSetBudget(budgetValue);
      toast({
        title: "Budget Updated",
        description: `Your monthly budget has been set to ₹${budgetValue.toFixed(2)}.`,
      });
      setOpen(false);
    } else {
        toast({
            title: "Invalid Budget",
            description: "Please enter a valid positive number for the budget.",
            variant: "destructive"
        })
    }
  };

  const remaining = budget - totalSpent;
  const progress = budget > 0 ? (totalSpent / budget) * 100 : 0;
  
  const getProgressColor = () => {
    if (progress > 90) return "bg-destructive";
    if (progress > 75) return "bg-yellow-500";
    return "bg-primary";
  }

  return (
    <Card className="bg-card/50 border-white/10">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline">Monthly Budget</CardTitle>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Pencil className="h-3 w-3" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="font-headline">Set Monthly Budget</DialogTitle>
              <DialogDescription>
                Enter your total budget for the month.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="budget" className="text-right">
                  Amount (₹)
                </Label>
                <Input
                  id="budget"
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="col-span-3"
                  placeholder="e.g. 1000"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSetBudget}>Save Budget</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
            <Progress value={progress} indicatorClassName={getProgressColor()} />
        </div>
        <div className="flex justify-between items-center text-sm font-mono">
            <div className='text-left'>
                <p className="text-muted-foreground text-xs">Spent</p>
                <p className="font-semibold text-base">₹{totalSpent.toFixed(2)}</p>
            </div>
            <div className='text-right'>
                <p className="text-muted-foreground text-xs">Remaining</p>
                <p className={`font-semibold text-base ${remaining < 0 ? 'text-destructive' : ''}`}>
                    ₹{remaining.toFixed(2)}
                </p>
            </div>
        </div>
        <div className="text-center text-sm text-muted-foreground font-mono">
            Total Budget: ₹{budget.toFixed(2)}
        </div>
      </CardContent>
    </Card>
  );
}
