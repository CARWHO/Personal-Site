"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button, Fade, Flex, Line, ToggleButton } from "@/once-ui/components";
import styles from "@/components/Header.module.scss";

import { routes, display } from "@/app/resources";
import { person, about, blog, work, gallery } from "@/app/resources/content";

/* ────────────────────────────────────────────────────────────
   Local time read-out
   ──────────────────────────────────────────────────────────── */
type TimeDisplayProps = {
  timeZone: string;
  locale?: string;
};

export const TimeDisplay: React.FC<TimeDisplayProps> = ({
  timeZone,
  locale = "en-GB",
}) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat(locale, options).format(now));
    };

    tick(); // initial render
    const id = setInterval(tick, 1_000);
    return () => clearInterval(id);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

/* ────────────────────────────────────────────────────────────
   Header
   ──────────────────────────────────────────────────────────── */
const Header: React.FC = () => {
  const pathname = usePathname() ?? "";

  return (
    <>
      {/* page fades */}
      <Fade hide="s" fillWidth position="fixed" height="80" zIndex={9} />
      <Fade show="s" fillWidth position="fixed" bottom="0" to="top" height="80" zIndex={9} />

      <Flex
        fitHeight
        as="header"
        className={styles.position}
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
      >
        {/* left — location */}
        <Flex paddingLeft="12" fillWidth vertical="center" textVariant="body-default-s">
          {display.location && <Flex hide="s">{person.location}</Flex>}
        </Flex>

        {/* centre — navigation + resume */}
        <Flex fillWidth horizontal="center">
          <Flex
            background="surface"
            border="neutral-medium"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
          >
            <Flex gap="4" vertical="center" textVariant="body-default-s">
              {/* home */}
              {routes["/"] && (
                <ToggleButton prefixIcon="home" href="/" selected={pathname === "/"} />
              )}

              <Line vert maxHeight="24" />

              {/* about */}
              {routes["/about"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="person"
                    href="/about"
                    label={about.label}
                    selected={pathname === "/about"}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="person"
                    href="/about"
                    selected={pathname === "/about"}
                  />
                </>
              )}

              {/* work */}
              {routes["/work"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="grid"
                    href="/work"
                    label={work.label}
                    selected={pathname.startsWith("/work")}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="grid"
                    href="/work"
                    selected={pathname.startsWith("/work")}
                  />
                </>
              )}

              {/* blog */}
              {routes["/blog"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="book"
                    href="/blog"
                    label={blog.label}
                    selected={pathname.startsWith("/blog")}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="book"
                    href="/blog"
                    selected={pathname.startsWith("/blog")}
                  />
                </>
              )}

              {/* gallery */}
              {routes["/gallery"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="gallery"
                    href="/gallery"
                    label={gallery.label}
                    selected={pathname.startsWith("/gallery")}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="gallery"
                    href="/gallery"
                    selected={pathname.startsWith("/gallery")}
                  />
                </>
              )}

              <Line vert maxHeight="24" />

              {/* résumé download */}
              <Button
                variant="tertiary"
                className="s-flex-hide"
                prefixIcon="download"
                href="/images/Resume.pdf"
                download="Resume.pdf"
              >
                Resume
              </Button>
              <Button
                variant="tertiary"
                className="s-flex-show"
                prefixIcon="download"
                href="/images/Resume.pdf"
                download="Resume.pdf"
                aria-label="Download Resume"
              />
            </Flex>
          </Flex>
        </Flex>

        {/* right — time */}
        <Flex fillWidth horizontal="end" vertical="center">
          <Flex paddingRight="12" horizontal="end" vertical="center" textVariant="body-default-s">
            <Flex hide="s">{display.time && <TimeDisplay timeZone={person.location} />}</Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

/* ensure both default and named export to avoid breaking other imports */
export { Header };
export default Header;
