'use client'
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import React from 'react';

const ProfilePage = () => {

    const {
        data: session
    } = authClient.useSession()

    const user = session?.user;

    return (
        <div className='max-w-xl mx-auto border border-s border-gray-500 rounded-xl p-10 mt-5 flex justify-center items-center flex-col gap-2'>
            <h1 className='text-2xl font-bold mb-5'>My Profile</h1>
            <Image src={user?.image} alt={user?.name} width={100} height={100} className='rounded-full' />
            <p className='text-lg mt-5'>Name: {user?.name}</p>
            <p className='text-lg mt-5'>Email: {user?.email}</p>
        </div>
    );
};

export default ProfilePage;