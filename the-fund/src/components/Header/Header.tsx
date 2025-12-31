import {
  FaBars,
  FaGlobe,
  FaMapMarkedAlt,
  FaRegSun,
  FaSearch,
  FaSignInAlt,
  FaTimes,
} from "react-icons/fa";
import ReactCountryFlag from "react-country-flag";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
import "./Header.css";

import Search from "../Modals/Search/Search";
import Settings from "../Modals/Settings/Settings";
import SiteMap from "../Modals/SiteMap/SiteMap";

type AppLang = "ar" | "en";

export default function Header() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang?: AppLang }>();
  const language: AppLang = lang === "ar" ? "ar" : "en";

  const { changeLanguage } = useContext(LanguageContext);

  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openSiteMap, setOpenSiteMap] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navMenuRef = useRef<HTMLUListElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // غلق الدروب داون عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowLangDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

useEffect(() => {
  if (mobileMenuOpen) {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden"; // مهم على بعض المتصفحات
  } else {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  }
}, [mobileMenuOpen]);


const switchLanguage = (newLang: AppLang) => {
  setShowLangDropdown(false);

  // استخدم useLayoutEffect-like للتحديث فوراً
  setMobileMenuOpen(false);
  document.body.style.overflow = "";

  const currentPath = location.pathname.split("/").slice(2).join("/");
  changeLanguage(newLang);
  navigate(`/${newLang}/${currentPath}`, { replace: true });
};

  const handleNavClick = () => setMobileMenuOpen(false);

  return (
    <>
{mobileMenuOpen && (
  <div
    className="header-overlay"
    onClick={() => setMobileMenuOpen(false)}
  />
)}
      <header className="header-wrapper">
        <div className="header-top">
       <div className="top-container">
<Link to={`/${language}`} className="header-logo-tooltip">
  <img src="/assets/header/the-fund.png" alt="THE FUND" className="fund-img" />
  <span className="header-tooltip-text">{t("footer.goHome")}</span>
</Link>

<Link to={`/${language}`} className="header-logo-tooltip">
  <img src="/assets/header/dubai-sme.png" alt="Dubai SME" className="dubai-img" />
  <span className="header-tooltip-text">{t("footer.goHome")}</span>
</Link>

</div>

        </div>

        <div className="nav-utility-wrapper">
          {/* NAV MENU */}
          <ul
            ref={navMenuRef}
            className={`nav-menu ${mobileMenuOpen ? "open" : ""}`}
            role="dialog"
            aria-modal={mobileMenuOpen}
            id="navbar-menu"
          >
            <button className="close-btn" onClick={() => setMobileMenuOpen(false)}>
              <FaTimes />
            </button>
            <li><Link to={`/${language}`} onClick={handleNavClick}>{t("header.home")}</Link></li>
            <li><Link to={`/${language}/about`} onClick={handleNavClick}>{t("header.about")}</Link></li>
            <li><Link to={`/${language}/services`} onClick={handleNavClick}>{t("header.services")}</Link></li>

            <li>
              <a
                href="#media-center-section"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick();
                  if (location.pathname === `/${language}`) {
                    document.getElementById("media-center-section")?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    navigate(`/${language}`);
                    setTimeout(() => {
                      document.getElementById("media-center-section")?.scrollIntoView({ behavior: "smooth" });
                    }, 400);
                  }
                }}
              >
                {t("header.media")}
              </a>
            </li>

            <li>
              <a
                href="#partners-section"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick();
                  if (location.pathname === `/${language}`) {
                    document.getElementById("partners-section")?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    navigate(`/${language}`);
                    setTimeout(() => {
                      document.getElementById("partners-section")?.scrollIntoView({ behavior: "smooth" });
                    }, 400);
                  }
                }}
              >
                {t("header.partners")}
              </a>
            </li>

            <li><Link to={`/${language}/initiatives`} onClick={handleNavClick}>{t("header.initiatives")}</Link></li>
            <li><Link to={`/${language}/contact`} onClick={handleNavClick}>{t("header.contact")}</Link></li>
          </ul>

          {/* UTILITY TOOLBAR */}
          <div className="utility-toolbar">
<div className="lang-dropdown-wrapper" ref={dropdownRef}>
  <button className="utility-item" onClick={() => setShowLangDropdown(!showLangDropdown)}>
    <FaGlobe size={18} />
    <span>{language === "ar" ? t("header.lang_ar") : t("header.lang_en")}</span>
  </button>
  {showLangDropdown && (
    <div className="lang-dropdown">
      <button onClick={() => switchLanguage("ar")}>
        <ReactCountryFlag countryCode="AE" svg className="lang-flag" />
        {t("header.lang_ar")}
      </button>
      <button onClick={() => switchLanguage("en")}>
        <ReactCountryFlag countryCode="GB" svg className="lang-flag" />
        {t("header.lang_en")}
      </button>
    </div>
  )}
</div>
          <button className="utility-item" onClick={() => setOpenSettings(true)}>
  <FaRegSun className="utility-icon" size={18} />
  <span>{t("header.settings")}</span>
</button>

<button className="utility-item" onClick={() => setOpenSearch(true)}>
  <FaSearch className="utility-icon" size={18} />
  <span>{t("header.search")}</span>
</button>

<button className="utility-item" onClick={() => setOpenSiteMap(true)}>
  <FaMapMarkedAlt className="utility-icon" size={18} />
  <span>{t("header.sitemap")}</span>
</button>

<button className="utility-item" onClick={() => navigate(`/${language}/login`)}>
  <FaSignInAlt className="utility-icon" size={18} />
  <span>{t("header.login")}</span>
</button>


            {/* Hamburger */}
    <button
  className="utility-item hamburger-btn"
 onClick={() => setMobileMenuOpen(prev => !prev)}

>
  <FaBars size={18} />
</button>

          </div>
        </div>
      </header>

      {openSettings && <Settings onClose={() => setOpenSettings(false)} />}
      {openSearch && <Search onClose={() => setOpenSearch(false)} />}
      {openSiteMap && <SiteMap onClose={() => setOpenSiteMap(false)} />}
    </>
  );
}
