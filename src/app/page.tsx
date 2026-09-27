import Hero from "@/components/hero/Hero";
import LogoMarquee from "@/components/sections/LogoMarquee";
import IntroStats from "@/components/sections/IntroStats";
import ShowroomSplit from "@/components/sections/ShowroomSplit";
import StackedShowcase from "@/components/vehicles/StackedShowcase";
import WhatSetsUsApart from "@/components/sections/WhatSetsUsApart";
import Testimonials from "@/components/sections/Testimonials";
import PromoCards from "@/components/sections/PromoCards";
import TeamGrid from "@/components/sections/TeamGrid";
import FutureCarousel from "@/components/sections/FutureCarousel";
import JournalPreview from "@/components/sections/JournalPreview";
import CTASection from "@/components/sections/CTASection";
import { featuredVehicles, vehicles } from "@/data/vehicles";
import { articles } from "@/data/articles";

export default function Home() {
  const onDisplay = vehicles.filter((v) => !v.featured);

  return (
    <>
      <Hero />
      <LogoMarquee />
      <IntroStats />
      <ShowroomSplit />
      <StackedShowcase vehicles={featuredVehicles} />
      <WhatSetsUsApart />
      <Testimonials />
      <PromoCards />
      <TeamGrid />
      <FutureCarousel vehicles={onDisplay} />
      <JournalPreview articles={articles.slice(1, 3)} />
      <CTASection />
    </>
  );
}
