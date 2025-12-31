import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useScrollToTop from "../hooks/useScrollToTop";
import useAutoPageTitle from "../hooks/useAutoPageTitle";

import LanguageHandler from "./LanguageHandler";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import AboutUs from "../pages/AboutUs/AboutUs";
import ServicesPage from "../pages/Services/ServicesPage";
import StrategicInitiatives from "../pages/StrategicInitiatives/StrategicInitiativesPage";
import ContactUs from "../pages/ContactUs/ContactUs";
import FAQPage from "../pages/FAQ/FAQ";
import SubscribeNewsletterPage from "../pages/SubscribeNewsletter/SubscribeNewsletterPage";
import Login from "../pages/Login/Login";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <TitleManager />

      <Routes>
        {/* 🔥 اللغة */}
        <Route path=":lang" element={<LanguageHandler />}>
          
          {/* صفحات باستخدام MainLayout */}
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="initiatives" element={<StrategicInitiatives />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="faq" element={<FAQPage />} />
            <Route path="newsletter" element={<SubscribeNewsletterPage />} />
          </Route>

            <Route element={<MainLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Login />} />
            <Route path="reset-password" element={<Login />} />
        </Route>
        </Route>

        {/* 🔄 إعادة توجيه */}
        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function ScrollManager() {
  useScrollToTop();
  return null;
}

function TitleManager() {
  useAutoPageTitle({});
  return null;
}
