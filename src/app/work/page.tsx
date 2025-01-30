import { baseURL } from "@/app/resources";
import { Column } from "@/once-ui/components";
import { person, work } from "@/app/resources/content";
import WorkContent from "./WorkContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: work.title,
  description: work.description,
  openGraph: {
    title: work.title,
    description: work.description,
    url: `https://${baseURL}/work`,
  },
};

export default function Work() {
  return (
    <Column background="solid" fill>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            headline: work.title,
            description: work.description,
            url: `https://${baseURL}/work`,
            author: {
              "@type": "Person",
              name: person.name,
            }
          }),
        }}
      />
      <WorkContent />
    </Column>
  );
}
