import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/app/[locale]/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";

import "@/app/globals.css";

import { Button } from "@/app/[locale]/components/ui/button";
import { ThemeToggle } from "@/app/[locale]/components/theme/theme-toggle";
import { Main } from "@/app/[locale]/components/craft";
import { mainMenu, contentMenu } from "@/menu.config";
import { Section, ContentContainer } from "@/app/[locale]/components/craft";
import {Header} from '@/app/[locale]/components/nav/header'
import Balancer from "react-wrap-balancer";
import { getAdressInformation, getContactInformation } from '@/lib/wordpress'

//next-intl / i18n imports
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

//Images Import
import Logo from "@/public/logo/imt-logo.svg";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "IMT Website",
  description:
    "Website for Software Company IMT",
  metadataBase: new URL("https://dev.imt-services.de/"),
};

// Revalidate content every hour
export const revalidate = 3600;

export default async function RootLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const adressData = await getAdressInformation();
  const contactData = await getContactInformation();

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
              <Header adressData={adressData} contactData={contactData} />
              <Main>{children}</Main>
          </NextIntlClientProvider>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}



const Footer = () => {
  return (
    <footer>
      <Section>
        <ContentContainer className="grid md:grid-cols-[1.5fr_0.5fr_0.5fr] gap-12">
          <div className="flex flex-col gap-6 not-prose">
            <Link href="/">
              <h3 className="sr-only">brijr/components</h3>
              <Image
                src={Logo}
                alt="Logo"
                width={120}
                height={27.27}
                className="dark:invert hover:opacity-75 transition-all"
              ></Image>
            </Link>
            <p>
              <Balancer>{metadata.description}</Balancer>
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <h5 className="font-medium text-base">Website</h5>
            {Object.entries(mainMenu).map(([key, value]) => (
            <Link
              className="hover:underline underline-offset-4"
              key={key} 
              href={value.href} 
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Link>
          ))}
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <h5 className="font-medium text-base">Blog</h5>
            {Object.entries(contentMenu).map(([key, href]) => (
              <Link
                className="hover:underline underline-offset-4"
                key={href}
                href={href}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Link>
            ))}
          </div>
        </ContentContainer>
        <ContentContainer className="border-t not-prose flex flex-col md:flex-row md:gap-2 gap-6 justify-between md:items-center">
          <ThemeToggle />
          <p className="text-muted-foreground">
            © <a href="https://9d8.dev">9d8</a>. All rights reserved.
            2024-present.
          </p>
        </ContentContainer>
      </Section>
    </footer>
  );
};
