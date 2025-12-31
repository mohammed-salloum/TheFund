import React from "react";
import StrategicInitiatives from "../../components/StrategicInitiatives/StrategicInitiatives";

const StrategicInitiativesPage: React.FC = () => {
  return (
    <>
      <main className="flex-grow-1">
        {/* صفحة المبادرات الاستراتيجية (Standalone) */}
        <StrategicInitiatives isStandalone={true} />
      </main>
    </>
  );
};

export default StrategicInitiativesPage;
