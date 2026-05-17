import Image from "next/image";
import { Button, Card } from "@heroui/react";
import Link from "next/link";

export default function TutorCard({ tutor }) {

    const { _id, name, photo, subject, daysandtime, fee, date } = tutor;

    return (
        <Card className="border border-gray-200 bg-[#f5f5f5] shadow-md">
            {/* Image */}
            <div className="overflow-hidden rounded-[24px]">
                <Image
                    src={photo}
                    alt={name}
                    width={600}
                    height={400}
                    className="h-65 w-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="mt-5">
                <h2 className="text-xl font-bold text-black">
                    {name}
                </h2>

                <p className="mt-1.5 text-lg text-gray-500">
                    {subject}
                </p>

                <div className="mt-4 space-y-2 text-black">
                    <p>
                        Available: {daysandtime}
                    </p>

                    <p>
                        Session Start Date: {date}
                    </p>

                    <p>
                        Fee: {fee}
                    </p>
                </div>

                {/* Button */}
                <Link href={`/tutors/${_id}`}>
                    <Button
                        className="mt-6 h-12 w-full rounded-2xl bg-[#0B2F5B] text-lg font-medium text-white hover:opacity-90"
                    >
                        Book Session
                    </Button>
                </Link>
            </div>
        </Card>
    );
}