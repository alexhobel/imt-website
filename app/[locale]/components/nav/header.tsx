"use client"

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";

// Utility Imports
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

// Component Imports
import { Button } from "@/app/[locale]/components/ui/button";
import { ScrollArea } from "@/app/[locale]/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/app/[locale]/components/ui/sheet";
import { Separator } from "@/app/[locale]/components/ui/separator";
import {
  FullScreenNavigationMenu,
  FullScreenNavigationMenuTrigger,
  FullScreenNavigationMenuClose,
} from "@/app/[locale]/components/ui/fullscreen-menu-navigation";
import { ContentContainer } from "@/app/[locale]/components/craft";

import Logo from "@/public/logo/imt-logo.svg";
import LogoWhite from "@/public/logo/imt-logo-white.svg";
import { mainMenu } from "@/menu.config";

const headerVariants = cva("z-50 top-0 fade-in", {
  variants: {
    variant: {
      default: "bg-transparent",
      fullscreen_navigation_menu: "bg-red-600 text-white",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface HeaderProps extends VariantProps<typeof headerVariants> {
  adressData: any; // Passe den Typ an deine Struktur an
  contactData: any; // Passe den Typ an deine Struktur an
}

export function Header({ 
  variant = "default", 
  adressData, 
  contactData 
}: HeaderProps) {
  const [open, setOpen] = React.useState(false);
  const t = useTranslations('header');
  return (
    <header className={cn("z-50 absolute top-0 left-0 w-full z-50 bg-transparent")}>
      <ContentContainer>
        <div className="flex justify-between items-center py-10">
          {/* Logo links */}
          <Link
            className="hover:opacity-75 transition-all flex gap-2 items-center"
            href="/"
          >
            <Image
              src={variant === "fullscreen_navigation_menu" ? LogoWhite : Logo}
              alt="Logo"
              layout="fixed"
              height={60}
              width={120}
              className={variant === "fullscreen_navigation_menu" ? "" : "dark:invert"}
            />
          </Link>

          {/* Button contact */}
          <div className="flex items-center gap-4">
            {variant === "fullscreen_navigation_menu" ? (
              <Button
                variant="noBackground"
                size="lg"
                rounded="rounded-full"
                className="text-white border-white hover:bg-gray-100 hover:text-black"
              >
                 {t("cta")}
              </Button>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                <Button variant="default" size="lg" rounded="rounded-full">
                {t("cta")}
                </Button>
              </div>
            )}

            {variant === "default" && (
              <FullScreenNavigationMenu
                adressData={adressData} // Daten an FullScreenNavigationMenu übergeben
                contactData={contactData}
              >
                <FullScreenNavigationMenuTrigger asChild>
                  <Button
                    variant="menu"
                    size="default"
                    rounded="rounded-full"
                    className="hidden md:flex items-center gap-2"
                  >
                    <Menu />
                    {t("menuButton")}
                  </Button>
                </FullScreenNavigationMenuTrigger>
              </FullScreenNavigationMenu>
            )}

            {variant === "fullscreen_navigation_menu" && (
              <FullScreenNavigationMenuClose asChild>
                <Button
                  variant="outline"
                  size="default"
                  className="text-white flex items-center gap-2"
                  rounded="rounded-full"
                >
                  <X className="w-6 h-6 text-black" />
                  <span className="text-black">Close</span>
                </Button>
              </FullScreenNavigationMenuClose>
            )}

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
        </div>
      </ContentContainer>
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
        <span className="text-white">My Site</span>
      </Link>
      <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
        <div className="flex flex-col space-y-3">
          <h3 className="text-white mt-6">Menu</h3>
          <Separator />
          
          {Object.entries(mainMenu).map(([key, value]) => {
          const href = value.href; // Extrahiere den String aus dem Objekt
          return (
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
          );
        })}

        </div>
      </ScrollArea>
    </>
  );
}
