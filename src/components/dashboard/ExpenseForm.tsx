
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import React, { useState, useCallback } from 'react'
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
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"
import type { Category, Expense } from "@/types"
import { useToast } from "@/hooks/use-toast"
import { PlusCircle, Sparkles } from "lucide-react"
import { suggestCategoryAction } from "@/app/actions"
import { useDebouncedCallback } from "use-debounce"


const formSchema = z.object({
  amount: z.coerce.number().positive({ message: "Amount must be a positive number." }).multipleOf(0.01).default(0),
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
  const [suggestedCategoryId, setSuggestedCategoryId] = useState<string | null>(null)
  const [isSuggesting, setIsSuggesting] = useState(false)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: undefined,
      categoryId: "",
      date: new Date(),
      notes: "",
    },
  })

  const debouncedSuggestCategory = useDebouncedCallback(async (notes: string) => {
    if (notes && notes.length > 3) {
      setIsSuggesting(true)
      setSuggestedCategoryId(null)
      const result = await suggestCategoryAction(notes, categories);
      if (result.success && result.categoryId) {
        setSuggestedCategoryId(result.categoryId)
        form.setValue("categoryId", result.categoryId, { shouldValidate: true })
      }
      setIsSuggesting(false)
    }
  }, 750)


  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddExpense(values);
    toast({
      title: "Expense Added",
      description: "Your new expense has been recorded.",
    });
    form.reset();
    form.setValue("date", new Date());
    setSuggestedCategoryId(null)
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
                <Input type="number" placeholder="0.00" {...field} value={field.value ?? ''} onChange={event => field.onChange(event.target.value === '' ? undefined : event.target.valueAsNumber)} />
              </FormControl>
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
                <Textarea placeholder="e.g. Coffee with a friend" {...field} onChange={(e) => {
                  field.onChange(e);
                  debouncedSuggestCategory(e.target.value);
                }}/>
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
              <FormLabel className="flex items-center gap-2">
                Category
                {isSuggesting && <Sparkles className="h-4 w-4 animate-spin text-primary" />}
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          {category.name}
                        </div>
                        {category.id === suggestedCategoryId && <Badge variant="secondary">Suggested</Badge>}
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
        <Button type="submit" className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
      </form>
    </Form>
  )
}

    