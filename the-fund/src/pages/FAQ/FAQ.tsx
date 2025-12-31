// src/pages/FAQ/FAQ.tsx
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import FAQItem from "../../components/FAQ/FAQItem";
import "./FAQ.css";

interface FAQEntry {
  question: string;
  answer: string;
}

function FAQ() {
  const { theme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  // البيانات من ملف الترجمة — TypeScript يحتاج نحدد أنها مصفوفة FAQEntry[]
  const faqData: FAQEntry[] = t("faq.items", {
    returnObjects: true,
  }) as FAQEntry[];

  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);

  const toggleFAQ = (index: number) => {
    setActiveIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div
      className={`faq-container ${theme} ${isRTL ? "rtl" : "ltr"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <h2 className="faq-title">{t("faq.title")}</h2>

      {faqData.map((item, index) => (
        <FAQItem
          key={index}
          item={item}
          isActive={activeIndexes.includes(index)}
          onToggle={() => toggleFAQ(index)}
        />
      ))}
    </div>
  );
}

export default FAQ;
