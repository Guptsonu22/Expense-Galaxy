
"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, AlertCircle } from 'lucide-react';
import { getSpendingInsightsAction } from '@/app/actions';
import type { Expense } from '@/types';

type InsightsCardProps = {
  expenses: Expense[];
};

export default function InsightsCard({ expenses }: InsightsCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setInsights(null);

    const result = await getSpendingInsightsAction(expenses);

    if (result.success) {
      setInsights(result.insights || null);
    } else {
      setError(result.error || 'An unknown error occurred.');
      toast({
        title: "Error Generating Insights",
        description: result.error,
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          AI-Powered Spending Insights
        </CardTitle>
        <CardDescription>
          Get an AI-generated summary of your spending for the current month.
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-[100px]">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[60%]" />
            <Skeleton className="h-4 w-[70%]" />
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <p>{error}</p>
          </div>
        ) : insights ? (
          <p className="text-sm text-foreground/80 whitespace-pre-wrap">{insights}</p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Click the button below to generate insights on your spending habits.
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerate} disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? (
            <>
              <Sparkles className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Insights
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
