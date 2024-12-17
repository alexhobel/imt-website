import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { mainMenu } from "@/menu.config";
import { Header } from "@/app/[locale]/components/nav/header";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import linkedinIcon from "@/public/icons/linkedin.svg";
import facebookIcon from "@/public/icons/facebook.svg";
import xingIcon from "@/public/icons/xing.svg";
import instagramIcon from "@/public/icons/instagram.svg";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const FullScreenNavigationMenuRoot = Dialog.Root;
const FullScreenNavigationMenuTrigger = Dialog.Trigger;
const FullScreenNavigationMenuContent = Dialog.Content;
const FullScreenNavigationMenuClose = Dialog.Close;
const FullScreenNavigationMenuOverlay = Dialog.Overlay;

export async function FullScreenNavigationMenu({
  adressData,
  contactData,
  children,
}: {
  adressData: { street: string; city: string; zip: string };
  contactData: { phone: string; mail: string };
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const t = useTranslations("menu");

  // Extrahiere den aktuellen Pfad ohne Sprachsegment (/en oder /de)
  const getPathWithoutLocale = (path: string) => {
    const segments = path.split("/").filter(Boolean); // Filtere leere Segmente
    if (segments.length > 0 && (segments[0] === "en" || segments[0] === "de")) {
      segments.shift(); // Entferne das Sprachsegment
    }
    return `/${segments.join("/")}`; // Füge den verbleibenden Pfad wieder zusammen
  };

  const currentPath = getPathWithoutLocale(pathname || "/");

  return (
    <FullScreenNavigationMenuRoot>
      {children}
      <FullScreenNavigationMenuOverlay>
        <FullScreenNavigationMenuContent className="fixed inset-0 bg-primary text-white flex flex-col">
          <Header
            adressData={adressData}
            contactData={contactData}
            variant="fullscreen_navigation_menu"
          />
          <div className="flex flex-grow">
            {/* Left side */}
            <div className="flex flex-col justify-center items-start w-2/3 px-16">
              <ul className="space-y-4 font-bold text-4xl sm:text-4xl md:text-5xl lg:text-6xl">
                {Object.entries(mainMenu).map(([key, { href }]) => {
                  // Vergleiche den aktuellen Pfad mit dem Menülink
                  const isActive = currentPath === href;
                  return (
                    <li key={key} className="relative group">
                      <FullScreenNavigationMenuClose asChild>
                        <Link
                          href={href}
                          className={`flex items-center px-4 py-2 rounded transition-all ${
                            isActive
                              ? "bg-transparent text-white"
                              : "text-white/50 hover:bg-primary hover:text-white"
                          }`}
                        >
                          <span className="mt-2">{t(key)}</span>
                          <ArrowRight
                            className={`ml-2 transition-opacity duration-200 transform translate-y-2.5 rotate-45 opacity-0 group-hover:opacity-100 ${
                              isActive ? "text-white" : "text-white"
                            }`}
                            size={60}
                          />
                        </Link>
                      </FullScreenNavigationMenuClose>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Unsichtbare Trennlinie */}
            <div className="w-1 h-full"></div>

            {/* Right side */}
            <div className="flex flex-col justify-center items-end w-1/3 px-16 space-y-6 text-base sm:text-lg md:text-xl lg:text-xl mt-8">
              {/* Kontaktdaten */}
              <div className="space-y-1 w-full text-right pb-4">
                <p>{contactData.phone}</p>
                <p>
                  <a href={`mailto:${contactData.mail}`} className="hover:underline">
                    {contactData.mail}
                  </a>
                </p>
                {/* Trennlinie mit Abstand */}
                <div className="border-b border-white w-[228px] ml-auto pt-4"></div>
              </div>

              {/* Adressdaten */}
              <div className="space-y-1 w-full text-right pb-4">
                <p>{adressData.street}</p>
                <p>
                  {adressData.zip} {adressData.city}
                </p>
                {/* Trennlinie mit Abstand */}
                <div className="border-b border-white w-[228px] ml-auto pt-4"></div>
              </div>

              {/* Social-Media-Icons */}
              <div className="flex justify-end space-x-4 mt-4">
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={linkedinIcon}
                    alt="LinkedIn"
                    width={40}
                    height={40}
                    className="hover:opacity-80"
                  />
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={facebookIcon}
                    alt="Facebook"
                    width={40}
                    height={40}
                    className="hover:opacity-80"
                  />
                </a>
                <a
                  href="https://www.xing.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={xingIcon}
                    alt="Xing"
                    width={40}
                    height={40}
                    className="hover:opacity-80"
                  />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={instagramIcon}
                    alt="Instagram"
                    width={40}
                    height={40}
                    className="hover:opacity-80"
                  />
                </a>
              </div>

              {/* Impressum und Datenschutz */}
              <div className="flex justify-center space-x-8 mt-8 pt-8 text-sm sm:text-base">
                <a href="/impressum" className="hover:underline">
                  Impressum
                </a>
                <a href="/datenschutz" className="hover:underline">
                  Datenschutz
                </a>
              </div>
            </div>
          </div>
        </FullScreenNavigationMenuContent>
      </FullScreenNavigationMenuOverlay>
    </FullScreenNavigationMenuRoot>
  );
}

export { FullScreenNavigationMenuTrigger, FullScreenNavigationMenuClose };
