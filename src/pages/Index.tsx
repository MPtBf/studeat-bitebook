import { Header } from "@/components/layout/Header";

/**
 * Home page - main landing page of Mealio
 */
export default function Index() {
  return <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold text-foreground">
            Welcome to <i>Mealio</i>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your ultimate recipe companion. Find delicious, budget-friendly recipes and plan your meals with ease.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className="text-6xl">🍳</span>
            <span className="text-6xl">🥗</span>
            <span className="text-6xl">🍕</span>
            <span className="text-6xl">🍜</span>
          </div>
        </div>
      </main>
    </div>;
}
