import { useState, useEffect } from "react";
import {
  InstagramIcon,
  TwitterIcon,
  PhoneIcon,
  MessageCircleIcon
} from "lucide-react";
import { useTranslation } from "react-i18next";
import "./Hero.css";

type Slide = {
  title1: string;
  title2: string;
  subtitle: string;
};

export default function Hero() {

  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const [current, setCurrent] = useState<number>(0);

  const slides = t("hero.slides", {
    returnObjects: true
  }) as Slide[];

  const socialIcons = [
    { Icon: InstagramIcon },
    { Icon: TwitterIcon },
    { Icon: MessageCircleIcon },
    { Icon: PhoneIcon }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section
      className={`hero-section ${isRTL ? "rtl" : "ltr"}`}
      dir={i18n.dir()}
    >
      {/* Background */}
      <div className="hero-bg">
        <picture>
          <source
            srcSet="
              /assets/hero/hero-640.webp 640w,
              /assets/hero/hero-1280.webp 1280w,
              /assets/hero/hero-1920.webp 1920w
            "
            sizes="100vw"
            type="image/webp"
          />
          <img
            src="/assets/hero/hero-1920.webp"
            className="hero-img"
            alt={t("hero.altText")}
            loading="eager"
            fetchPriority="high"
          />
        </picture>
        <div className="hero-overlay" />
      </div>

      {/* Top red line */}
      <div className="top-red-line" />

      {/* Social icons */}
      <div className="hero-social-icons">
        {socialIcons.map(({ Icon }, i) => (
          <button key={i} className="social-btn" aria-label="social link">
            <Icon size={26} />
          </button>
        ))}
      </div>

      {/* TEXT */}
      <div className="hero-content">
        <div className="container hero-text">
          <h1 className="hero-title">
            {slides[current].title1}
            <br />
            {slides[current].title2}
          </h1>

          <p className="hero-sub">{slides[current].subtitle}</p>
        </div>
      </div>

      {/* CENTER UI */}
      <div className="hero-center-ui">
        <div className="center-track">
          {/* الخط العلوي */}
          <span className="track-line" />

          {[0, 1, 2].map((n, idx) => (
            <div key={n} className="track-item">
              <span
                className={`track-num ${
                  current === n ? "active" : ""
                }`}
                onClick={() => setCurrent(n)}
              >
                0{n + 1}
              </span>

              {idx !== 2 && <span className="track-line" />}
            </div>
          ))}

          {/* الخط بين 03 والزر */}
          <span className="track-line to-button" />
        </div>

      <button
  className="scroll-btn"
  aria-label="scroll down"
  onClick={() => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  }}
>
  <span className="arrow-down" />
</button>

      </div>

      <div className="triangle-wrap" />
    </section>
  );
}
