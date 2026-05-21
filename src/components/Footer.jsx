import Link from "next/link";

const Footer = () => {
    return (
        <footer className="relative mt-24 w-full border-t border-gray-100">
            <div className="absolute inset-0 -z-10 bg-white dark:bg-[#0a0a0b]" />

            {/* Subtle Gradient Glow */}
            <div
                className="absolute inset-0 -z-10 bg-linear-to-tr 
        from-blue-500/5 via-transparent to-indigo-500/5 
        dark:from-blue-500/10 dark:to-indigo-500/10 blur-3xl"
            />

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                {/* Top Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold tracking-tight text-black dark:text-white">
                                MediQueue
                            </h2>
                        </div>

                        <p className="leading-relaxed text-gray-600 dark:text-gray-400 max-w-xs text-sm">
                            Book verified tutors instantly with a smooth, real-time booking interface. Start learning on your own schedule.
                        </p>
                    </div>

                    {/* Features/Tutors */}
                    <div>
                        <h3 className="font-semibold text-black dark:text-white mb-4">
                            Explore
                        </h3>
                        <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
                            <li>
                                <Link
                                    href="/tutors"
                                    className="hover:text-black dark:hover:text-white transition"
                                >
                                    Browse Tutors
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/add-tutor"
                                    className="hover:text-black dark:hover:text-white transition"
                                >
                                    Become a Tutor
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/tutors"
                                    className="hover:text-black dark:hover:text-white transition"
                                >
                                    Select Time Slots
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* User Portal / Resources */}
                    <div>
                        <h3 className="font-semibold text-black dark:text-white mb-4">
                            Dashboard
                        </h3>
                        <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
                            <li>
                                <Link
                                    href="/"
                                    className="hover:text-black dark:hover:text-white transition"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/my-tutor"
                                    className="hover:text-black dark:hover:text-white transition"
                                >
                                    My Tutors
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/my-booked-sessions"
                                    className="hover:text-black dark:hover:text-white transition"
                                >
                                    Booked Sessions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* CTA Block */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-black dark:text-white">
                            Start Learning
                        </h3>

                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Find and book a verified tutor today.
                        </p>

                        <Link
                            href="/tutors"
                            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full 
              bg-[#0B2F5B] text-white text-sm font-medium transition-all duration-200 
              hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-900/10"
                        >
                            Explore Tutors
                        </Link>
                    </div>
                </div>

                {/* Divider */}
                <div className="mt-12 h-px w-full bg-linear-to-r from-transparent via-gray-300 to-transparent dark:via-white/10" />

                {/* Bottom */}
                <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <p>© {new Date().getFullYear()} MediQueue. All rights reserved.</p>

                    <div className="flex items-center gap-6">
                        <Link
                            href="#"
                            className="hover:text-black dark:hover:text-white transition"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="#"
                            className="hover:text-black dark:hover:text-white transition"
                        >
                            Terms
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
