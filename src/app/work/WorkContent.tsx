"use client";
import { Column, Heading, Text, Flex, Button } from "@/once-ui/components";
import {
  ThemeProvider,
  createTheme,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Grid,
} from "@mui/material";
import styles from "./work.module.scss";
import { work } from "@/app/resources/content";

/**
 * You can customize your theme here as you like.
 * This example uses a different palette compared to the original.
 */
const theme = createTheme({
  palette: {
    primary: {
      main: "#6366F1", // Indigo
    },
    secondary: {
      main: "#10B981", // Emerald
    },
  },
});

export default function WorkContent() {
  return (
    <ThemeProvider theme={theme}>
      <Column maxWidth="l" gap="xl" className={styles.workContainer}>
        {/* Page Title and Description */}
        <Column gap="m" align="start">
          <Heading variant="display-strong-l">{work.title}</Heading>
          <Text variant="heading-default-m" onBackground="neutral-weak">
            {work.description}
          </Text>
        </Column>

        {/* Grid of Cards */}
        <Grid container spacing={4}>
          {work.sections.map((section, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card elevation={3} className={styles.workCard}>
                {/* Company Logo (or representative image) */}
                <CardMedia
                  component="img"
                  height="180"
                  image={section.logo}
                  alt={`${section.company} logo`}
                  className={styles.workCardMedia}
                />

                {/* Card Content with Company Name and Summary */}
                <CardContent>
                  <Heading variant="display-strong-s" as="h3">
                    {section.company}
                  </Heading>
                  <Text variant="body-default-m" onBackground="neutral-weak">
                    {section.summary}
                  </Text>
                </CardContent>

                {/* Card Actions */}
                <CardActions>
                  <Button
                    href={section.fullReportLink}
                    variant="primary"
                    size="s"
                  >
                    Full Report
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Column>
    </ThemeProvider>
  );
}
