import React, { useEffect } from "react";
import { IoClose, IoMapOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./SiteMap.css";

interface SiteMapProps {
  onClose: () => void;
}

const SiteMap: React.FC<SiteMapProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();

  const currentLang = lang || "en";

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleNavigate = (path: string) => {
    navigate(`/${currentLang}${path}`);
    onClose();
  };

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const previousTitle = document.title;
    document.title = t("siteMap.title");

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
      document.title = previousTitle;
    };
  }, [t]);

  return (
    <div className="sitemap-overlay" onClick={onClose}>
      <div className="sitemap-modal" onClick={stopPropagation}>
        <div className="sitemap-header">
          <div className="sitemap-title">
            <IoMapOutline className="sitemap-title-icon" />
            <h2>{t("siteMap.title")}</h2>
          </div>

          <button className="sitemap-close-btn" onClick={onClose}>
            <IoClose className="sitemap-close-icon" />
          </button>
        </div>

        <div className="sitemap-body">
          <ul className="sitemap-list">
            <li><button onClick={() => handleNavigate("")}>{t("siteMap.links.home")}</button></li>
            <li><button onClick={() => handleNavigate("/about")}>{t("siteMap.links.about")}</button></li>
            <li><button onClick={() => handleNavigate("/services")}>{t("siteMap.links.services")}</button></li>
            <li><button onClick={() => handleNavigate("/initiatives")}>{t("siteMap.links.initiatives")}</button></li>
            <li><button onClick={() => handleNavigate("/contact")}>{t("siteMap.links.contact")}</button></li>
            <li><button onClick={() => handleNavigate("/faq")}>{t("siteMap.links.faqs")}</button></li>
            <li><button onClick={() => handleNavigate("/newsletter")}>{t("siteMap.links.newsletter")}</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SiteMap;
