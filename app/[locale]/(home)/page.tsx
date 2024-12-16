// Craft Imports
import { ContentContainer } from "@/app/[locale]/components/craft";
//import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {Link} from '@/i18n/routing';
import { Button } from "@/app/[locale]/components/ui/button";
import "@radix-ui/themes/styles.css";


export default async function Home({ params }: { params: { locale: string } }) {
  return <HomePage />;
}

const HomePage = () => {

  const t = useTranslations('home');

  return (
    <main>
      {/* Hero Section */}
      <section
        className="bg-backgroundTwo min-h-screen flex items-center relative"
        id="hero-section"
      >
        <ContentContainer>
          <div className="items-center">
            {/* Textbereich */}
            <div className="space-y-6">
              {/* Überschrift */}
              <h1 className="text-6xl !font-extrabold text-foreground leading-tight">
                {t("hero.title")}
              </h1>
              {/* Untertitel */}
              <p className="text-lg text-foreground/75">{t("hero.subtitle")}</p>
              {/* Call to Action */}
              <div>
              <Link href="/services">
                <Button
                  variant="outlinePrimary"
                  size="lg"
                  rounded="rounded-full"
                >
                  {t("hero.cta")}
                </Button>
              </Link>
              </div>
            </div>
          </div>
        </ContentContainer>
        {/* Bildbereich */}
        <div className="hidden lg:block inset-0 right-0 z-0 flex justify-end items-center p-0 !mt-0 !mb-0">
          <Image
            src="/images/robot-hero-section.png"
            alt="alt"
            width={800}
            height={600}
            priority
            className="object-contain"
          />
        </div>
      </section>

      {/* Expertise Section */}
      <section
        id="expertise-section"
        aria-labelledby="expertise-title"
        className="bg-white py-16"
      >
      <ContentContainer>
        <div className="flex flex-col lg:flex-row items-start justify-between">
          {/* Linker Bereich */}
          <div className="lg:w-[60%]">
            <p className="text-sm font-bold text-primary uppercase tracking-wider m-0">
              Virtuelle Lösungen
            </p>
            <h2 className="!text-6xl !font-extrabold text-foreground leading-tight !mt-1.5 !mb-0">
              IMT - Unsere Expertise.<br />Ihre Vorteile
            </h2>
          </div>

          {/* Rechter Bereich */}
          <div className="lg:w-[40%]">
            <p className="text-muted-foreground text-lg">
              Von der präzisen Konstruktion bis zum digitalen Zwilling – IMT bietet
              Ihnen maßgeschneiderte Lösungen für die digitale Transformation Ihrer
              Maschinen. Effizient, sicher und zukunftsorientiert.
            </p>
          </div>
        </div>

        {/* Button-Bereich */}
        <div className="mt-10">
          <Link href="/services">
            <Button variant="outlinePrimary" size="lg" rounded="rounded-full">
              Erfahren Sie mehr über unsere digitalen Lösungen
            </Button>
          </Link>
        </div>

      </ContentContainer>
      </section>
    </main>
  );
};
