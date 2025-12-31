// hooks/useScrollToTop.ts
import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";

export default function useScrollToTop(): void {
  const { pathname, search, hash } = useLocation();
  const { language } = useContext(LanguageContext);

  // منع استعادة التمرير التلقائي للمتصفح عند إعادة تحميل الصفحة
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // التمرير للأعلى عند تغيير اللغة أو المسار
  useEffect(() => {
    const isRTL: boolean = language === "ar";

    // ضبط اتجاه الصفحة
    document.documentElement.dir = isRTL ? "rtl" : "ltr";

    window.scrollTo({
      top: 0,
      left: isRTL ? document.documentElement.scrollWidth : 0,
      behavior: "smooth",
    });
  }, [pathname, search, hash, language]);
}
