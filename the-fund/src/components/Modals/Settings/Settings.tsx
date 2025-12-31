import React, { useContext, useEffect } from "react";
import ThemeSwitcher from "../../UI/ThemeSwitcher/ThemeSwitcher";
import FontSwitcher from "../../UI/FontSwitcher/FontSwitcher";
import DarkModeToggle from "../../UI/DarkModeToggle/DarkModeToggle";
import { useTranslation } from "react-i18next";
import { FontContext } from "../../../context/FontContext";
import { FiSettings } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import "./Settings.css";

interface SettingsProps {
  onClose: () => void;
}

function Settings({ onClose }: SettingsProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const { fontSize } = useContext(FontContext);

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const prevTitle = document.title;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    // 👈 إصلاح المفتاح — صار "settings.title"
    const updateTitle = () => {
      document.title = t("settings.title");
    };
    updateTitle();

    i18n.on("languageChanged", updateTitle);

    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
      i18n.off("languageChanged", updateTitle);
      document.title = prevTitle;
    };
  }, [i18n, t]);

  return (
    <div className="settings-modal-overlay" onClick={onClose}>
      <div
        className={`settings-modal ${isRTL ? "rtl" : "ltr"}`}
        style={{ fontSize: `${fontSize}px` }}
        onClick={stopPropagation}
      >
        <div className="settings-header">
          <h3 className="settings-title">
            <FiSettings className="settings-icon" /> {t("settings.title")}
          </h3>
          <button className="close-btn" onClick={onClose}>
            <IoClose className="close-icon" />
          </button>
        </div>

        <div className="settings-content">
          
          {/* -------- FONT SIZE -------- */}
          <div className="settings-section">
            <h4>{t("settings.fontSize")}</h4>
            <FontSwitcher defaultSize={18} />
          </div>

          <hr />

          {/* -------- THEMES -------- */}
          <div className="settings-section">
            <h4>{t("settings.themes")}</h4>
            <ThemeSwitcher displayInline={true} showNames={true} />
          </div>

          <hr />

          {/* -------- DARK MODE -------- */}
          <div className="settings-section">
            <h4>{t("settings.darkMode")}</h4>
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
