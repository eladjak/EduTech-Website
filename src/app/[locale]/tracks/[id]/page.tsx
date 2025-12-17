import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { TrackHero } from "@/components/tracks/TrackHero";
import { TrackFeatures } from "@/components/tracks/TrackFeatures";
import { TrackActivities } from "@/components/tracks/TrackActivities";
import { TrackTestimonials } from "@/components/tracks/TrackTestimonials";

const validTracks = ["ai", "kids", "pro", "edu", "camp"] as const;
type TrackId = (typeof validTracks)[number];

interface PageProps {
  params: { id: string; locale: string };
}

export async function generateStaticParams() {
  return validTracks.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id, locale } = params;

  if (!validTracks.includes(id as TrackId)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "home.tracks" });

  return {
    title: `${t(`${id}.title`)} - EduTech`,
    description: t(`${id}.description`),
  };
}

export default async function TrackPage({ params }: PageProps) {
  const { id } = params;

  if (!validTracks.includes(id as TrackId)) {
    notFound();
  }

  return (
    <>
      <TrackHero trackId={id as TrackId} />
      <TrackFeatures trackId={id as TrackId} />
      <TrackActivities trackId={id as TrackId} />
      <TrackTestimonials trackId={id as TrackId} />
    </>
  );
}
