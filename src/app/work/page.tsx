// src/app/page.tsx
import { baseURL } from "@/app/resources";
import { work } from "@/app/resources/content";
import { Metadata } from "next";
import WorkPageContent from "./WorkPageContent";

export const metadata: Metadata = {
  title: work.title,
  description: work.description,
  openGraph: {
    title: work.title,
    description: work.description,
    url: `https://${baseURL}/work`,
  },
};

export default function WorkPage() {
  return <WorkPageContent />;
}
