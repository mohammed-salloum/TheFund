// Search.tsx
import React, { useEffect } from "react";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import "./Search.css";

interface SearchProps {
  onClose: () => void;
}

const Search: React.FC<SearchProps> = ({ onClose }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const previousTitle = document.title;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const updateTitle = () => {
      document.title = t("search.title");
    };

    updateTitle();
    i18n.on("languageChanged", updateTitle);

    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
      i18n.off("languageChanged", updateTitle);
      document.title = previousTitle;
    };
  }, [i18n, t]);

  return (
    <div className="search-overlay" onClick={onClose}>
      <div
        className={`search-modal ${isRTL ? "rtl" : "ltr"}`}
        onClick={stopPropagation}
      >
        <div className="search-header">
          <div className="search-title">
            <IoSearchOutline className="search-title-icon" />
            <h2>{t("search.title")}</h2>
          </div>

          <button className="search-close-btn" onClick={onClose}>
            <IoClose className="search-close-icon" title={t("search.close")} />
          </button>
        </div>

        <div className="search-body">
          <input
            type="text"
            className="search-input"
            placeholder={t("search.placeholder")}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
