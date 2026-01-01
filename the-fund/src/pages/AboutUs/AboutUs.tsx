import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaLightbulb, FaTrophy, FaGlobe, FaHandshake } from "react-icons/fa";
import "./AboutUs.css";

const AboutUs: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const values = [
    { title: t("aboutPage.coreValues.values.0.title"), desc: t("aboutPage.coreValues.values.0.desc"), icon: <FaLightbulb /> },
    { title: t("aboutPage.coreValues.values.1.title"), desc: t("aboutPage.coreValues.values.1.desc"), icon: <FaTrophy /> },
    { title: t("aboutPage.coreValues.values.2.title"), desc: t("aboutPage.coreValues.values.2.desc"), icon: <FaGlobe /> },
    { title: t("aboutPage.coreValues.values.3.title"), desc: t("aboutPage.coreValues.values.3.desc"), icon: <FaHandshake /> },
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

  // CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty("--cards-per-slide", cardsPerSlide.toString());
  }, [cardsPerSlide]);

  // Split values into slides
  const slides = [];
  for (let i = 0; i < values.length; i += cardsPerSlide) {
    slides.push(values.slice(i, i + cardsPerSlide));
  }
  const totalSlides = slides.length;

  // Reset on language change
  useEffect(() => {
    setCurrentSlide(0);
    directionRef.current = "forward";
  }, [i18n.language]);

  // Auto-slide ping-pong
  useEffect(() => {
    if (cardsPerSlide >= values.length) return;
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
    <main className="about-page" dir={isRTL ? "rtl" : "ltr"}>
      <section className="hero-core-section container">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="main-title">{t("aboutPage.hero.title")}</h1>
          <p className="subtitle">{t("aboutPage.hero.description")}</p>
        </div>

        {/* Core Values Carousel */}
        {cardsPerSlide >= values.length ? (
          <div className="values-grid">
            {values.map((val) => (
              <div className="value-card" key={val.title}>
                <div className="icon">{val.icon}</div>
                <h5>{val.title}</h5>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="values-carousel">
            <div
              className={`carousel-track ${isRTL ? "rtl" : "ltr"}`}
              style={{ transform: isRTL ? `translateX(${currentSlide * 100}%)` : `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slideItems, idx) => (
                <div className="carousel-slide" key={idx}>
                  {slideItems.map((val, cIdx) => (
                    <div className="value-card" key={cIdx}>
                      <div className="icon">{val.icon}</div>
                      <h5>{val.title}</h5>
                      <p>{val.desc}</p>
                    </div>
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
      </section>
    </main>
  );
};

export default AboutUs;
