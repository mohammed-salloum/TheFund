import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { LanguageProvider } from "./context/LanguageContext";
import { FontProvider } from "./context/FontContext";
import { ThemeProvider } from "./context/ThemeContext"; 
import "./i18n/i18n";
import "./styles/theme.css"; 


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <FontProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </FontProvider>
    </LanguageProvider>
  </StrictMode>
);
