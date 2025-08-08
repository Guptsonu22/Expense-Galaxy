
"use client"

import * as React from "react"
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Expense, Category } from "@/types"
import { ChartPie, HandCoins } from "lucide-react"
import { getLucideIcon } from "@/lib/icon-utils"

type OverviewCardProps = {
  expenses: Expense[];
  categories: Category[];
};

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export default function OverviewCard({ expenses, categories }: OverviewCardProps) {
  const categoriesMap = React.useMemo(() => new Map(categories.map(c => [c.id, c])), [categories]);

  const data = React.useMemo(() => {
    const categorySpending = new Map<string, number>();
    expenses.forEach(expense => {
      const currentTotal = categorySpending.get(expense.categoryId) || 0;
      categorySpending.set(expense.categoryId, currentTotal + expense.amount);
    });

    return Array.from(categorySpending.entries()).map(([categoryId, amount]) => ({
      name: categoriesMap.get(categoryId)?.name || 'Uncategorized',
      value: amount,
      icon: getLucideIcon(categoriesMap.get(categoryId)?.icon),
    })).sort((a, b) => b.value - a.value);
  }, [expenses, categoriesMap]);
  
  const totalExpenses = React.useMemo(() => {
    return expenses.reduce((acc, expense) => acc + expense.amount, 0);
  }, [expenses]);


  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-secondary rounded-md border border-border">
          <p className="font-bold">{`${payload[0].name}`}</p>
          <p className="text-primary">{`$${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };

  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground mt-4">
        {
          payload.map((entry: any, index: number) => {
            const { value, color } = entry;
            const item = data[index];
            const Icon = item.icon;
            return (
              <li key={`item-${index}`} className="flex items-center gap-1.5">
                <Icon className="h-3 w-3" style={{ color }} />
                <span>{value}</span>
              </li>
            )
          })
        }
      </ul>
    );
  }

  return (
    <Card className="bg-card/50 border-white/10">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                 <div className="flex items-center gap-2">
                    <ChartPie className="h-6 w-6 text-primary" />
                    <CardTitle className="font-headline">Monthly Overview</CardTitle>
                </div>
                <CardDescription>Your spending breakdown for this month.</CardDescription>
            </div>
            <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold font-mono">${totalExpenses.toFixed(2)}</p>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(var(--accent))" }}/>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  innerRadius={50}
                  fill="#8884d8"
                  dataKey="value"
                  stroke="hsl(var(--background))"
                  paddingAngle={5}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend content={renderLegend} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[250px] flex flex-col items-center justify-center text-center text-muted-foreground">
            <HandCoins className="h-12 w-12 mb-4" />
            <p className="font-bold">No expenses recorded this month.</p>
            <p>Add an expense to see your spending summary.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

    