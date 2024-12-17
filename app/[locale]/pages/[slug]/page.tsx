import { getPageBySlug } from "@/lib/wordpress";
import { Section, ContentContainer, Main } from "@/app/[locale]/components/craft";
import { Metadata } from "next";

import BackButton from "@/app/[locale]/components/back";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const page = await getPageBySlug(params.slug);
  return {
    title: page.title.rendered,
    description: page.excerpt.rendered,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await getPageBySlug(params.slug);

  return (
    <Section>
      <ContentContainer>
        <BackButton />
        <h1 className="pt-12">{page.title.rendered}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
      </ContentContainer>
    </Section>
  );
}
