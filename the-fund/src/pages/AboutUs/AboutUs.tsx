import React from 'react';
import About from '../../components/About/About';

const AboutUs: React.FC = () => {
  return (
    <>
      <main className="flex-grow-1">
        {/* صفحة معلومات موسّعة بدون زر عرض قصتنا */}
        <About isStandalone={true} />
      </main>
    </>
  );
};

export default AboutUs;
