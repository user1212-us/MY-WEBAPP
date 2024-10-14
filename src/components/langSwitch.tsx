import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import KSAImage from "../assets/KSA.png";
import USAImage from "../assets/USA.png";

interface LangProps {
  lang: string;
  isMobile: boolean;
}

export default function LanguageSwitcher({ lang, isMobile }: LangProps) {
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = async (newLang: "en" | "ar") => {
    if (pathname === null) return; // Add this line
    const currentLangPrefix = lang === "en" ? "/en" : "/ar";
    const newLangPrefix = newLang === "en" ? "/en" : "/ar";
    const newPath = pathname.replace(currentLangPrefix, newLangPrefix);

    // Update cookie via API
    await fetch("/api/language", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language: newLang }),
    });

    router.push(newPath);
  };
  return (
    <div
      className={`language-switcher flex ${
        isMobile ? "justify-center w-full" : "items-center"
      } space-x-2`}
    >
      <button
        className={`flex items-center justify-center space-x-1 p-2 rounded ${
          lang === "en" ? "bg-blue-100" : "hover:bg-gray-100"
        } ${isMobile ? "flex-1" : ""}`}
        onClick={() => changeLanguage("en")}
        aria-label="Switch to English"
      >
        <Image
          src={USAImage}
          alt="US Flag"
          width={isMobile ? 20 : 20}
          height={isMobile ? 15 : 15}
        />
        <span className={`${isMobile ? "text-sm" : "text-sm"}`}>EN</span>
      </button>
      <button
        className={`flex items-center justify-center space-x-1 p-2 rounded ${
          lang === "ar" ? "bg-blue-100" : "hover:bg-gray-100"
        } ${isMobile ? "flex-1" : ""}`}
        onClick={() => changeLanguage("ar")}
        aria-label="Switch to Arabic"
      >
        <Image
          src={KSAImage}
          alt="Saudi Arabia Flag"
          width={isMobile ? 20 : 20}
          height={isMobile ? 15 : 15}
        />
        <span className={`${isMobile ? "text-sm" : "text-sm"}`}>عربي</span>
      </button>
    </div>
  );
}
