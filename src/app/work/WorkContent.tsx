"use client";
import { Column, Heading, Text, Flex, Button } from "@/once-ui/components";
import { ThemeProvider, createTheme } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import styles from "./work.module.scss";
import { work } from "@/app/resources/content";

/**
 * MUI theme for a dark look but without forcing a dark background.
 * We remove (or comment out) the background to allow a transparent/parent background.
 */
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFFFFF",
      contrastText: "#000000",
    },
    secondary: {
      main: "#6366F1",
    }, 
    
    // background: {
    //   default: "#0a0a0a",
    //   paper: "#0a0a0a",
    // },
    text: {
      primary: "#FFFFFF",
      secondary: "#A1A1AA",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

export default function WorkContent() {
  return (
    <ThemeProvider theme={theme}>
      {/*
        Use inline styles to make the container narrower (20% width)
        and center it horizontally with margin: 0 auto.
      */}
      <Column
        style={{ width: "50%", margin: "0 auto" }}
        gap="l"
        paddingTop="xl"
        // Remove `background` prop to avoid any color overlay:
        // background="neutral-strong" // <-- remove or comment out
        horizontal="center"
      >
        {/* Page Header */}
        <Column gap="s" align="center">
          <Heading variant="display-strong-xl" color="brand-strong">
            {work.title}
          </Heading>
          <Text variant="heading-default-l" onBackground="neutral-weak">
            {work.description}
          </Text>
        </Column>

        {/* Projects List */}
        <Column gap="xl">
          {work.sections.map((section, index) => (
            // Use a horizontal flex so the number stays on the left,
            // while the details remain on the right. We center them
            // as a group by default.
            <Flex
              key={index}
              gap="xl"
              align="start"
              direction="row"
              className={styles.projectItem}
            >
              {/* Project Number */}
              <Text variant="display-strong-m" onBackground="neutral-weak">
                {String(index + 1).padStart(2, "0")}
              </Text>

              {/* Project Details */}
              <Column gap="m">
                <Flex gap="8" vertical="center">
                  <Heading variant="display-strong-m">{section.company}</Heading>
                  {section.company === "Dawn Aerospace" && (
                    <LockIcon sx={{ color: 'white', fontSize: '2rem' }} />
                  )}
                </Flex>
                <Text variant="body-default-l" onBackground="neutral-weak">
                  {section.summary}
                </Text>
                <Button
                  href={section.fullReportLink}
                  variant="tertiary"
                  size="s"
                  suffixIcon="arrowRight"
                  className={styles.projectLink}
                >
                  View Work.
                </Button>
              </Column>
            </Flex>
          ))}
        </Column>
      </Column>
    </ThemeProvider>
  );
}
