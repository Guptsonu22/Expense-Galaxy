
import { Logo } from "@/components/icons";

export default function Header() {
  return (
    <header className="px-4 sm:px-6 md:px-8 py-4 border-b">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <Logo className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-headline font-semibold text-foreground">
          Expense Insights
        </h1>
      </div>
    </header>
  );
}
