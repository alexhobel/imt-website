import { getAllAuthors } from "@/lib/wordpress";
import { Section, ContentContainer } from "@/app/[locale]/components/craft";
import Link from "next/link";
import BackButton from "@/app/[locale]/components/back";
import { Metadata } from "next";


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "All Authors",
    description: "Browse all authors on the site.",
  };
}

export default async function Page() {
  const authors = await getAllAuthors();

  return (
    <Section>
      <ContentContainer>
        <BackButton />
        <h2>All Authors</h2>
        <div className="grid">
          {authors.map((author: any) => (
            <Link key={author.id} href={`/posts/?author=${author.id}`}>
              {author.name}
            </Link>
          ))}
        </div>
      </ContentContainer>
    </Section>
  );
}
