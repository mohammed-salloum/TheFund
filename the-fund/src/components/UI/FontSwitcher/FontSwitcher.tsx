import { useContext } from "react";
import type { FC } from "react";
import "./FontSwitcher.css";
import { FontContext } from "../../../context/FontContext";

const MAX_OFFSET = 1;      // أقصى فرق عن الافتراضي
const DELTA = 0.5;         // حجم الزيادة أو النقص

interface FontSwitcherProps {
  defaultSize?: number;
}

const FontSwitcher: FC<FontSwitcherProps> = ({ defaultSize = 10 }) => {
  const { fontSize, setFontSize } = useContext(FontContext);

  const handleSizeClick = (type: "increase" | "decrease" | "reset") => {
    let newSize = fontSize;

    if (type === "reset") newSize = defaultSize;
    if (type === "increase" && fontSize < defaultSize + MAX_OFFSET) {
      newSize += DELTA;
    }
    if (type === "decrease" && fontSize > defaultSize - MAX_OFFSET) {
      newSize -= DELTA;
    }

    setFontSize(newSize);
    document.documentElement.style.setProperty(
      "--main-font-size",
      `${newSize}px`
    );
  };

  return (
    <div className="fonts-container">
      <button
        className="font-btn"
        onClick={() => handleSizeClick("increase")}
        type="button"
      >
        A+
      </button>

      <button
        className="font-btn"
        onClick={() => handleSizeClick("reset")}
        type="button"
      >
        A
      </button>

      <button
        className="font-btn"
        onClick={() => handleSizeClick("decrease")}
        type="button"
      >
        A-
      </button>
    </div>
  );
};

export default FontSwitcher;
