export type AppLanguage = "ar" | "en";

// Detect language based on domain
export function detectLanguageFromDomain(): AppLanguage {
  try {
    const hostname = window.location.hostname.toLowerCase();

    const domainMap: Record<string, AppLanguage> = {
      "ae.web.app": "ar",
      "ae.firebaseapp.com": "ar",

      "us.web.app": "en",
      "us.firebaseapp.com": "en",
    };

    for (const key in domainMap) {
      if (hostname.includes(key)) {
        return domainMap[key];
      }
    }

    return "en";
  } catch (err) {
    console.error("Domain detection error:", err);
    return "en";
  }
}

// Detect language using browser + IP
export async function detectUserLanguage(): Promise<AppLanguage> {
  try {
    const browserLang =
      navigator.language || (navigator as any).userLanguage;

    if (browserLang.startsWith("ar")) {
      return "ar";
    }

    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();

    const arabCountries = [
      "AE", "SA", "EG", "DZ", "MA", "LY", "SD", "JO", "IQ",
      "KW", "QA", "BH", "OM", "TN", "YE", "SY", "LB", "PS",
      "MR", "SO", "KM", "DJ",
    ];

    if (arabCountries.includes(data.country_code)) {
      return "ar";
    }

    return "en";
  } catch (err) {
    console.error("User language detection failed:", err);
    return "en";
  }
}
