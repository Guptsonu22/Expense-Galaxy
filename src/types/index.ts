
import type { LucideIcon } from "lucide-react";

export type Category = {
  id: string;
  name: string;
  icon: LucideIcon;
};

export type Expense = {
  id: string;
  amount: number;
  categoryId: string;
  date: Date;
  notes?: string;
};
