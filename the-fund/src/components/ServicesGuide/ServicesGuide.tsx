import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./ServicesGuide.css";

const ServicesGuide: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir(i18n.language);

  const tabs = [
    { key: "financeRequests", label: t("servicesGuide.financeRequests") },
    { key: "postFinance", label: t("servicesGuide.postFinance") },
  ];

  const [activeTab, setActiveTab] = useState("financeRequests");
  const [columns, setColumns] = useState(4);

  const financeServices = [
    t("servicesGuide.consultationForFinance"),
    t("servicesGuide.establishmentLoan"),
    t("servicesGuide.creditLoan"),
    t("servicesGuide.invoicePurchaseLoan"),
    t("servicesGuide.crowdFundingGuarantee"),
    t("servicesGuide.expansionLoan"),
    t("servicesGuide.shortTermLoan"),
    t("servicesGuide.assetFinanceLoan")
  ];

  // حساب عدد الأعمدة حسب الشاشة
  const updateColumns = () => {
    const width = window.innerWidth;

    if (width >= 1200) setColumns(4);       // Desktop
    else if (width >= 768) setColumns(2);   // Tablet / Medium
    else setColumns(1);                     // Mobile
  };

  useEffect(() => {
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const rows = Math.ceil(financeServices.length / columns);
  const hLines = Array.from({ length: rows - 1 });
  const vLines = columns > 1 ? Array.from({ length: columns - 1 }) : [];

  return (
    <section className={`services-section ${dir}`} dir={dir}>
      <h2 className="services-title">{t("servicesGuide.guideTitle")}</h2>

      <div className="services-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`service-tab ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "postFinance" ? (
        <div className="coming-soon">{t("servicesGuide.comingSoon")}</div>
      ) : (
        <div className={`services-grid ${dir}`}>
          {/* خطوط عمودية */}
          {vLines.map((_, i) => (
            <div
              key={`v${i}`}
              className="v-line"
              style={{ left: `${((i + 1) / columns) * 100}%` }}
            />
          ))}

          {/* خطوط أفقية */}
          {hLines.map((_, i) => (
            <div
              key={`h${i}`}
              className="h-line"
              style={{ top: `${((i + 1) / rows) * 100}%` }}
            />
          ))}

          {/* البطاقات */}
          {financeServices.map((title, i) => (
            <div key={i} className="service-card">
              <h3 className="service-card-title">{title}</h3>
              <div className="card-hover">
                <button className="card-btn">{t("servicesGuide.apply")}</button>
                <button className="card-details">
                  {t("servicesGuide.details")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ServicesGuide;
