import React, { createContext, useState, useEffect } from "react";
import i18n from "../i18n/i18n";

type Lang = "ar" | "en";

interface LanguageContextType {
  language: Lang;
  changeLanguage: (lang: Lang) => void;
}

// إنشاء Context بإعدادات أولية
export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  changeLanguage: () => {},
});

// دالة اكتشاف اللغة من الدومين
function detectLanguageFromDomain(): Lang {
  try {
    const hostname = window.location.hostname.toLowerCase();

    const domainLangMap: Record<string, Lang> = {
      "ae.web.app": "ar",
      "us.web.app": "en",
    };

    for (const key in domainLangMap) {
      if (hostname.includes(key)) return domainLangMap[key];
    }

    return "en"; // الافتراضي
  } catch (err) {
    console.error("Error detecting language from domain:", err);
    return "en";
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Lang>(() => {
    return (localStorage.getItem("app-language") as Lang) || detectLanguageFromDomain();
  });

  // تغيير اللغة
  const changeLanguage = (lang: Lang) => {
    setLanguage(lang);
    localStorage.setItem("app-language", lang);
    i18n.changeLanguage(lang);

    // تعديل الاتجاه واللغة
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  };

  // تحديث عند تشغيل التطبيق
  useEffect(() => {
    i18n.changeLanguage(language);

    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
