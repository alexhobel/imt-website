// Craft Imports
import { ContentContainer } from "@/components/craft";
import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "@/hooks/useTranslation";

export default async function Home({ params }: { params: { locale: string } }) {
  const locale = params?.locale || "de"; // Standard: Deutsch
  const translations = getTranslations(locale);

  return (
    <HomePage translations={translations} />
  );
}

const HomePage = ({ translations }: { translations: any }) => {
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
                {translations.hero.title}
              </h1>
              {/* Untertitel */}
              <p className="text-lg text-foreground/75">
                {translations.hero.subtitle}
              </p>
              {/* Call to Action */}
              <div>
                <Link
                  href="/services"
                  className="inline-block bg-primary text-white px-6 py-3 rounded-md text-lg hover:bg-primary/90 transition-all"
                >
                  {translations.hero.cta}
                </Link>
              </div>
            </div>
          </div>
        </ContentContainer>
        {/* Bildbereich */}
        <div className="hidden lg:block inset-0 right-0 z-0 flex justify-end items-center p-0 !mt-0 !mb-0">
          <Image
            src="/images/robot-hero-section.png"
            alt={translations.hero.imageAlt}
            width={800}
            height={600}
            priority
            className="object-contain"
          />
        </div>
      </section>
    </main>
  );
};
