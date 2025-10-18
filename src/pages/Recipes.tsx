import { Header } from "@/components/layout/Header";

/**
 * Recipes page - placeholder for recipe lists
 */
export default function Recipes() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">Recipes</h1>
        <p className="text-muted-foreground">Coming soon...</p>
      </main>
    </div>
  );
}
