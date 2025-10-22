import { LogOut, Settings, User, Moon, Sun, Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface UserMenuProps {
  username: string;
  avatarUrl?: string | null;
}

/**
 * User menu dropdown with profile, settings, theme toggle, and sign out
 */
export function UserMenu({ username, avatarUrl }: UserMenuProps) {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
    navigate("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-transparent hover:ring-accent transition-all">
          <AvatarImage src={avatarUrl || undefined} alt={username} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-popover border-border">
        {/* User Info */}
        <div className="flex items-center gap-3 p-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatarUrl || undefined} alt={username} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">{username}</span>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Profile */}
        <DropdownMenuItem 
          onClick={() => navigate("/profile")}
          className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
        >
          <User className="mr-2 h-4 w-4" />
          {t("profile")}
        </DropdownMenuItem>

        {/* Settings */}
        <DropdownMenuItem 
          onClick={() => navigate("/settings")}
          className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
        >
          <Settings className="mr-2 h-4 w-4" />
          {t("settings")}
        </DropdownMenuItem>

        {/* Language Switch */}
        <DropdownMenuItem 
          onClick={() => setLanguage(language === "en" ? "ru" : "en")}
          className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
        >
          <Languages className="mr-2 h-4 w-4" />
          {language === "en" ? t("russian") : t("english")}
        </DropdownMenuItem>

        {/* Theme Toggle */}
        <DropdownMenuItem 
          onClick={toggleTheme}
          className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
        >
          {theme === "light" ? (
            <>
              <Moon className="mr-2 h-4 w-4" />
              {t("darkMode")}
            </>
          ) : (
            <>
              <Sun className="mr-2 h-4 w-4" />
              {t("lightMode")}
            </>
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Sign Out */}
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="cursor-pointer text-destructive focus:bg-destructive focus:text-destructive-foreground"
        >
          <LogOut className="mr-2 h-4 w-4" />
          {t("signOut")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
