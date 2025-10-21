import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Guides page - cooking guides and tips
 */
export default function Guides() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">Cooking Guides</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🔪</span>
                Knife Skills
              </CardTitle>
              <CardDescription>Master basic cutting techniques</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Learn how to properly hold a knife, dice vegetables, and julienne like a pro. 
                Good knife skills make cooking faster and safer.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🍳</span>
                Cooking Methods
              </CardTitle>
              <CardDescription>Understanding heat and techniques</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                From sautéing to braising, learn the fundamental cooking methods and when to use each one 
                for the best results.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🧂</span>
                Seasoning Guide
              </CardTitle>
              <CardDescription>Enhance flavors with confidence</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Understand how to season your dishes properly. Learn about salt, acids, herbs, and spices 
                to balance flavors.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🥘</span>
                Meal Prep Basics
              </CardTitle>
              <CardDescription>Save time and money</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Plan and prepare meals in advance. Learn what ingredients prep well and how to store them 
                for maximum freshness.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🌡️</span>
                Temperature Guide
              </CardTitle>
              <CardDescription>Cook food to perfection</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Know the right internal temperatures for meat, poultry, and fish. Food safety and 
                perfect doneness made simple.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🛒</span>
                Shopping Tips
              </CardTitle>
              <CardDescription>Budget-friendly ingredient selection</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Learn how to shop smart, select fresh ingredients, and understand food labels. 
                Make the most of your budget without compromising quality.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
