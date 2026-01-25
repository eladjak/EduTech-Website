import { getTranslations } from "next-intl/server";
import { ActivitiesHero } from "@/components/activities/ActivitiesHero";
import { ActivitiesGrid } from "@/components/activities/ActivitiesGrid";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "activities",
  });

  return {
    title: `${t("title")} - EduTech`,
    description: t("subtitle"),
  };
}

export default function ActivitiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ActivitiesHero />
      <ActivitiesGrid />
    </div>
  );
}
