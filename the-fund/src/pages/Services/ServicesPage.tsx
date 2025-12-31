import React from "react";
import Services from "../../components/Services/Services";
import './ServicesPage.css';

const ServicesPage: React.FC = () => {
  return (
    <>
      <main className="services-page">
        <Services />
      </main>
    </>
  );
};

export default ServicesPage;
