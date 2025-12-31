import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function useAutoPageTitle({
  baseTitle = "The Fund",
  skip = false,
}) {
  const location = useLocation();
  const { lang } = useParams();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (skip) return;

    let path = location.pathname.replace(/^\/+/, "");

    // =======================
    // 1) HOME PAGE
    // =======================
    if (!path || path === lang) {
      document.title = t("titles.home", { defaultValue: baseTitle });
      return;
    }

    // =======================
    // 2) Clean path
    // =======================
    const parts = path.split("/");
    const cleanedParts = ["en", "ar"].includes(parts[0])
      ? parts.slice(1)
      : parts;

    let slug = cleanedParts[cleanedParts.length - 1];
    if (!slug) slug = "home";

    slug = slug.replace(/-/g, "").toLowerCase();

    // =======================
    // 3) SECTION HASH (#partners / #media)
    // =======================
    if (location.hash) {
      const hash = location.hash.replace("#", "").toLowerCase();
      if (hash === "partners" || hash === "media") {
        slug = hash;
      }
    }

    // =======================
    // 4) Alias map (الاختصارات)
    // =======================
    const aliasMap: Record<string, string> = {
      signin: "login",
      login: "login",
      register: "register",
      resetpassword: "resetPassword",
      aboutus: "about",
      contactus: "contact",
      partners: "partners",
      media: "media",
    };

    const finalKey = aliasMap[slug] ?? slug;

    // =======================
    // 5) Check if it is a sectionTitle
    // =======================
    const sectionKeys = ["partners", "media"];

    if (sectionKeys.includes(finalKey)) {
      document.title = t(`sectionTitles.${finalKey}`, {
        defaultValue: baseTitle,
      });
      return;
    }

    // =======================
    // 6) Normal page titles
    // =======================
    const validKeys = [
      "home",
      "about",
      "services",
      "initiatives",
      "contact",
      "newsletter",
      "faq",
      "login",
      "register",
      "resetPassword",
      "settings",
      "search",
      "sitemap",
      "notFound",
    ];

    const normalizedKey = validKeys.includes(finalKey)
      ? finalKey
      : "notFound";

    document.title = t(`titles.${normalizedKey}`, {
      defaultValue: baseTitle,
    });

  }, [
    location.pathname,
    location.hash,
    lang,
    i18n.language,
    t,
    baseTitle,
    skip,
  ]);
}
