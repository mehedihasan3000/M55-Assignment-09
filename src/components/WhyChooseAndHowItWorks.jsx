"use client";

import { Card } from "@heroui/react";
import { Playfair_Display } from "next/font/google";

// Dynamically load the Playfair Display font for elegant serif headers
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-playfair",
});

const whyChooseFeatures = [
  {
    title: "Easy Booking",
    description: "Book tutors instantly with a smooth and simple interface.",
  },
  {
    title: "Verified Tutors",
    description: "All tutors are verified to ensure quality education.",
  },
  {
    title: "Flexible Scheduling",
    description: "Choose time slots that fit your daily routine.",
  },
  {
    title: "Affordable Pricing",
    description: "Find tutors that match your budget easily.",
  },
];

const howItWorksSteps = [
  {
    step: "01",
    title: "Search Tutor",
    description: "Browse tutors by subject and availability.",
  },
  {
    step: "02",
    title: "Select Slot",
    description: "Choose your preferred date and time.",
  },
  {
    step: "03",
    title: "Book Session",
    description: "Confirm booking with one click.",
  },
  {
    step: "04",
    title: "Start Learning",
    description: "Join your session and begin learning.",
  },
];

export default function WhyChooseAndHowItWorks() {
  return (
    <div className="bg-[#fbfbfb] text-slate-900 antialiased w-full">
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8 space-y-24 md:space-y-32">
        
        {/* BEGIN: WhyChooseSection */}
        <section id="why-choose" aria-labelledby="why-choose-heading">
          <h2
            id="why-choose-heading"
            className={`${playfair.className} font-serif text-3xl font-bold text-center text-slate-900 mb-12 md:mb-16 md:text-4xl`}
          >
            Why Choose MediQueue?
          </h2>
          
          {/* Feature Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
            {whyChooseFeatures.map((feature, idx) => (
              <Card
                key={idx}
                className="border border-gray-50 bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] transition-transform hover:scale-[1.02] duration-300 flex flex-col items-center text-center"
              >
                <h3 className="text-lg font-bold mb-4 text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </section>
        {/* END: WhyChooseSection */}

        {/* BEGIN: HowItWorksSection */}
        <section id="how-it-works" aria-labelledby="how-it-works-heading">
          <h2
            id="how-it-works-heading"
            className={`${playfair.className} font-serif text-3xl font-bold text-center text-slate-900 mb-12 md:mb-16 md:text-4xl`}
          >
            How It Works
          </h2>
          
          {/* Steps Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
            {howItWorksSteps.map((stepItem, idx) => (
              <Card
                key={idx}
                className="border border-gray-50 bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] transition-transform hover:scale-[1.02] duration-300 flex flex-col items-center text-center"
              >
                <span className="text-[#2563eb] text-2xl font-bold mb-4">
                  {stepItem.step}
                </span>
                <h3 className="text-lg font-bold mb-4 text-slate-900">
                  {stepItem.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">
                  {stepItem.description}
                </p>
              </Card>
            ))}
          </div>
        </section>
        {/* END: HowItWorksSection */}

      </main>
    </div>
  );
}
