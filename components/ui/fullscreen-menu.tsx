"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button"; // Für den Trigger-Button
import Image from "next/image"; // Für das Logo
import { cn } from "@/lib/utils"; // Für Klassenhandling

// Importiere das Logo und ein Schließen-Icon
import Logo from "@/public/imt-logo.svg";
import { X } from "lucide-react"; // Für das Schließen-Icon

export function FullscreenMenu() {
  return (
    <Dialog>
      {/* Trigger für das Menü */}
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          Menü
        </Button>
      </DialogTrigger>

      {/* Menüinhalt */}
      <DialogContent className="fixed inset-0 bg-red-600 text-white flex flex-col">
        <div className="flex justify-between items-center p-6">
          {/* Logo */}
          <Image src={Logo} alt="Logo" width={120} height={60} className="dark:invert" />

          {/* Schließen-Button */}
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="text-white">
              <X className="w-6 h-6" />
            </Button>
          </DialogClose>
        </div>

        {/* Menüinhalt */}
        <div className="flex-grow flex flex-col justify-center items-start px-8">
          <h1 className="text-4xl font-bold mb-4">Digitales Engineering</h1>
          <ul className="space-y-4 text-2xl">
            <li className="hover:opacity-80 transition-opacity">Digitaler Zwilling</li>
            <li className="hover:opacity-80 transition-opacity">Unternehmen</li>
            <li className="hover:opacity-80 transition-opacity">Karriere</li>
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
      </DialogContent>
    </Dialog>
  );
}
