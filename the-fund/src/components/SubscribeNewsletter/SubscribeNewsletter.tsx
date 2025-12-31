import "./SubscribeNewsletter.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function SubscribeNewsletter({ isStandalone = true }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const language = i18n.language;

  return (
    <section
      className="newsletter-section py-5"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <div className="container">

        {/* Page Header */}
        <div className="text-center mb-4">
          <h2 className="newsletter-title">{t("newsletter.title")}</h2>
          <p className="newsletter-subtitle w-75 mx-auto">
            {t("newsletter.subtitle")}
          </p>

          {!isStandalone && (
            <button
              className="btn-newsletter mt-3"
              onClick={() => navigate(`/${language}/newsletter`)}
            >
              {t("newsletter.subscribeButton")}
            </button>
          )}
        </div>

        {/* Form */}
        <form className="newsletter-form mx-auto mt-4">
          <input
            type="email"
            placeholder={t("newsletter.emailPlaceholder")}
            className="newsletter-input"
          />
          <button type="submit" className="btn-submit-newsletter">
            {t("newsletter.submit")}
          </button>
        </form>

      </div>
    </section>
  );
}
