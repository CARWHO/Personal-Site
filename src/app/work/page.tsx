import { Column, Heading, Text, Flex, Button } from "@/once-ui/components";
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import styles from "./work.module.scss";
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

const theme = createTheme({
  palette: {
    primary: {
      main: '#10B981', // emerald-500
    },
  },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          '&:before': {
            display: 'none',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: 0,
          '& .MuiAccordionSummary-expandIconWrapper': {
            color: '#10B981',
          },
        },
        content: {
          margin: 0,
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '8px 0 16px 50px',
        },
      },
    },
  },
});

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

      <ThemeProvider theme={theme}>
        {work.sections.map((section, index) => (
          <Accordion key={section.company} className={styles.workAccordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${section.company}-content`}
              id={`${section.company}-header`}
            >
              <Flex vertical="center" gap="12">
                <img
                  src={section.logo}
                  alt={`${section.company} logo`}
                  style={{
                    width: section.company === "Dawn Aerospace" || section.company === "KORA" 
                      ? '46px' 
                      : '38px',
                    height: section.company === "Dawn Aerospace" || section.company === "KORA" 
                      ? '46px' 
                      : '38px',
                    objectFit: 'cover',
                    borderRadius: '4px'
                  }}
                />
                <Heading variant="display-strong-m">{section.company}</Heading>
              </Flex>
            </AccordionSummary>
            <AccordionDetails>
              <Column gap="m">
                <Text variant="body-default-l" onBackground="neutral-weak">
                  {section.summary}
                </Text>
                <Button 
                  href={section.fullReportLink}
                  variant="secondary"
                  size="s"
                >
                  Full Report
                </Button>
              </Column>
            </AccordionDetails>
          </Accordion>
        ))}
      </ThemeProvider>
      ))}
    </Column>
  );
}
