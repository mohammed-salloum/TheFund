import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import ContactInfo from "../../components/ContactUs/ContactInfo";
import ContactForm from "../../components/ContactUs/ContactForm";
import ContactMap from "../../components/ContactUs/ContactMap";
import "./ContactUs.css";

const ContactUs: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme } = useContext(ThemeContext);

  const isRTL: boolean = i18n.language === "ar";

  return (
<div className={`contact-container mt-5 ${theme}`} dir={isRTL ? "rtl" : "ltr"}>
      <h2 className="contact-title">{t("contact.title")}</h2>

      <div className="contact-wrapper">
        {/* القسم الأيسر: نموذج التواصل */}
        <div className="contact-form-side">
          <ContactForm/>
        </div>

        {/* القسم الأيمن: معلومات التواصل + الخريطة */}
        <div className="contact-info-side">
          <ContactInfo/>
          <ContactMap small />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
