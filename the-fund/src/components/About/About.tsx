import React, { useState, useEffect } from "react";
import "./About.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface AboutProps {
  isStandalone?: boolean;
}

const About: React.FC<AboutProps> = ({ isStandalone = false }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const isRTL = i18n.dir() === "rtl";
  const language = i18n.language;

  // الكاروسيل مفعل فقط للموبايل العمودي
  const [slide, setSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 768 && window.innerHeight > 500
  );

  // مراقبة تغيير حجم الشاشة
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768 && window.innerHeight > 500);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // تفعيل السلايدر فقط على الموبايل العمودي
  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % 2);
    }, 5000);
    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <section id="about" className="about-section" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container">
        <h1 className="about-page-title">{t("about.title")}</h1>

        <div className="row align-items-center">
          {/* ===== TEXT ===== */}
          <div className="col-lg-5 content-column">
            <h2 className="about-description mb-3">{t("about.description")}</h2>
            <p className="about-subtitle mb-4">{t("about.subtitle")}</p>

            {!isStandalone && (
              <button
                className="btn-about"
                onClick={() => navigate(`/${language}/about`)}
              >
                {t("about.storyButton")}
              </button>
            )}
          </div>

          {/* ===== CAROUSEL ===== */}
          <div className="col-lg-7">
            <div className="about-carousel">
              <div
                className="about-carousel-track"
                style={{
                  transform: isMobile
                    ? `translateX(${isRTL ? slide * 100 : -slide * 100}%)`
                    : "translateX(0%)",
                }}
              >
                {/* ===== SLIDE 1 ===== */}
                <div className="about-slide">
                  <div className="about-card">
                    <h3 className="card-title">{t("about.missionTitle")}</h3>
                    <p className="card-description">{t("about.missionDesc")}</p>
                    <div className="card-icon">
                      <div className="icon-wrapper">
                        <img
                          src="/assets/about/circle.png"
                          className="circle-bg"
                          alt=""
                        />
                        <img
                          src="/assets/about/target.png"
                          className="icon-img"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ===== SLIDE 2 ===== */}
                <div className="about-slide">
                  <div className="about-card">
                    <h3 className="card-title">{t("about.visionTitle")}</h3>
                    <p className="card-description">{t("about.visionDesc")}</p>
                    <div className="card-icon">
                      <div className="icon-wrapper">
                        <img
                          src="/assets/about/circle.png"
                          className="circle-bg"
                          alt=""
                        />
                        <img
                          src="/assets/about/telescope.png"
                          className="icon-img"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ===== DOTS فقط للموبايل العمودي ===== */}
              {isMobile && (
                <div className="carousel-dots">
                  {[0, 1].map((i) => (
                    <span
                      key={i}
                      className={`dot ${slide === i ? "active" : ""}`}
                      onClick={() => setSlide(i)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
