"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { mainMenu } from "@/menu.config";
import Link from "next/link";
import { Header } from "@/components/nav/header";
import { ArrowRight, Container } from "lucide-react";


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
  contactData: { phone: string; email: string };
  children: React.ReactNode;
}) {

  return (
    <FullScreenNavigationMenuRoot>
      {children}
      <FullScreenNavigationMenuContent className="fixed inset-0 bg-primary text-white flex flex-col">
        <Header adressData={adressData} contactData={contactData} variant="fullscreen_navigation_menu" onClose={() => FullScreenNavigationMenuRoot.close()} />
        {/* Menu Content */}
        <div className="flex-grow flex flex-col justify-center items-start ml-8 ">
        <ul className="space-y-4 font-bold text-4xl sm:text-4xl md:text-5xl lg:text-6xl">
            {Object.entries(mainMenu).map(([key, { href, displayText }]) => (
              <li key={key} className="relative group">
                <Link
                  href={href}
                  className="flex items-center hover:opacity-80 transition-opacity"
                >
                  <span className="mt-2">{displayText}</span>
                  <ArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2.5 rotate-45" size={60}/>
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </FullScreenNavigationMenuContent>
    </FullScreenNavigationMenuRoot>
  );
}


export { FullScreenNavigationMenuTrigger, FullScreenNavigationMenuClose };
