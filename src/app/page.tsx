import { baseURL } from "@/app/resources";
import { home, person } from "@/app/resources/content";
import HomeContent from "./HomeContent";

export async function generateMetadata() {
  const title = home.title;
  const description = home.description;
  const avatarImage = "/images/avatar.jpg";

  return {
    title,
    description,
    openGraph: {
      title: `${person.name}'s Portfolio`,
      description: person.role,
      type: "website",
      url: `https://${baseURL}`,
      images: [
        {
          url: avatarImage,
          alt: `${person.name}'s Portfolio`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [avatarImage],
    },
  };
}

export default function Home() {
  return <HomeContent />;
}
