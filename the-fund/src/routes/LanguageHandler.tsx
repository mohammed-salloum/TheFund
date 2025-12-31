import { useEffect, useContext } from "react";
import { useParams, Outlet, Navigate } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import { FontContext } from "../context/FontContext";
import useScrollToTop from "../hooks/useScrollToTop";

type AppLang = "en" | "ar";
const supportedLanguages: AppLang[] = ["en", "ar"];

const fonts: Record<AppLang, string> = {
  ar: "'Cairo', sans-serif",
  en: "'Inter', sans-serif",
};

export default function LanguageHandler() {
  const { lang } = useParams<{ lang: AppLang }>();

  const { changeLanguage } = useContext(LanguageContext);
  const { setFontFamily } = useContext(FontContext);

  // 🔥 هنا — داخل الـ Router فعليًا
  useScrollToTop();

  useEffect(() => {
    if (lang && supportedLanguages.includes(lang)) {
      changeLanguage(lang);
      setFontFamily(fonts[lang]);

      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    }
  }, [lang]);

  if (!lang || !supportedLanguages.includes(lang)) {
    return <Navigate to="/en" replace />;
  }

  return <Outlet />;
}
