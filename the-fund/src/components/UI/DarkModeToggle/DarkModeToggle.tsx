import { useContext } from "react";
import type { FC } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { BsFillSunFill, BsMoonStarsFill } from "react-icons/bs"; // ← أيقونات احترافية
import "./DarkModeToggle.css";

const DarkModeToggle: FC = () => {
  const { theme, darkMode, setDarkMode } = useContext(ThemeContext);
  const { t } = useTranslation();

  const disabled = theme === "colorblind";

  const handleClick = () => {
    if (!disabled) setDarkMode(!darkMode);
  };

  return (
    <button
      type="button"
      className={`dark-toggle-pro ${darkMode ? "on" : "off"} ${disabled ? "disabled" : ""}`}
      onClick={handleClick}
      aria-pressed={darkMode}
      disabled={disabled}
      title={
        disabled
          ? t("settings.darkDisabled")
          : darkMode
          ? t("settings.disableDark")
          : t("settings.enableDark")
      }
    >
      {darkMode ? (
        <BsMoonStarsFill className="dark-icon" />
      ) : (
        <BsFillSunFill className="light-icon" />
      )}

      {!darkMode && !disabled && <span className="slash"></span>}
    </button>
  );
};

export default DarkModeToggle;
