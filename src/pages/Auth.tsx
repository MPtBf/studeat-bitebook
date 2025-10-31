import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Switch } from "@/components/ui/switch";
import { X, Moon, Sun } from "lucide-react";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signUpSchema = signInSchema.extend({
  username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username must be less than 20 characters"),
});

/**
 * Authentication page for sign in and sign up
 */
export default function Auth() {
  const [searchParams] = useSearchParams();
  const isRecovery = searchParams.get("type") === "recovery";
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isSettingNewPassword, setIsSettingNewPassword] = useState(isRecovery);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user, resetPassword, updatePassword } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (isRecovery) {
      setIsSettingNewPassword(true);
    }
  }, [isRecovery]);

  // Redirect if already logged in
  if (user) {
    navigate("/");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSettingNewPassword) {
        // Handle setting new password after reset
        if (password !== confirmPassword) {
          toast({
            title: t("validationError"),
            description: t("passwordsDoNotMatch"),
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        if (password.length < 6) {
          toast({
            title: t("validationError"),
            description: "Password must be at least 6 characters",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        const { error } = await updatePassword(password);
        
        if (error) {
          toast({
            title: t("error"),
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: t("success"),
            description: t("passwordUpdatedSuccessfully"),
          });
          setIsSettingNewPassword(false);
          navigate("/");
        }
      } else if (isForgotPassword) {
        // Handle password reset request
        const emailResult = z.string().email().safeParse(email);
        if (!emailResult.success) {
          toast({
            title: t("validationError"),
            description: "Invalid email address",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        const { error } = await resetPassword(email);
        
        if (error) {
          toast({
            title: t("error"),
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: t("resetLinkSent"),
            description: t("resetLinkSentMessage"),
          });
        }
      } else if (isSignUp) {
        // Validate sign up form
        const result = signUpSchema.safeParse({ email, password, username });
        if (!result.success) {
          toast({
            title: t("validationError"),
            description: result.error.errors[0].message,
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        const { error } = await signUp(email, password, username);
        
        if (error) {
          toast({
            title: t("signUpFailed"),
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: t("welcomeToMealio"),
            description: t("accountCreated"),
          });
          navigate("/");
        }
      } else {
        // Validate sign in form
        const result = signInSchema.safeParse({ email, password });
        if (!result.success) {
          toast({
            title: t("validationError"),
            description: result.error.errors[0].message,
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        const { error } = await signIn(email, password);
        
        if (error) {
          toast({
            title: t("signInFailed"),
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: t("welcomeBack"),
            description: t("welcomeBackMessage"),
          });
          navigate("/");
        }
      }
    } catch (error) {
      toast({
        title: t("error"),
        description: t("unexpectedError"),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2"
          onClick={() => navigate("/")}
        >
          <X className="h-4 w-4" />
        </Button>
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <span className="text-5xl">🥗</span>
          </div>
          <CardTitle className="text-2xl text-center">
            {isSettingNewPassword 
              ? t("setNewPassword") 
              : isForgotPassword 
              ? t("resetPassword") 
              : isSignUp 
              ? t("createAccount") 
              : t("welcomeBack")}
          </CardTitle>
          <CardDescription className="text-center">
            {isSettingNewPassword 
              ? t("setNewPasswordInstructions")
              : isForgotPassword 
              ? t("resetPasswordInstructions")
              : isSignUp 
              ? t("enterDetails") 
              : t("enterCredentials")}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {isSettingNewPassword ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="password">{t("newPassword")}</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="rounded-xl"
                  />
                </div>
              </>
            ) : isForgotPassword ? (
              <div className="space-y-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>
            ) : (
              <>
                {isSignUp && (
                  <div className="space-y-2">
                    <Label htmlFor="username">{t("username")}</Label>
                    <Input
                      id="username"
                      placeholder="johndoe"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="rounded-xl"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">{t("email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">{t("password")}</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="rounded-xl"
                  />
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full rounded-xl" 
              disabled={loading}
            >
              {loading 
                ? t("loading") 
                : isSettingNewPassword 
                ? t("updatePassword")
                : isForgotPassword 
                ? t("sendResetLink") 
                : (isSignUp ? t("signUp") : t("signIn"))}
            </Button>
            
            {!isSettingNewPassword && !isForgotPassword && (
              <>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  {isSignUp ? t("alreadyHaveAccount") : t("dontHaveAccount")}
                </Button>
                
                {!isSignUp && (
                  <Button
                    type="button"
                    variant="link"
                    className="w-full text-sm"
                    onClick={() => setIsForgotPassword(true)}
                  >
                    {t("forgotPassword")}
                  </Button>
                )}
              </>
            )}
            
            {(isForgotPassword || isSettingNewPassword) && (
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => {
                  setIsForgotPassword(false);
                  setIsSettingNewPassword(false);
                }}
              >
                {t("backToSignIn")}
              </Button>
            )}
            
            {/* Theme and Language switches */}
            <div className="w-full pt-4 border-t space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  <span className="text-sm">{theme === "dark" ? t("darkMode") : t("lightMode")}</span>
                </div>
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={toggleTheme}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">{t("language")}</span>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={language === "en" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLanguage("en")}
                    className="text-xs"
                  >
                    EN
                  </Button>
                  <Button
                    type="button"
                    variant={language === "ru" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLanguage("ru")}
                    className="text-xs"
                  >
                    RU
                  </Button>
                </div>
              </div>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
