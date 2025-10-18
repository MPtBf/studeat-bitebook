import { Header } from "@/components/layout/Header";

/**
 * Guides page - placeholder for recipe guides
 */
export default function Guides() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">Cooking Guides</h1>
        <p className="text-muted-foreground">Coming soon...</p>
      </main>
    </div>
  );
}
