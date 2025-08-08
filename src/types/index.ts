
import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

export type IconName = "UtensilsCrossed" | "PlaneTakeoff" | "Home" | "Lightbulb" | "ShoppingCart" | "Ticket" | "HeartPulse" | "Carrot" | "Car" | "Tag" | "HelpCircle" | "Award" | "ShieldCheck" | "PiggyBank" | "Flame" | "Library";

export type Category = {
  id: string;
  name: string;
  icon: IconName;
};

export type Expense = {
  id: string;
  amount: number;
  categoryId: string;
  date: Date;
  notes?: string;
};

export type Badge = {
    id: string;
    name: string;
    icon: IconName;
    description: string;
    earned: boolean;
}
