import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import de from "../locales/de.json";
import en from "../locales/en.json";

const translations = {
  de,
  en,
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Erkenne die Sprache aus der URL
  const language = pathname.startsWith("/en") ? "en" : "de";
  
  // Wenn keine Sprache in der URL ist, umleiten
  if (!pathname.startsWith("/de") && !pathname.startsWith("/en")) {
    const url = request.nextUrl.clone();
    url.pathname = `/de${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Funktion für Übersetzungen
export function getTranslations(locale: string) {
  return translations[locale] || translations.de;
}
