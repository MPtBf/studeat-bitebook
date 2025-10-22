import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Camera, Languages, CreditCard } from "lucide-react";

/**
 * Profile page - user profile management
 */
export default function Profile() {
  const { user, profile } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { toast } = useToast();

  const [username, setUsername] = useState(profile?.username || "");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdatingUsername, setIsUpdatingUsername] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isUpdatingPhone, setIsUpdatingPhone] = useState(false);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // For now, just show a placeholder message
    toast({
      title: t("changeAvatar"),
      description: "Avatar upload will be implemented soon",
    });
  };

  const handleUpdateUsername = async () => {
    if (!user || !username.trim()) return;
    
    setIsUpdatingUsername(true);
    const { error } = await supabase
      .from("profiles")
      .update({ username: username.trim() })
      .eq("user_id", user.id);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Username updated successfully",
      });
    }
    setIsUpdatingUsername(false);
  };

  const handleUpdatePassword = async () => {
    if (!newPassword || newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsUpdatingPassword(true);
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Password updated successfully",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    setIsUpdatingPassword(false);
  };

  const handleUpdatePhone = async () => {
    if (!phoneNumber.trim()) return;
    
    setIsUpdatingPhone(true);
    // Phone number update will be implemented with proper verification
    toast({
      title: t("phoneNumber"),
      description: "Phone number update will be implemented soon",
    });
    setIsUpdatingPhone(false);
  };

  // Mock subscription data
  const subscription = {
    aiAccess: true,
    expiresAt: "2025-12-31",
  };

  // Mock payment history
  const paymentHistory = [
    { id: 1, date: "2025-01-15", amount: "$9.99", status: "Completed" },
    { id: 2, date: "2024-12-15", amount: "$9.99", status: "Completed" },
    { id: 3, date: "2024-11-15", amount: "$9.99", status: "Completed" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">{t("profileSettings")}</h1>

        {/* Avatar Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t("changeAvatar")}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile?.avatar_url || undefined} />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {profile?.username?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
              <label htmlFor="avatar-upload">
                <Button variant="outline" className="cursor-pointer" asChild>
                  <span>
                    <Camera className="mr-2 h-4 w-4" />
                    {t("changeAvatar")}
                  </span>
                </Button>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Username Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t("username")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">{t("username")}</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={profile?.username}
              />
            </div>
            <Button 
              onClick={handleUpdateUsername} 
              disabled={isUpdatingUsername || !username.trim()}
            >
              {t("updateUsername")}
            </Button>
          </CardContent>
        </Card>

        {/* Password Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t("changePassword")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">{t("currentPassword")}</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">{t("newPassword")}</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">{t("confirmPassword")}</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleUpdatePassword} 
              disabled={isUpdatingPassword || !newPassword}
            >
              {t("updatePassword")}
            </Button>
          </CardContent>
        </Card>

        {/* Phone Number Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t("phoneNumber")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">{t("phoneNumber")}</Label>
              <Input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <Button 
              onClick={handleUpdatePhone} 
              disabled={isUpdatingPhone || !phoneNumber.trim()}
            >
              {t("updatePhone")}
            </Button>
          </CardContent>
        </Card>

        {/* Language Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t("language")}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <Languages className="h-5 w-5 text-muted-foreground" />
            <div className="flex gap-2">
              <Button
                variant={language === "en" ? "default" : "outline"}
                onClick={() => setLanguage("en")}
              >
                {t("english")}
              </Button>
              <Button
                variant={language === "ru" ? "default" : "outline"}
                onClick={() => setLanguage("ru")}
              >
                {t("russian")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Subscriptions Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t("subscriptions")}</CardTitle>
            <CardDescription>
              View your active subscriptions and access
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{t("aiAccess")}</p>
                  <p className="text-sm text-muted-foreground">
                    Expires: {subscription.expiresAt}
                  </p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm ${
                subscription.aiAccess 
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" 
                  : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
              }`}>
                {subscription.aiAccess ? t("active") : t("inactive")}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment History Section */}
        <Card>
          <CardHeader>
            <CardTitle>{t("paymentHistory")}</CardTitle>
          </CardHeader>
          <CardContent>
            {paymentHistory.length > 0 ? (
              <div className="space-y-3">
                {paymentHistory.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{payment.amount}</p>
                      <p className="text-sm text-muted-foreground">{payment.date}</p>
                    </div>
                    <div className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      {payment.status}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                {t("noPayments")}
              </p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
