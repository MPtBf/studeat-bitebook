import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ru";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    profile: "Profile",
    settings: "Settings",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    signOut: "Sign Out",
    language: "Language",
    english: "English",
    russian: "Russian",
    guides: "Guides",
    recipes: "Recipes",
    plan: "Plan",
    list: "List",
    signUp: "Sign Up",
    profileSettings: "Profile Settings",
    changeAvatar: "Change Avatar",
    username: "Username",
    updateUsername: "Update Username",
    changePassword: "Change Password",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmPassword: "Confirm Password",
    updatePassword: "Update Password",
    phoneNumber: "Phone Number",
    addPhone: "Add Phone Number",
    updatePhone: "Update Phone",
    subscriptions: "Subscriptions & Billing",
    aiAccess: "AI Tools Access",
    active: "Active",
    inactive: "Inactive",
    paymentHistory: "Payment History",
    noPayments: "No payment history yet",
    date: "Date",
    amount: "Amount",
    status: "Status",
    save: "Save",
    cancel: "Cancel",
  },
  ru: {
    profile: "Профиль",
    settings: "Настройки",
    darkMode: "Темная тема",
    lightMode: "Светлая тема",
    signOut: "Выйти",
    language: "Язык",
    english: "Английский",
    russian: "Русский",
    guides: "Гайды",
    recipes: "Рецепты",
    plan: "План",
    list: "Список",
    signUp: "Регистрация",
    profileSettings: "Настройки профиля",
    changeAvatar: "Изменить аватар",
    username: "Имя пользователя",
    updateUsername: "Обновить имя",
    changePassword: "Изменить пароль",
    currentPassword: "Текущий пароль",
    newPassword: "Новый пароль",
    confirmPassword: "Подтвердите пароль",
    updatePassword: "Обновить пароль",
    phoneNumber: "Номер телефона",
    addPhone: "Добавить телефон",
    updatePhone: "Обновить телефон",
    subscriptions: "Подписки и оплата",
    aiAccess: "Доступ к AI инструментам",
    active: "Активна",
    inactive: "Неактивна",
    paymentHistory: "История платежей",
    noPayments: "История платежей пока пуста",
    date: "Дата",
    amount: "Сумма",
    status: "Статус",
    save: "Сохранить",
    cancel: "Отмена",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved === "ru" || saved === "en") ? saved : "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
