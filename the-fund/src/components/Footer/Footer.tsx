import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFax,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaSitemap,
  FaNewspaper,
  FaQuestionCircle,
  FaLightbulb,
} from "react-icons/fa";

import { IoChevronUpSharp } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";
import SiteMap from "../Modals/SiteMap/SiteMap";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const [openSiteMap, setOpenSiteMap] = useState(false);
  const dir = i18n.dir();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={`footer-container ${dir}`} dir={dir}>
      {/* ---------------- TOP NAVIGATION ---------------- */}
      <div className="footer-top-menu">
        <div className="footer-top-inner">
          <div className="footer-pill">

            {/* SITE MAP */}
            <button
              className="footer-link footer-sitemap-btn"
              data-label={t("footer.sitemap")}
              onClick={() => setOpenSiteMap(true)}
            >
              <FaSitemap className="footer-link-icon" />
              <span className="footer-link-text">{t("footer.sitemap")}</span>
            </button>

            <Link
              to={`/${lang}/newsletter`}
              onClick={scrollToTop}
              className="footer-link"
              data-label={t("footer.newsletter")}
            >
              <FaNewspaper className="footer-link-icon" />
              <span className="footer-link-text">{t("footer.newsletter")}</span>
            </Link>

            <Link
              to={`/${lang}/faq`}
              onClick={scrollToTop}
              className="footer-link"
              data-label={t("footer.faq")}
            >
              <FaQuestionCircle className="footer-link-icon" />
              <span className="footer-link-text">{t("footer.faq")}</span>
            </Link>

            <Link
              to={`/${lang}/initiatives`}
              onClick={scrollToTop}
              className="footer-link"
              data-label={t("footer.initiatives")}
            >
              <FaLightbulb className="footer-link-icon" />
              <span className="footer-link-text">{t("footer.initiatives")}</span>
            </Link>

            <Link
              to={`/${lang}/contact`}
              onClick={scrollToTop}
              className="footer-link"
              data-label={t("footer.contactUs")}
            >
              <FaPhoneAlt className="footer-link-icon" />
              <span className="footer-link-text">{t("footer.contactUs")}</span>
            </Link>
          </div>

          <button className="scroll-top-btn" onClick={scrollToTop}>
            <IoChevronUpSharp className="up-icon" />
          </button>
        </div>
      </div>

      {/* ---------------- MIDDLE SECTION ---------------- */}
      <div className="footer-middle container mt-4">
        <div className="row">
          <div className="col-md-4 footer-right">
            <p className="footer-line">
              <FaMapMarkerAlt className="footer-icon" />
              <span className="footer-text">{t("footer.addressFull")}</span>
            </p>
            <p className="footer-line">
              <FaEnvelope className="footer-icon" />
              <span className="footer-text">{t("footer.email")}</span>
            </p>
            <p className="footer-line">
              <FaPhoneAlt className="footer-icon" />
              <span className="footer-text phone-ltr">{t("footer.phone")}</span>
            </p>
            <p className="footer-line">
              <FaFax className="footer-icon" />
              <span className="footer-text">{t("footer.callCenter")}</span>
            </p>
          </div>

          <div className="col-md-4 footer-center">
            <a href="#" onClick={scrollToTop}>{t("footer.disclaimer")}</a>
            <a href="#" onClick={scrollToTop}>{t("footer.copyrightStatement")}</a>
            <a href="#" onClick={scrollToTop}>{t("footer.privacyPolicy")}</a>
            <a href="#" onClick={scrollToTop}>{t("footer.terms")}</a>
            <a href="#" onClick={scrollToTop}>{t("footer.uaeFuturePromise")}</a>
          </div>

          <div className="col-md-4 footer-left">
            <p className="footer-note">{t("footer.screenNote")}</p>
            <p className="footer-updated">
              {t("footer.lastUpdate")} <br />
              <span className="update-date" dir="ltr">
                {t("footer.lastUpdateDate")}
              </span>
            </p>
            <p className="footer-visitors">
              {t("footer.visitorsCount")}{" "}
              <span className="visitors-num" dir="ltr">
                {t("footer.visitorsNumber")}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* ---------------- BOTTOM SECTION ---------------- */}
      <div className="footer-bottom container mt-4">
        <div className="row align-items-center">
          <div className="col-md-4 d-flex justify-content-start">
<Link
  to={`/${lang}`}
  onClick={scrollToTop}
  className="tooltip-wrapper"
  aria-label={t("footer.goHome")}
>
  <img
    src="/assets/footer/the-fund.png"
    className="footer-logo"
    alt="The Fund"
  />
  <span className="tooltip-text">{t("footer.goHome")}</span>
</Link>


          </div>

          <div className="col-md-4 mid-text">
            <p>{t("footer.rightsReserved")}</p>
            <p>{t("footer.fundName")}</p>
          </div>

          <div className="col-md-4 d-flex justify-content-end">

            <Link
  to={`/${lang}`}
  onClick={scrollToTop}
  className="tooltip-wrapper"
  aria-label={t("footer.goHome")}
>
  <img
        src="/assets/footer/dubai-sme.png"
    className="footer-logo"
    alt="Dubai SME"
  />
  <span className="tooltip-text">{t("footer.goHome")}</span>
</Link>


          </div>
        </div>

        <div className="social-icons mt-3">
          <a><FaLinkedinIn /></a>
              <a> <FaInstagram /></a>
                  <a>  <FaTwitter /></a>
                      <a>      <FaFacebookF /></a>

    
        </div>
      </div>

      {openSiteMap && <SiteMap onClose={() => setOpenSiteMap(false)} />}
    </footer>
  );
}
