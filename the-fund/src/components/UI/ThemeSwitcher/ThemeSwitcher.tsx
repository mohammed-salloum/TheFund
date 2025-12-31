import { useContext } from "react";
import type { FC, ComponentType } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import type { ThemeName } from "../../../context/ThemeContext";

import { FaPalette, FaEye, FaLeaf , FaBook } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "./ThemeSwitcher.css";

export interface ThemeSwitcherProps {
  displayInline?: boolean;
  showNames?: boolean;
  onlyLight?: boolean;
  onlyDark?: boolean;
}

const iconMap: Record<ThemeName, ComponentType<{ className?: string }>> = {
  default: FaPalette,
  evergreen: FaLeaf,
  colorblind: FaEye,
   reading: FaBook,
};

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({
  displayInline = false,
  showNames = true,
  onlyLight = false,
  onlyDark = false,
}) => {
  const { theme, setTheme, themes } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  let displayed = [...themes];

  // ممكن تستخدم لاحقاً
  if (onlyLight) displayed = displayed.filter((th) => th !== "colorblind");
  if (onlyDark) displayed = displayed.filter((th) => th === "colorblind");

  const containerClass = `theme-container ${displayInline ? "inline" : ""} ${
    isRTL ? "rtl" : ""
  }`;

  return (
    <div className={containerClass}>
      {displayed.map((th) => {
        const Icon = iconMap[th];
        return (
          <button
            key={th}
            type="button"
            className={`theme-btn theme-${th} ${theme === th ? "active" : ""}`}
            onClick={() => setTheme(th)}
            aria-pressed={theme === th}
            title={t ? t(`themes.${th}`) : th}
          >
            <Icon className="theme-icon" />
            {showNames && (
              <span className="theme-name">
                {t ? t(`themes.${th}`) : th}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ThemeSwitcher;
