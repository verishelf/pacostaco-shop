import { CorporateStats } from "@/components/marketing/CorporateStats";
import { FranchiseSection } from "@/components/marketing/FranchiseSection";
import { Hero } from "@/components/marketing/Hero";
import { LocationSection } from "@/components/marketing/LocationSection";
import { MenuSection } from "@/components/marketing/MenuSection";
import { StorySection } from "@/components/marketing/StorySection";
import { getFeaturedMenuItems } from "@/lib/data/menu";
import { getPrimaryLocation } from "@/lib/data/locations";

export default async function HomePage() {
  const [menuItems, location] = await Promise.all([
    getFeaturedMenuItems(),
    getPrimaryLocation(),
  ]);

  return (
    <>
      <Hero />
      <CorporateStats />
      <MenuSection items={menuItems} />
      <hr className="mx-auto max-w-6xl border-t-2 border-dashed border-amber-200" />
      <StorySection />
      <FranchiseSection />
      <LocationSection location={location} />
    </>
  );
}
