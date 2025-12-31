import { FaChevronDown } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LanguageContext } from "../../context/LanguageContext";
import "./FAQItem.css";

interface FAQItemData {
  question: string;
  answer: string;
}

interface FAQItemProps {
  item: FAQItemData;
  isActive: boolean;
  onToggle: () => void;
}

function FAQItem({ item, isActive, onToggle }: FAQItemProps) {
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const isRTL = language === "ar";

  return (
    <div className={`faq-item ${isActive ? "active" : ""} ${theme} ${isRTL ? "rtl" : "ltr"}`}>
      <button className="faq-question" onClick={onToggle}>
        <span>{item.question}</span>
        <FaChevronDown className={`faq-icon ${isActive ? "rotate" : ""}`} />
      </button>

      <div className={`faq-answer ${isActive ? "open" : ""}`}>
        {item.answer}
      </div>
    </div>
  );
}

export default FAQItem;
