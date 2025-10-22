import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ru";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    profile: "Profile",
    settings: "Settings",
    guides: "Guides",
    recipes: "Recipes",
    plan: "Plan",
    list: "List",
    
    // Theme & Language
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    language: "Language",
    english: "English",
    russian: "Russian",
    
    // Auth
    signIn: "Sign In",
    signUp: "Sign Up",
    signOut: "Sign Out",
    welcomeBack: "Welcome back",
    createAccount: "Create an account",
    enterCredentials: "Enter your credentials to access your account",
    enterDetails: "Enter your details to create your Mealio account",
    email: "Email",
    password: "Password",
    username: "Username",
    loading: "Loading...",
    alreadyHaveAccount: "Already have an account? Sign in",
    dontHaveAccount: "Don't have an account? Sign up",
    close: "Close",
    welcomeToMealio: "Welcome to Mealio!",
    accountCreated: "Your account has been created successfully.",
    welcomeBackMessage: "You have been signed in successfully.",
    validationError: "Validation Error",
    signInFailed: "Sign In Failed",
    signUpFailed: "Sign Up Failed",
    error: "Error",
    unexpectedError: "An unexpected error occurred. Please try again.",
    
    // Home Page
    welcomeTo: "Welcome to",
    tagline: "Your ultimate recipe companion. Find delicious, budget-friendly recipes and plan your meals with ease.",
    
    // Recipes Page
    recipesTitle: "Recipes",
    comingSoon: "Coming soon...",
    
    // Week Plan Page
    weekPlanTitle: "Week Plan",
    
    // Shopping List Page
    shoppingListTitle: "Shopping List",
    
    // Settings Page
    settingsTitle: "Settings",
    
    // Profile Page
    profileSettings: "Profile Settings",
    changeAvatar: "Change Avatar",
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
    
    // Guides Page
    guidesTitle: "Guides",
    gettingStartedTitle: "Getting Started with Mealio",
    gettingStartedDesc: "Learn the basics of using Mealio to plan your meals and manage recipes.",
    gettingStartedContent: "Welcome to Mealio! This guide will help you get started with meal planning and recipe management.",
    
    recipeTipsTitle: "Recipe Tips & Tricks",
    recipeTipsDesc: "Discover helpful tips for finding and organizing your favorite recipes.",
    recipeTipsContent: "Learn how to make the most of the recipe features in Mealio, including search, filtering, and saving favorites.",
    
    budgetCookingTitle: "Budget-Friendly Cooking",
    budgetCookingDesc: "Learn how to cook delicious meals on a student budget.",
    budgetCookingContent: "Get tips and tricks for cooking nutritious and tasty meals without breaking the bank.",
  },
  ru: {
    // Navigation
    profile: "Профиль",
    settings: "Настройки",
    guides: "Гайды",
    recipes: "Рецепты",
    plan: "План",
    list: "Список",
    
    // Theme & Language
    darkMode: "Темная тема",
    lightMode: "Светлая тема",
    language: "Язык",
    english: "Английский",
    russian: "Русский",
    
    // Auth
    signIn: "Войти",
    signUp: "Регистрация",
    signOut: "Выйти",
    welcomeBack: "С возвращением",
    createAccount: "Создать аккаунт",
    enterCredentials: "Введите ваши данные для входа в аккаунт",
    enterDetails: "Введите ваши данные для создания аккаунта в Mealio",
    email: "Email",
    password: "Пароль",
    username: "Имя пользователя",
    loading: "Загрузка...",
    alreadyHaveAccount: "Уже есть аккаунт? Войти",
    dontHaveAccount: "Нет аккаунта? Зарегистрироваться",
    close: "Закрыть",
    welcomeToMealio: "Добро пожаловать в Mealio!",
    accountCreated: "Ваш аккаунт успешно создан.",
    welcomeBackMessage: "Вы успешно вошли в систему.",
    validationError: "Ошибка валидации",
    signInFailed: "Ошибка входа",
    signUpFailed: "Ошибка регистрации",
    error: "Ошибка",
    unexpectedError: "Произошла непредвиденная ошибка. Попробуйте снова.",
    
    // Home Page
    welcomeTo: "Добро пожаловать в",
    tagline: "Ваш идеальный помощник по рецептам. Находите вкусные и недорогие рецепты и планируйте свои блюда легко.",
    
    // Recipes Page
    recipesTitle: "Рецепты",
    comingSoon: "Скоро...",
    
    // Week Plan Page
    weekPlanTitle: "План недели",
    
    // Shopping List Page
    shoppingListTitle: "Список покупок",
    
    // Settings Page
    settingsTitle: "Настройки",
    
    // Profile Page
    profileSettings: "Настройки профиля",
    changeAvatar: "Изменить аватар",
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
    
    // Guides Page
    guidesTitle: "Гайды",
    gettingStartedTitle: "Начало работы с Mealio",
    gettingStartedDesc: "Изучите основы использования Mealio для планирования питания и управления рецептами.",
    gettingStartedContent: "Добро пожаловать в Mealio! Этот гайд поможет вам начать работу с планированием питания и управлением рецептами.",
    
    recipeTipsTitle: "Советы и хитрости по рецептам",
    recipeTipsDesc: "Откройте для себя полезные советы по поиску и организации любимых рецептов.",
    recipeTipsContent: "Узнайте, как максимально использовать функции рецептов в Mealio, включая поиск, фильтрацию и сохранение избранного.",
    
    budgetCookingTitle: "Готовка на бюджете",
    budgetCookingDesc: "Узнайте, как готовить вкусные блюда на студенческий бюджет.",
    budgetCookingContent: "Получите советы и хитрости по приготовлению питательных и вкусных блюд без больших затрат.",
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
