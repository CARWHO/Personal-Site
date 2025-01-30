"use client";
import { Column, Heading, Text, Flex, Button } from "@/once-ui/components";
import { ThemeProvider, createTheme } from "@mui/material";
import styles from "./work.module.scss";
import { work } from "@/app/resources/content";

/**
 * MUI theme for the dark mode.
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
    background: {
      default: "#0a0a0a",
      paper: "#0a0a0a",
    },
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
      <Column maxWidth="l" gap="l" paddingTop="xl" background="neutral-strong">
        {/* Page Header */}
        <Column gap="s" align="start">
          <Heading variant="display-strong-xl" color="brand-strong">
            {work.title}
          </Heading>
          <Text variant="heading-default-l" onBackground="neutral-weak">
            {work.description}
          </Text>
        </Column>

        {/* Projects List */}
        <Column gap="3xl">
          {work.sections.map((section, index) => (
            <Flex key={index} gap="xl" align="start" className={styles.projectItem}>
              {/* Project Number */}
              <Text variant="display-strong-m" onBackground="neutral-weak">
                {String(index + 1).padStart(2, "0")}
              </Text>

              {/* Project Details */}
              <Column gap="m">
                <Heading variant="display-strong-m">{section.company}</Heading>
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
                  View Case Study
                </Button>
              </Column>
            </Flex>
          ))}
        </Column>
      </Column>
    </ThemeProvider>
  );
}
