"use client";

// React and Next Imports
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Utility Imports
import { Menu, ArrowRightSquare } from "lucide-react";
import { cn } from "@/lib/utils";

// Component Imports
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { FullscreenMenu } from "@/components/ui/fullscreen-menu";

import Logo from "@/public/imt-logo.svg";
import { mainMenu } from "@/menu.config";

export function Header() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className={cn("sticky z-50 top-0 bg-background fade-in")}>
      <div
        className="max-w-5xl mx-auto py-9 px-6 sm:px-8 flex justify-between items-center"
      >
        {/* Logo */}
        <Link className="hover:opacity-75 transition-all flex gap-2 items-center" href="/">
          <Image
            src={Logo}
            alt="Logo"
            layout="fixed"
            height={180}
            width={180}
            className="dark:invert"
          />
        </Link>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="default" size="lg" rounded="rounded-full">
            Kontaktieren Sie uns
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="default" rounded="rounded-full" className="flex items-center gap-2">
                <Menu />
                Menü
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-red-600 text-white pr-0">
              <MenuContent onClose={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="px-0 border w-10 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-red-600 text-white pr-0">
            <MenuContent onClose={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

// Separate component for the menu content to reuse
function MenuContent({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  return (
    <>
      <Link
        href="/"
        className="flex items-center mt-4 ml-6"
        onClick={() => {
          router.push("/");
          onClose();
        }}
      >
        <ArrowRightSquare className="mr-2 h-4 w-4" />
        <span className="text-white">My Site</span>
      </Link>
      <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
        <div className="flex flex-col space-y-3">
          <h3 className="text-white mt-6">Menu</h3>
          <Separator />
          {Object.entries(mainMenu).map(([key, href]) => (
            <Link
              key={key}
              href={href}
              onClick={() => {
                router.push(href);
                onClose();
              }}
              className="text-lg text-white hover:opacity-80"
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Link>
          ))}
          <h3 className="text-white pt-6">Blog Menu</h3>
          <Separator />
        </div>
      </ScrollArea>
    </>
  );
}
