import { Link } from "react-router-dom";
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserMenu } from "./UserMenu";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Header component with logo, navigation links, notifications, and user profile
 */
export function Header() {
  const { user, profile, loading } = useAuth();
  const { language, setLanguage, t } = useLanguage(); 

  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-foreground transition-colors">
          <span className="text-2xl">🥗</span>
          <span>Mealio</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center">
          <Link to="/guides" className="flex items-center gap-2 px-3 py-2 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-colors w-[110px] justify-center">
            <span className="text-base">📖</span>
            <span>{t("guides")}</span>
          </Link>
          <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-colors w-[110px] justify-center">
            <span className="text-base">👤</span>
            <span>{t("profile")}</span>
          </Link>
          <Link to="/recipes" className="flex items-center gap-2 px-3 py-2 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-colors w-[110px] justify-center">
            <span className="text-base">🍳</span>
            <span>{t("recipes")}</span>
          </Link>
          <Link to="/week-plan" className="flex items-center gap-2 px-3 py-2 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-colors w-[110px] justify-center">
            <span className="text-base">📅</span>
            <span>{t("plan")}</span>
          </Link>
          <Link to="/shopping-list" className="flex items-center gap-2 px-3 py-2 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-colors w-[110px] justify-center">
            <span className="text-base">🛒</span>
            <span>{t("list")}</span>
          </Link>
        </nav>

        {/* Right side - Notifications and User */}
        <div className="flex items-center gap-4 min-w-[120px]">
          {loading ? (
            <div className="w-10 h-10" /> // Placeholder to prevent layout shift
          ) : user ? (
            <>
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
              </Button>

              {/* User Profile Menu */}
              <UserMenu 
                username={profile?.username || "User"}
                avatarUrl={profile?.avatar_url}
              />
            </>
          ) : (
            <Link to="/auth">
              <Button className="rounded-full">
                {t("signUp")}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
