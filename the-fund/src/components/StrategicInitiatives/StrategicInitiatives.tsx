import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./StrategicInitiatives.css";
import { FaChartLine, FaProjectDiagram, FaRegLightbulb, FaTools } from "react-icons/fa";

type InitiativeTranslationKey =
  | "card1Title"
  | "card1Desc"
  | "card2Title"
  | "card2Desc"
  | "card3Title"
  | "card3Desc"
  | "card4Title"
  | "card4Desc";

interface CardProps {
  icon: ReactNode;
  title: InitiativeTranslationKey;
  desc: InitiativeTranslationKey;
}

interface Initiative {
  icon: ReactNode;
  title: InitiativeTranslationKey;
  desc: InitiativeTranslationKey;
}

export default function StrategicInitiatives({ isStandalone = false }: { isStandalone?: boolean }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.dir() === "rtl";

  const initiatives: Initiative[] = [
    { icon: <FaRegLightbulb />, title: "card1Title", desc: "card1Desc" },
    { icon: <FaChartLine />, title: "card2Title", desc: "card2Desc" },
    { icon: <FaTools />, title: "card3Title", desc: "card3Desc" },
    { icon: <FaProjectDiagram />, title: "card4Title", desc: "card4Desc" },
  ];

  const [cardsPerSlide, setCardsPerSlide] = useState(4);
  const [currentSlide, setCurrentSlide] = useState(0);
  const directionRef = useRef<"forward" | "backward">("forward");

  // Responsive
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) setCardsPerSlide(4);
      else if (window.innerWidth >= 768) setCardsPerSlide(2);
      else setCardsPerSlide(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update CSS variable for cards per slide
  useEffect(() => {
    document.documentElement.style.setProperty("--cards-per-slide", cardsPerSlide.toString());
  }, [cardsPerSlide]);

  // Split initiatives into slides
  const slides: Initiative[][] = [];
  for (let i = 0; i < initiatives.length; i += cardsPerSlide) {
    slides.push(initiatives.slice(i, i + cardsPerSlide));
  }
  const totalSlides = slides.length;

  // Reset on language change
  useEffect(() => {
    setCurrentSlide(0);
    directionRef.current = "forward";
  }, [i18n.language]);

  // Auto-slide ping-pong
  useEffect(() => {
    if (cardsPerSlide >= initiatives.length) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        if (directionRef.current === "forward") {
          if (prev + 1 >= totalSlides) {
            directionRef.current = "backward";
            return prev - 1;
          }
          return prev + 1;
        } else {
          if (prev - 1 < 0) {
            directionRef.current = "forward";
            return prev + 1;
          }
          return prev - 1;
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [cardsPerSlide, totalSlides]);

  const goToSlide = (idx: number) => setCurrentSlide(idx);

  return (
    <section className="initiatives-section" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container">
        <div className="header-wrapper text-center mb-5">
          <h2 className="initiatives-title">{t("initiatives.title")}</h2>
          <p className="initiatives-subtitle">{t("initiatives.subtitle")}</p>
          {!isStandalone && (
            <button className="btn-initiatives mt-3" onClick={() => navigate(`/${i18n.language}/initiatives`)}>
              {t("initiatives.exploreButton")}
            </button>
          )}
        </div>

        {cardsPerSlide >= initiatives.length ? (
          <div className="initiatives-grid">
            {initiatives.map((item, idx) => (
              <Card key={idx} icon={item.icon} title={item.title} desc={item.desc} />
            ))}
          </div>
        ) : (
          <div className="initiatives-carousel">
            <div
              className={`carousel-track ${isRTL ? "rtl" : "ltr"}`}
              style={{ transform: isRTL ? `translateX(${currentSlide * 100}%)` : `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slideItems, idx) => (
                <div className="carousel-slide" key={idx}>
                  {slideItems.map((item, cIdx) => (
                    <Card key={cIdx} icon={item.icon} title={item.title} desc={item.desc} />
                  ))}
                </div>
              ))}
            </div>

            <div className="carousel-dots">
              {slides.map((_, idx) => (
                <span
                  key={idx}
                  className={`dot ${currentSlide === idx ? "active" : ""}`}
                  onClick={() => goToSlide(idx)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Card({ icon, title, desc }: CardProps) {
  const { t } = useTranslation();
  return (
    <div className="initiative-card">
      <div className="icon-wrapper">
        <span className="icon-react">{icon}</span>
      </div>
      <h3 className="card-title">{t(`initiatives.${title}`)}</h3>
      <p className="card-description">{t(`initiatives.${desc}`)}</p>
    </div>
  );
}
