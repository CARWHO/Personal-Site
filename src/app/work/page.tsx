import { baseURL } from "@/app/resources";
import { person, work } from "@/app/resources/content";
import WorkContent from './WorkContent';
export { generateMetadata } from './metadata';

export default function Work() {
  return (
    <>
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
    </>
  );
}
