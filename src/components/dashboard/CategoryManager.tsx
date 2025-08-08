
"use client"

import { useState } from "react";
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
import { PlusCircle, Tag } from "lucide-react";
import type { Category } from "@/types";
import { useToast } from "@/hooks/use-toast";

type CategoryManagerProps = {
  categories: Category[];
  onAddCategory: (category: Omit<Category, 'id' | 'icon'> & { icon: React.ComponentType }) => Category;
};

export default function CategoryManager({ categories, onAddCategory }: CategoryManagerProps) {
  const [open, setOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const { toast } = useToast();

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      onAddCategory({ name: newCategoryName.trim(), icon: Tag });
      toast({
        title: "Category Added",
        description: `"${newCategoryName.trim()}" has been added to your categories.`,
      });
      setNewCategoryName("");
      setOpen(false);
    }
  };

  return (
    <Card className="bg-card/50 border-white/10">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="font-headline">Categories</CardTitle>
          <CardDescription>Manage your expense categories.</CardDescription>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add New
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="font-headline">Add New Category</DialogTitle>
              <DialogDescription>
                Create a new category to organize your expenses.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="col-span-3"
                  placeholder="e.g. Groceries"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddCategory}>Save Category</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between p-2 rounded-md hover:bg-secondary/50">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">{category.name}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
