
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"
import type { Category, Expense } from "@/types"
import { useToast } from "@/hooks/use-toast"
import { PlusCircle } from "lucide-react"

const formSchema = z.object({
  amount: z.coerce.number().positive({ message: "Amount must be a positive number." }).multipleOf(0.01),
  categoryId: z.string().min(1, { message: "Please select a category." }),
  date: z.date({
    required_error: "A date is required.",
  }),
  notes: z.string().max(100, "Notes must be 100 characters or less.").optional(),
})

type ExpenseFormProps = {
  categories: Category[];
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
  onExpenseAdded?: () => void;
}

export default function ExpenseForm({ categories, onAddExpense, onExpenseAdded }: ExpenseFormProps) {
  const { toast } = useToast()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      categoryId: "",
      date: new Date(),
      notes: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddExpense(values);
    toast({
      title: "Expense Added",
      description: "Your new expense has been recorded.",
    });
    form.reset();
    form.setValue("date", new Date());
    if (onExpenseAdded) {
      onExpenseAdded();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0.00" {...field} value={field.value ?? ''} onChange={event => field.onChange(event.target.valueAsNumber || '')} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center gap-2">
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <DatePicker value={field.value} onChange={field.onChange} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g. Coffee with a friend" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
      </form>
    </Form>
  )
}
