import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Guides page - cooking guides and tips
 */
export default function Guides() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">{t("guidesTitle")}</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>{t("gettingStartedTitle")}</CardTitle>
              <CardDescription>
                {t("gettingStartedDesc")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t("gettingStartedContent")}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("recipeTipsTitle")}</CardTitle>
              <CardDescription>
                {t("recipeTipsDesc")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t("recipeTipsContent")}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("budgetCookingTitle")}</CardTitle>
              <CardDescription>
                {t("budgetCookingDesc")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t("budgetCookingContent")}
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
