'use client'
import { useState } from "react";
import { Link, Button, Avatar } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const router = useRouter();

    const {
        data: session
    } = authClient.useSession()

    const user = session?.user;
    // console.log('user:', user)

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/");
                },
            },
        });
    }

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
            <header className="mx-auto flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                    >
                        <span className="sr-only">Menu</span>
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                    <div className="flex items-center gap-3">
                        {/* <Logo /> */}
                        <p className="font-bold">MediQueue</p>
                    </div>
                </div>
                <ul className="hidden items-center gap-5 md:flex">
                    <li>
                        <Link className="no-underline" href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/tutors" className="no-underline">
                            Tutors
                        </Link>
                    </li>
                    {user &&
                        <>
                            <li>
                                <Link href="/add-tutor" className="no-underline">Add Tutor</Link>
                            </li>
                            <li>
                                <Link href="/my-tutor" className="no-underline">My Tutors</Link>
                            </li>
                            <li>
                                <Link href="/my-booked-sessions" className="no-underline">My Booked Sessions</Link>
                            </li>
                        </>
                    }

                </ul>
                <ul className='flex items-center gap-3'>
                    { user && <li><Link href={'/profile'} className={'no-underline'}>Profile</Link></li> }
                    <>
                        {
                            user ?
                                <>
                                    <Link href={'/profile'}><Avatar>
                                        <Avatar.Image alt={user?.name} src={user?.image} referrerPolicy='no-referrer' />
                                        <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                                    </Avatar></Link>
                                    <Button onClick={handleSignOut} variant='danger' className={'rounded-none'}>Logout</Button>
                                </>
                                :
                                <>
                                    <li><Link href={'/login'} className={'no-underline'}>Login</Link></li>
                                    <li><Link href={'/register'} className={'no-underline'}>Register</Link></li>
                                </>
                        }
                    </>
                </ul>

            </header>
            {isMenuOpen && (
                <div className="border-t border-separator md:hidden">
                    <ul className="flex flex-col gap-2 p-4">
                        <li>
                            <Link href="#" className="block py-2 no-underline">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="block py-2 no-underline">
                                Tutors
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="block py-2 no-underline">
                                Pricing
                            </Link>
                        </li>
                        <li className="mt-4 flex flex-col gap-2 border-t border-separator pt-4">
                            <Link href="#" className="block py-2 no-underline">
                                Login
                            </Link>
                            <Button className="w-full">Sign Up</Button>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}