// Craft Imports
import { Section, Container } from "@/components/craft";
import Balancer from "react-wrap-balancer";

// Components
import Link from "next/link";

// Icons
import { File, Pen, Tag, Boxes, User, Folder } from "lucide-react";

// This page is using the craft.tsx component and design system
export default function Home() {
  return (
    <Section>
      <Container>
        <HomePage />
      </Container>
    </Section>
  );
}

const HomePage = () => {
  return (
    <div>
      <h1>Ich bin die Startseite</h1>
    </div>
  );
};
