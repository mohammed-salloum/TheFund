import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./DigitalParticipation.css";

type TabKey = "suggestions" | "surveys" | "opinions";

interface TabItem {
  key: TabKey;
  label: string;
}

export default function DigitalParticipation() {
  const { t, i18n } = useTranslation();

  const tabs: TabItem[] = [
    { key: "suggestions", label: t("digital.tabs.suggestions") },
    { key: "surveys", label: t("digital.tabs.surveys") },
    { key: "opinions", label: t("digital.tabs.opinions") }
  ];

  const [activeTab, setActiveTab] = useState<TabKey>("suggestions");

  return (
    <section className="digital-section" dir={i18n.dir()}>
      <h2 className="digital-title">{t("digital.title")}</h2>

      {/* Tabs */}
      <div className="digital-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`digital-tab ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* White Box */}
      <div className="digital-box">
        {(activeTab === "surveys" || activeTab === "opinions") && (
          <p className="digital-coming-soon">{t("digital.comingSoon")}</p>
        )}

        {activeTab === "suggestions" && (
   <form className="digital-form suggestions-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <div className="form-col">
                <label>{t("digital.form.name")}</label>
                <input type="text" />
              </div>

              <div className="form-col">
                <label>{t("digital.form.email")}</label>
                <input type="email" />
              </div>

              <div className="form-col">
                <label>{t("digital.form.phone")}</label>
                <input type="text" />
              </div>
            </div>

            <div className="form-row full">
              <label>{t("digital.form.message")}</label>
              <textarea rows={5}></textarea>
            </div>

            <div className="submit-center">
              <button type="submit" className="digital-submit">
                {t("digital.form.send")}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
