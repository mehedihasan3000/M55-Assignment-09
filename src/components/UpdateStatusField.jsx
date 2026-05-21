'use client'
import { authClient } from '@/lib/auth-client';
import { Button } from '@heroui/react';
import { redirect } from 'next/navigation';
import React from 'react';

const UpdateStatusField = ({ id }) => {

    const {
        data: session
    } = authClient.useSession()

    const user = session?.user;

    const handleStatusChange = async () => {
        // e.preventDefault();
        // const formData = new FormData(e.currentTarget);
        // const tutorData = Object.fromEntries(formData.entries());

        // const { data: tokenData } = await authClient.token();



        const tutorData = {
            statusX: "Cancelled",
            name: user?.name,
            email: user?.email
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/book-session/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tutorData),
        })

        const data = await res.json();
        console.log("data:", data);
        if (data.modifiedCount > 0) {
            redirect('/my-booked-sessions')
        }
    }

    return (
        <div>
            <Button size="sm" color="danger" variant="danger-soft" onClick={handleStatusChange}>X</Button>
        </div>
    );
};

export default UpdateStatusField;