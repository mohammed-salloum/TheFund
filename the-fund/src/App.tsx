import { useEffect, useContext } from "react";
import { LanguageContext } from "./context/LanguageContext";
import AppRouter from "./routes/AppRouter";

export default function App() {
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    document.documentElement.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
  }, [language]);

  return <AppRouter />;
}
