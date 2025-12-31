import React from "react";
import "./ContactMap.css";

interface ContactMapProps {
  small?: boolean;
  zoom?: number;
}

const ContactMap: React.FC<ContactMapProps> = ({ small = false, zoom = 14 }) => {

  // العنوان الجديد حسب الفوتر
  const locationQuery = "Building A, 2nd Floor - Near Clock Roundabout, Dubai, UAE";

  const buildMapURL = (): string => {
    const base = "https://maps.google.com/maps";
    return `${base}?q=${encodeURIComponent(locationQuery)}&z=${zoom}&output=embed`;
  };

  const src = buildMapURL();

  return (
    <div className={`contact-map-wrapper ${small ? "small" : ""}`}>
      <iframe
        title="BuildingA_ClockRoundabout_Dubai"
        src={src}
        loading="lazy"
        style={{
          width: "100%",
          height: small ? "220px" : "400px",
          border: 0,
          pointerEvents: "auto",
        }}
      ></iframe>
    </div>
  );
};

export default ContactMap;
