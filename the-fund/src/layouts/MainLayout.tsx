import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

// لا حاجة لتمرير children يدويًا
export default function MainLayout() {
  return (
    <>
      <Header />
      <Outlet /> {/* هنا ستظهر كل Route فرعي */}
      <Footer />
    </>
  );
}
