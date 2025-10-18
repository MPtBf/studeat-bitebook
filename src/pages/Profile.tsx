import { Header } from "@/components/layout/Header";

/**
 * Profile page - placeholder for user profile
 */
export default function Profile() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">Profile</h1>
        <p className="text-muted-foreground">Coming soon...</p>
      </main>
    </div>
  );
}
