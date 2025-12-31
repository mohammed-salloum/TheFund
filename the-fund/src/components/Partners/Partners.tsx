import "./Partners.css";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function Partners() {
  const { t } = useTranslation();

  const partners = [
    "/assets/partners/dubai-first.png",
    "/assets/partners/emirates-islamic.png",
    "/assets/partners/dp-world.png",
    "/assets/partners/rakbank.png",
    "/assets/partners/noorbank.png",
  ];

  const [itemsPerSlide, setItemsPerSlide] = useState(5);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
  const handleResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isLandscape = width > height;

    if (!isLandscape) {
      // Portrait (عمودي)
      if (width < 768) {
        setItemsPerSlide(1);
      } else {
        setItemsPerSlide(5);
      }
    } else {
      // Landscape (أفقي)
      if (width >= 1024) {
        setItemsPerSlide(5);
      } else if (width >= 600) {
        // جميع الهواتف + تابلت أفقي
        setItemsPerSlide(3);
      } else {
        setItemsPerSlide(1);
      }
    }

    setCurrent(0);
  };

  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);



  // تقسيم الصور إلى Slides
  const slides = [];
  for (let i = 0; i < partners.length; i += itemsPerSlide) {
    slides.push(partners.slice(i, i + itemsPerSlide));
  }

  // في حالة 3 صور → بدنا فقط 2 dots
  const visibleSlides =
    itemsPerSlide === 3
      ? [
          partners.slice(0, 3),
          partners.slice(2, 5), // صورة مشتركة
        ]
      : slides;
useEffect(() => {
  if (itemsPerSlide === 5) return; // لا تشغّل Auto-play على الديسكتوب

  const interval = setInterval(() => {
    setCurrent((prev) =>
      prev === visibleSlides.length - 1 ? 0 : prev + 1
    );
  }, 5000); // كل 3 ثواني

  return () => clearInterval(interval);
}, [itemsPerSlide, visibleSlides.length]);

  return (
    <section className="partners-section">
      <div className="container text-center">
        <h2 className="partners-title">{t("partners.title")}</h2>

        <div className="partners-row">
          {visibleSlides[current].map((src, i) => (
            <img key={i} src={src} alt="partner" className="partner-img" />
          ))}
        </div>

        {/* Dots */}
        {itemsPerSlide !== 5 && (
          <div className="partners-dots">
            {visibleSlides.map((_, i) => (
              <span
                key={i}
                className={`dot ${current === i ? "active" : ""}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
