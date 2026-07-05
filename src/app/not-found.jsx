import { Button } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

const NotFoundPage = () => {
    return (
        <div className='text-center mt-7 space-y-3'>
            <h1 className='text-2xl font-bold'>Page Not Found!</h1>
            <Link href={'/'}>
                <Button size='sm' className={'bg-[#0B2F5B]'}>Back to Home</Button>
            </Link>
        </div>
    );
};

export default NotFoundPage;