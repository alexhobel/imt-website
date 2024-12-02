"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { mainMenu } from "@/menu.config";
import Link from "next/link";
import { Header } from "@/components/nav/header";
import { ArrowRight } from "lucide-react";

const FullScreenNavigationMenuRoot = Dialog.Root;
const FullScreenNavigationMenuTrigger = Dialog.Trigger;
const FullScreenNavigationMenuContent = Dialog.Content;
const FullScreenNavigationMenuClose = Dialog.Close;

export async function FullScreenNavigationMenu({
  adressData,
  contactData,
  children,
}: {
  adressData: { street: string; city: string; zip: string };
  contactData: { phone: string; mail: string };
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (isMenuOpen) {
      // Scrollen deaktivieren
      document.body.style.overflow = "hidden";
    } else {
      // Scrollen aktivieren
      document.body.style.overflow = "";
    }
    return () => {
      // Cleanup, wenn die Komponente entfernt wird
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  
  return (
    <FullScreenNavigationMenuRoot>
      {children}
      <FullScreenNavigationMenuContent className="fixed inset-0 bg-primary text-white flex flex-col">
        <Header
          adressData={adressData}
          contactData={contactData}
          variant="fullscreen_navigation_menu"
          onClose={() => FullScreenNavigationMenuRoot.close()}
        />
      <div className="flex flex-grow">
        {/* Linke Spalte mit Menüeinträgen */}
        <div className="flex flex-col justify-center items-start w-2/3 px-8">
          <ul className="space-y-4 font-bold text-4xl sm:text-4xl md:text-5xl lg:text-6xl">
            {Object.entries(mainMenu).map(([key, { href, displayText }]) => (
              <li key={key} className="relative group">
                <Link
                  href={href}
                  className="flex items-center hover:opacity-80 transition-opacity"
                >
                  <span className="mt-2">{displayText}</span>
                  <ArrowRight
                    className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2.5 rotate-45"
                    size={60}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Unsichtbare Trennlinie */}
        <div className="w-1 h-full"></div>

        {/* Rechte Spalte mit Kontakt- und Adressdaten */}
        <div className="flex flex-col justify-center items-end w-1/3 px-8 space-y-6 text-base sm:text-lg md:text-xl lg:text-xl">
        
        {/* Kontaktdaten */}
        <div className="space-y-1 w-full text-right pb-4">
          <p>{contactData.phone}</p>
          <p>
            <a
              href={`mailto:${contactData.mail}`}
              className="hover:underline"
            >
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

        </div>

      </div>

      </FullScreenNavigationMenuContent>
    </FullScreenNavigationMenuRoot>
  );
}

export { FullScreenNavigationMenuTrigger, FullScreenNavigationMenuClose };
