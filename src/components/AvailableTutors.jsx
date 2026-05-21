import React from 'react';
import TutorCard from './TutorCard';
import { Button } from '@heroui/react';
import Link from 'next/link';
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-playfair",
});

const AvailableTutors = async () => {
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/available-tutor`);
    const availableTutors = await res.json();

    return (
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            <div className="text-center mb-12 md:mb-16">
                <h2 className={`${playfair.className} font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4`}>
                    Available Tutors
                </h2>
                <p className="text-gray-500 max-w-lg mx-auto text-sm md:text-base">
                    Connect with our highly qualified, verified educators. Select your tutor and book a slot instantly to start learning.
                </p>
            </div>

            {availableTutors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {availableTutors.map((tutor) => (
                        <TutorCard key={tutor._id} tutor={tutor} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 mb-4">No tutors are currently available. Please check back later!</p>
                </div>
            )}

            <div className="flex justify-center mt-12 md:mt-16">
                <Link href="/tutors">
                    <Button
                        size="lg"
                        className="bg-[#0B2F5B] text-white px-8 h-12 text-medium rounded-xl hover:opacity-90 font-medium transition shadow-md hover:shadow-lg"
                    >
                        See All Tutors
                    </Button>
                </Link>
            </div>
        </section>
    );
};

export default AvailableTutors;
