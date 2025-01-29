import { Column, Heading, Text, Flex } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { person, work } from "@/app/resources/content";

export async function generateMetadata() {
  const title = work.title;
  const description = work.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/work/`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Work() {
  return (
    <Column maxWidth="m" gap="xl">
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
      
      <Column gap="m">
        <Heading variant="display-strong-l">{work.title}</Heading>
        <Text variant="heading-default-m" onBackground="neutral-weak">
          {work.description}
        </Text>
      </Column>

      {work.sections.map((section, index) => (
        <Column key={section.company} gap="m">
          <Flex vertical="center" gap="12">
            <img
              src={section.logo}
              alt={`${section.company} logo`}
              style={{
                width: '32px',
                height: '32px',
                objectFit: 'cover',
                borderRadius: '4px'
              }}
            />
            <Heading variant="display-strong-m">{section.company}</Heading>
          </Flex>
          <Text variant="body-default-l" onBackground="neutral-weak">
            {section.description}
          </Text>
        </Column>
      ))}
    </Column>
  );
}
