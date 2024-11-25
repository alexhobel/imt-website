"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { X } from "lucide-react";
import { mainMenu } from "@/menu.config";
import Link from "next/link";
import Logo from "@/public/imt-logo-white.svg";
import { Container } from '@/components/craft'
import { Header } from '@/components/nav/header'

const FullScreenNavigationMenuRoot = Dialog.Root;
const FullScreenNavigationMenuTrigger = Dialog.Trigger;
const FullScreenNavigationMenuContent = Dialog.Content;
const FullScreenNavigationMenuClose = Dialog.Close;

export function FullScreenNavigationMenu({ children }: { children: React.ReactNode }) {
  return (
    <FullScreenNavigationMenuRoot>
      {children} {/* Hier wird der Trigger von außen übergeben */}
      <FullScreenNavigationMenuContent className="fixed inset-0 bg-red-600 text-white flex flex-col">

      <Header variant="fullscreen_navigation_menu" onClose={() => FullScreenNavigationMenuRoot.close()} />
      {/* Menüinhalt */}
      <div className="flex-grow flex flex-col justify-center items-start px-8">
        <ul className="space-y-4 text-2xl">
          {Object.entries(mainMenu).map(([key, { href, displayText }]) => (
            <li key={key}>
              <Link
                href={href}
                className="hover:opacity-80 transition-opacity"
              >
                {displayText}
              </Link>
            </li>
          ))}
        </ul>
      </div>


        {/* Footer */}
        <footer className="flex justify-between items-center px-8 py-6 border-t border-white">
          <div className="space-y-2">
            <p className="text-lg">+49 7151 250465-0</p>
            <p className="text-lg">kontakt@imt-services.de</p>
            <p>Stuttgarter Straße 130, D-71332 Waiblingen</p>
          </div>
          <div className="flex gap-4">
            {/* Platzhalter für Social Media Icons */}
            <span>FB</span>
            <span>IG</span>
            <span>LI</span>
          </div>
        </footer>
      </FullScreenNavigationMenuContent>
    </FullScreenNavigationMenuRoot>
  );
}

export { FullScreenNavigationMenuTrigger, FullScreenNavigationMenuClose };
