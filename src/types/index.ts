
import type { LucideIcon } from "lucide-react";

export type Category = {
  id: string;
  name: string;
  icon: React.ComponentType; // Can be Lucide or custom
};

export type Expense = {
  id: string;
  amount: number;
  categoryId: string;
  date: Date;
  notes?: string;
};
