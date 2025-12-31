import React, { createContext, useState, useEffect } from "react";

export type ThemeName = "default" | "evergreen" | "reading" | "colorblind";

interface ThemeContextProps {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;

  darkMode: boolean;
  setDarkMode: (v: boolean) => void;

  themes: ThemeName[];
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: "default",
  setTheme: () => {},

  darkMode: false,
  setDarkMode: () => {},

  themes: ["default", "evergreen", "reading" , "colorblind"],
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // ▼ تحميل القيم من localStorage عند بداية الصفحة
  const [theme, setTheme] = useState<ThemeName>(() => {
    return (localStorage.getItem("theme") as ThemeName) || "default";
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // ----------------------------------
  // 🔥 أهم جزء: تحديث <body> + التخزين
  // ----------------------------------
  useEffect(() => {
    const body = document.body;

    // تعيين الثيم على body
    body.setAttribute("data-theme", theme);

    // تخزين الثيم
    localStorage.setItem("theme", theme);

    // الوضع الداكن
    if (darkMode) {
      body.setAttribute("data-dark", "true");
      localStorage.setItem("darkMode", "true");
    } else {
      body.removeAttribute("data-dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [theme, darkMode]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        darkMode,
        setDarkMode,
        themes: ["default", "evergreen", "reading" , "colorblind"],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
