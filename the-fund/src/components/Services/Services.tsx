import { useTranslation } from "react-i18next";
import {
  Star,
  User,
  Settings,
  Bell,
  Mail,
  RefreshCw,
  Search,
  Tag,
  Calendar,
  DollarSign
} from "lucide-react";

import "./services.css";

export default function Services() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const stats = [
    { label: t("services.stats.all"), value: 123, active: true },
    { label: t("services.stats.new"), value: 52 },
    { label: t("services.stats.pendingApproval"), value: 123 },
    { label: t("services.stats.disbursement"), value: 72 },
    { label: t("services.stats.payable"), value: 45 },
    { label: t("services.stats.rejected"), value: 52 }
  ];

  const cards = new Array(8).fill(0).map(() => ({
    id: 12345,
    rating: 5,
    applicant: t("services.card.applicant"),
    status: t("services.card.status"),
    date: "15-06-2022",
    amount: "AED"
  }));

  return (
    <div className="srv-wrapper" dir={lang === "ar" ? "rtl" : "ltr"}>

      {/* Sidebar */}
      <aside className="srv-sidebar">
        <img src="/assets/header/the-fund.png" className="srv-logo" />

        <nav className="srv-menu">
          <button className="srv-menu-item">{t("services.menu.projectsSupport")}</button>
          <button className="srv-menu-item active">{t("services.menu.dashboard")}</button>
          <button className="srv-menu-item">{t("services.menu.projects")}</button>
          <button className="srv-menu-item">{t("services.menu.customerService")}</button>
          <button className="srv-menu-item">{t("services.menu.settings")}</button>
          <button className="srv-menu-item">{t("services.menu.reports")}</button>
          <button className="srv-menu-item">{t("services.menu.agenda")}</button>
          <button className="srv-menu-item">{t("services.menu.receivables")}</button>
          <button className="srv-menu-item">{t("services.menu.payments")}</button>
        </nav>
      </aside>

      {/* Content */}
      <main className="srv-content">

        {/* Header */}
        <header className="srv-header">
          <div className="srv-search-box">
            <Search size={20} className="srv-search-icon" />
            <input type="text" placeholder={t("services.search")} />
          </div>

          <div className="srv-header-actions">
            <button className="srv-icon-btn srv-bell">
              <Bell size={20} />
            </button>
            <button className="srv-icon-btn"><Mail size={20} /></button>
            <button className="srv-icon-btn"><Settings size={20} /></button>
            <button className="srv-icon-btn"><User size={20} /></button>
          </div>
        </header>

        {/* Stats */}
        <section className="srv-stats">
          {stats.map((s, i) => (
            <div className={`srv-stat ${s.active ? "active" : ""}`} key={i}>
              <h3>{s.value}</h3>
              <p>{s.label}</p>
            </div>
          ))}
        </section>

        {/* Filters */}
        <div className="srv-filters">
          <div className="srv-filter-fields">
            <input type="text" placeholder={t("services.filters.requestNumber")} />
            <input type="text" placeholder={t("services.filters.date")} />
            <input type="text" placeholder={t("services.filters.status")} />
            <input type="text" placeholder={t("services.filters.type")} />
          </div>

          <div className="srv-filter-actions">
            <button className="srv-refresh-btn"><RefreshCw size={18} /></button>
            <button className="srv-search-btn">{t("services.buttons.search")}</button>
          </div>
        </div>

        {/* Cards */}
        <section className="srv-cards-grid">
          {cards.map((c, i) => (
            <div key={i} className="srv-card">

              <div className="srv-rating-badge yellow">
                <Star size={12} fill="#fff" /> {c.rating}
              </div>

              <div className="srv-card-id">{c.id}</div>

              <div className="srv-info-row">
                <User size={14} className="srv-icon orange" />
                {c.applicant}
              </div>

              <div className="srv-info-row">
                <Tag size={14} className="srv-icon orange" />
                {c.status}
              </div>

              <div className="srv-info-row">
                <Calendar size={14} className="srv-icon gray" />
                {c.date}
              </div>

              <div className="srv-info-row srv-amount">
                <DollarSign size={14} className="srv-icon gray" />
                {t("services.card.totalAmount")}
                <span className="srv-amount-val">{c.amount}</span>
              </div>

            </div>
          ))}
        </section>

      </main>
    </div>
  );
}
