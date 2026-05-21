"use client";

import Image from "next/image";
import { Button } from "@heroui/react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    title: "Smart Tutor Booking Made Easy",
    description:
      "MediQueue simplifies tutor scheduling with real-time availability, secure booking, and seamless management for students and tutors.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7",
    title: "Find Expert Tutors Instantly",
    description:
      "Browse qualified tutors by subject, experience, and availability to start learning without delays.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0",
    title: "Learn Anywhere, Anytime",
    description:
      "Book online or offline sessions and continue your learning journey from the comfort of your home.",
  },
];

export default function Hero() {
  return (
    <section className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-[92vh]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-[92vh] w-full">
              
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/55" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center px-5">
                <div className="max-w-4xl text-center text-white">
                  
                  <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                    {slide.title}
                  </h1>

                  <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-200 md:text-2xl">
                    {slide.description}
                  </p>

                  <Button
                    size="lg"
                    radius="md"
                    className="mt-10 bg-[#0B2F5B] px-10 text-lg font-semibold text-white"
                  >
                    Explore Tutors
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}