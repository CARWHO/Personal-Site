"use client";
import { Column, Heading, Text, SmartImage } from "@/once-ui/components";
import { motion, AnimatePresence } from "framer-motion";
import ImageControl from "@/components/ImageControl";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Project1 from "./project1";
import Project2 from "./project2";

export default function DawnAerospace() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/api/check-auth");
      if (response.ok) {
        setIsAuthenticated(true);
      }
    };
    checkAuth();

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [router]);

  return (
    <AnimatePresence mode="wait">
      {!isAuthenticated ? (
        <motion.div
          key="password"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0 }}
          style={{ width: "100%", height: "100vh" }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(8px)",
            }}
          />
        </motion.div>
      ) : (
        <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.0 }}>
          <Column maxWidth="m" gap="xl" padding="xl">
            {/* --- Title Section --- */}
            <Column gap="m" style={{ position: "relative" }}>
              {!isMobile && (
                <div
                  style={{
                    position: "absolute",
                    width: "600px",
                    height: "150px",
                    top: "20%",
                    left: "83%",
                    transform: "translate(-50%, -50%) rotate(-5deg)",
                    opacity: 1.0,
                    zIndex: 0,
                    backgroundImage: 'url("/images/Dawn+Mk-II+Aurora+Flight.png")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "0px",
                    pointerEvents: "none",
                  }}
                />
              )}
              <div style={{ position: "relative", zIndex: 1 }}>
                <Heading variant="display-strong-l">
                  Dawn Aerospace Electrical Engineering
                </Heading>
                <Text variant="heading-default-m" onBackground="neutral-weak">
                  Spacecraft Propulsion Development Intern
                </Text>
              </div>
            </Column>

            {/* Introduction */}
            <Column gap="l">
              <Text variant="body-default-l">
                Over a three-month period, I completed a 400-hour internship at Dawn Aerospace, a company dedicated to advancing in-space propulsion technology for satellites and aerospace applications. My role as an Electrical Engineering Intern allowed me to dive into both software and hardware aspects—bridging theory with real-world satellite operations.
              </Text>
              {!isMobile && (
                <ImageControl
                  images={[
                    {
                      src: "/images/spaceplane2.png",
                      alt: "Dawn Aerospace workshop and spaceplane",
                      position: { x: 130, y: 130 },
                      dimensions: { width: 70, height: 400 },
                      opacity: 1,
                      zIndex: 4,
                      rotation: 0,
                    },
                    {
                      src: "/images/igniter.jpeg",
                      alt: "Igniter setup",
                      position: { x: 450, y: 100 },
                      dimensions: { width: 50, height: 200 },
                      opacity: 0.7,
                      zIndex: 3,
                      rotation: 10,
                    },
                    {
                      src: "/images/safetygear.png",
                      alt: "Wearing safety gear in the workshop",
                      position: { x: -100, y: 170 },
                      dimensions: { width: 60, height: 350 },
                      opacity: 0.6,
                      zIndex: 2,
                      rotation: 10,
                    },
                    {
                      src: "/images/feedlinetestjig.jpeg",
                      alt: "Feedline test jig setup",
                      position: { x: 400, y: 390 },
                      dimensions: { width: 50, height: 200 },
                      opacity: 0.5,
                      zIndex: 1,
                      rotation: -5,
                    },
                    {
                      src: "/images/grafana.png",
                      alt: "Grafana",
                      position: { x: 150, y: 20 },
                      dimensions: { width: 50, height: 200 },
                      opacity: 1.0,
                      zIndex: 3,
                      rotation: -4,
                    },
                  ]}
                />
              )}
            </Column>

            {/* NEW CONTENT: Projects */}
            <Project1 />
            <Project2 />
          </Column>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
