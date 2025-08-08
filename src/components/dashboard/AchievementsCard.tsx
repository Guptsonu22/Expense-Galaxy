
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Award, ShieldCheck, PiggyBank, Flame, Library } from "lucide-react";
import type { Badge } from "@/types";
import { getLucideIcon } from "@/lib/icon-utils";
import { cn } from "@/lib/utils";

type AchievementsCardProps = {
  badges: Badge[];
};

export default function AchievementsCard({ badges }: AchievementsCardProps) {
  const earnedCount = badges.filter(b => b.earned).length;

  return (
    <Card className="bg-card/50 border-white/10">
      <CardHeader>
        <div className="flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline">Achievements</CardTitle>
        </div>
        <CardDescription>You've earned {earnedCount} out of {badges.length} badges.</CardDescription>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
            <div className="grid grid-cols-4 gap-4">
            {badges.map(badge => {
                const Icon = getLucideIcon(badge.icon);
                return (
                    <Tooltip key={badge.id}>
                        <TooltipTrigger asChild>
                            <div className={cn("flex items-center justify-center p-3 rounded-lg border-2",
                                badge.earned ? 'bg-primary/20 border-primary/50' : 'bg-secondary border-secondary'
                            )}>
                                <Icon className={cn("h-6 w-6", badge.earned ? 'text-primary' : 'text-muted-foreground')}/>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="font-bold">{badge.name}</p>
                            <p>{badge.description}</p>
                        </TooltipContent>
                    </Tooltip>
                )
            })}
            </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
