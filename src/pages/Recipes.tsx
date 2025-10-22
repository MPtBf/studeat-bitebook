import { Header } from "@/components/layout/Header";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Recipes page - placeholder for recipe lists
 */
export default function Recipes() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">{t("recipesTitle")}</h1>
        <p className="text-muted-foreground">{t("comingSoon")}</p>
      </main>
    </div>
  );
}
