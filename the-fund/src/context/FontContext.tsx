import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface FontContextType {
  fontSize: number;
  setFontSize: (size: number) => void;
  fontFamily: string;
  setFontFamily: (font: string) => void;
}

export const FontContext = createContext<FontContextType>({
  fontSize: 10,
  setFontSize: () => {},
  fontFamily: "'Inter', sans-serif",
  setFontFamily: () => {},
});

interface FontProviderProps {
  children: ReactNode;
}

export const FontProvider = ({ children }: FontProviderProps) => {
  const [fontSize, setFontSize] = useState<number>(() => {
    const savedSize = localStorage.getItem("fontSize");
    return savedSize ? parseInt(savedSize, 10) : 10;
  });

  const [fontFamily, setFontFamily] = useState<string>(() => {
    return localStorage.getItem("fontFamily") || "'Inter', sans-serif";
  });

  useEffect(() => {
    document.documentElement.style.setProperty("--main-font-size", `${fontSize}px`);
    document.documentElement.style.setProperty("--main-font", fontFamily);

    localStorage.setItem("fontSize", fontSize.toString());
    localStorage.setItem("fontFamily", fontFamily);
  }, [fontSize, fontFamily]);

  return (
    <FontContext.Provider
      value={{ fontSize, setFontSize, fontFamily, setFontFamily }}
    >
      {children}
    </FontContext.Provider>
  );
};
