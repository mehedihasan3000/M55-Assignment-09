import Hero from "@/components/Hero";
import AvailableTutors from "@/components/AvailableTutors";
import WhyChooseAndHowItWorks from "@/components/WhyChooseAndHowItWorks";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div>
      <Hero />
      <AvailableTutors />
      <WhyChooseAndHowItWorks />
    </div>
  );
}


