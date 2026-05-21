"use client";

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import axios from 'axios';
import { Input, Button, Spinner } from '@heroui/react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import TutorCard from '@/components/TutorCard';
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-playfair",
});

// Primary list component that uses searchParams hooks
function TutorsList() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // 1. Initial State from URL Search Params
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [debouncedSearch, setDebouncedSearch] = useState(searchParams.get("search") || "");
    const [startDate, setStartDate] = useState(searchParams.get("startDate") || "");
    const [endDate, setEndDate] = useState(searchParams.get("endDate") || "");
    
    // Data & Fetching States
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. Search Debounce optimization
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [search]);

    // 3. Keep URL synced with parameters
    const updateUrlParams = useCallback((searchVal, startVal, endVal) => {
        const params = new URLSearchParams();
        if (searchVal) params.set("search", searchVal);
        if (startVal) params.set("startDate", startVal);
        if (endVal) params.set("endDate", endVal);

        const queryStr = params.toString();
        router.push(`${pathname}${queryStr ? `?${queryStr}` : ''}`, { scroll: false });
    }, [router, pathname]);

    // 4. Fetch Tutors dynamically based on params
    const fetchTutors = useCallback(async (searchQuery, start, end) => {
        setLoading(true);
        setError(null);
        try {
            const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
            
            // Build api query params
            const queryParams = {};
            if (searchQuery) queryParams.search = searchQuery;
            if (start) queryParams.startDate = start;
            if (end) queryParams.endDate = end;

            const response = await axios.get(`${serverUrl}/tutors`, { params: queryParams });
            setTutors(response.data || []);
        } catch (err) {
            console.error("Error fetching tutors:", err);
            setError("Failed to load tutors. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, []);

    // 5. Trigger Fetch & URL Update when filters or debounced values change
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchTutors(debouncedSearch, startDate, endDate);
        updateUrlParams(debouncedSearch, startDate, endDate);
    }, [debouncedSearch, startDate, endDate, fetchTutors, updateUrlParams]);

    // 6. Reset filters functionality
    const handleReset = () => {
        setSearch("");
        setDebouncedSearch("");
        setStartDate("");
        setEndDate("");
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 min-h-screen">
            {/* Header */}
            <div className="mb-12 text-center md:text-left">
                <h1 className={`${playfair.className} font-serif text-3xl md:text-5xl font-bold text-slate-900 mb-4`}>
                    Find Your Tutor
                </h1>
                <p className="text-gray-500 text-sm md:text-base">
                    Discover and book professional tutors matching your availability, dates, and learning goals.
                </p>
            </div>

            {/* Mockup Aligned Responsive Search & Filter Section */}
            <div className="bg-white border border-gray-100 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] rounded-3xl p-6 md:p-8 mb-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                    
                    {/* Search Input */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="search-input" className="text-sm font-semibold text-slate-900 pl-1">
                            Search Tutor
                        </label>
                        <Input
                            id="search-input"
                            type="text"
                            placeholder="Search tutor by name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            radius="full"
                            variant="bordered"
                            className="bg-transparent text-sm w-full border-gray-200"
                        />
                    </div>

                    {/* Start Date Picker */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="start-date" className="text-sm font-semibold text-slate-900 pl-1">
                            Start Date
                        </label>
                        <Input
                            id="start-date"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            radius="full"
                            variant="bordered"
                            className="bg-transparent text-sm w-full border-gray-200 hover:border-gray-300 focus-within:!border-[#0B2F5B] h-12 shadow-none"
                        />
                    </div>

                    {/* End Date Picker */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="end-date" className="text-sm font-semibold text-slate-900 pl-1">
                            End Date
                        </label>
                        <Input
                            id="end-date"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            radius="full"
                            variant="bordered"
                            className="bg-transparent text-sm w-full border-gray-200 hover:border-gray-300 focus-within:!border-[#0B2F5B] h-12 shadow-none"
                        />
                    </div>

                    {/* Reset Filters Button */}
                    <div>
                        <Button
                            onClick={handleReset}
                            radius="full"
                            variant="bordered"
                            className="w-full h-12 text-sm font-medium border-gray-200 hover:border-red-200 hover:text-red-500 hover:bg-red-50/50 transition-all duration-200"
                        >
                            Reset Filters
                        </Button>
                    </div>

                </div>
            </div>

            {/* Tutors Rendering Content Area */}
            {loading ? (
                <div className="flex justify-center items-center py-24">
                    <Spinner size="lg" color="primary" label="Finding best tutors..."  />
                </div>
            ) : error ? (
                <div className="text-center py-16 bg-red-50/40 rounded-3xl border border-red-100 max-w-xl mx-auto px-6">
                    <p className="text-red-600 font-medium mb-2">{error}</p>
                    <Button size="sm" onClick={() => fetchTutors(debouncedSearch, startDate, endDate)} className="bg-[#0B2F5B] text-white rounded-xl mt-4">
                        Retry Fetch
                    </Button>
                </div>
            ) : tutors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tutors.map((tutor) => (
                        <TutorCard key={tutor._id} tutor={tutor} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.02)] max-w-lg mx-auto px-6">
                    <div className="mb-6 flex justify-center">
                        <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">No Tutors Found</h3>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                        We couldnt find any tutors matching your current filters. Try relaxing your name search or date filters.
                    </p>
                    <Button onClick={handleReset} className="bg-[#0B2F5B] text-white rounded-xl font-medium px-6 h-11">
                        Clear Search & Filters
                    </Button>
                </div>
            )}
        </div>
    );
}

// Wrap TutorsList in Suspense to prevent Next.js build-time dynamic bailout warning
export default function AllTutorsPage() {
    return (
        <Suspense fallback={
            <div className="flex justify-center items-center h-screen">
                <Spinner size="lg" label="Loading tutors hub..." color="primary" />
            </div>
        }>
            <TutorsList />
        </Suspense>
    );
}