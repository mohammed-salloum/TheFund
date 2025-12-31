import { useState, useContext, useRef, useEffect, useMemo } from "react";
import "./MediaCenter.css";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../context/LanguageContext";

type TabType = "news" | "images" | "video";

export default function MediaCenter() {
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);

  const [activeTab, setActiveTab] = useState<TabType>("news");
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const descRefs = useRef<Record<number, HTMLParagraphElement | null>>({});

  // Detect mobile
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const cards = useMemo(
    () => [
      {
        id: 1,
        img: "/assets/media/emirates-islamic.png",
        text: t("media.items.1"),
        desc: t("media.descriptions.1"),
      },
      {
        id: 2,
        img: "/assets/media/emirates-islamic.png",
        text: t("media.items.2"),
        desc: t("media.descriptions.2"),
      },
      {
        id: 3,
        img: "/assets/media/adnic.png",
        text: t("media.items.3"),
        desc: t("media.descriptions.3"),
      },
    ],
    [t]
  );

  // Carousel autoplay for mobile only
  useEffect(() => {
    if (!isMobile || isCarouselPaused || activeTab !== "news") return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % cards.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isMobile, isCarouselPaused, activeTab, cards.length]);

  const toggleFlip = (id: number) => {
    setFlipped((prev) => {
      const nowFlipped = !prev[id];
      setIsCarouselPaused(nowFlipped);
      if (!nowFlipped) {
        const el = descRefs.current[id];
        if (el) el.scrollTop = 0;
      }
      return { ...prev, [id]: nowFlipped };
    });
  };

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    setFlipped({});
    setIsCarouselPaused(false);
    setCurrentSlide(0);
  };

  const renderCard = (card: typeof cards[number]) => (
    <div className={`flip-card ${flipped[card.id] ? "flipped" : ""}`}>
      <div className="flip-inner">
        {/* FRONT */}
        <div className="flip-front">
          <div className="news-card">
            <div className="news-img-box">
              <img src={card.img} className="news-img" alt="" />
            </div>
            <p className="news-text">{card.text}</p>
            <button className="flip-btn" onClick={() => toggleFlip(card.id)}>
              {t("media.items.details")}
            </button>
          </div>
        </div>

        {/* BACK */}
        <div className="flip-back">
          <div className="news-card">
            <p
              className="news-desc"
              ref={(el) => {
                descRefs.current[card.id] = el;
              }}
            >
              {card.desc}
            </p>
            <button className="flip-btn" onClick={() => toggleFlip(card.id)}>
              {t("media.items.back")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="media-center-section"
      className="media-section py-5"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="container">
        <h2 className="text-center media-title">{t("media.title")}</h2>

        {/* Tabs */}
        <div className="tabs-wrapper">
          {(["news", "images", "video"] as TabType[]).map((tab) => (
            <button
              key={tab}
              className={`media-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => handleTabClick(tab)}
            >
              {t(`media.tabs.${tab}`)}
            </button>
          ))}
        </div>

        {/* NEWS */}
        {activeTab === "news" && (
          <>
            {isMobile ? (
              <div className="mobile-carousel-wrapper">
                <div className="mobile-carousel">{renderCard(cards[currentSlide])}</div>
                <div className="carousel-dots">
                  {cards.map((_, i) => (
                    <span
                      key={i}
                      className={`dot ${currentSlide === i ? "active" : ""}`}
                      onClick={() => {
                        setCurrentSlide(i);
                        setFlipped({});
                        setIsCarouselPaused(false);
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="row g-4 mt-4 cards-row">
                {cards.map((card) => (
                  <div key={card.id} className="col-md-4 d-flex justify-content-center">
                    {renderCard(card)}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Coming Soon */}
        {activeTab !== "news" && (
          <p className="media-center-coming-soon">{t("media.comingSoon")}</p>
        )}
      </div>
    </section>
  );
}
