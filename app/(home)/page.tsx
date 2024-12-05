// Craft Imports
import { ContentContainer } from "@/components/craft";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <HomePage />
  );
}

const HomePage = () => {
  return (
    <main>
      {/* Hero Section */}
      <section
        className="bg-backgroundTwo min-h-screen flex items-center relative"
        id="hero-section"
      >
        <ContentContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            {/* Textbereich */}
            <div className="space-y-6">
              {/* Überschrift */}
              <h1 className="text-6xl font-bold text-foreground leading-tight">
                Kompetenzzentrum für virtuellen Maschinenbau
              </h1>
              {/* Untertitel */}
              <p className="text-lg text-foreground/75">
                Wir programmieren Ihre Maschine
              </p>
              {/* Call to Action */}
              <div>
                <Link
                  href="/services"
                  className="inline-block bg-primary text-white px-6 py-3 rounded-md text-lg hover:bg-primary/90 transition-all"
                >
                  Lass uns arbeiten
                </Link>
              </div>
            </div>

            {/* Bildbereich */}
            <div className="hidden lg:block">
              <Image
                src="/images/robot-hero-section.png"
                alt="Roboter Arm in Aktion"
                width={800}
                height={600}
                priority
                className="object-contain"
              />
            </div>
          </div>
        </ContentContainer>
      </section>
    </main>
  );
};
