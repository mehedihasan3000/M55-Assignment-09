'use client'
import { authClient } from '@/lib/auth-client';
import { Button } from '@heroui/react';
import { redirect } from 'next/navigation';
import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

const DeleteTutor = ({id}) => {

    const handleDelete = async () => {
            const {data: tokenData} = await authClient.token();
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-tutor/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenData?.token}`
                }
            })
            const data = await res.json();
            console.log("data", data);
            if (data.deletedCount > 0) {
                redirect('/my-tutor')
            }
        }

    return (
        <div>
            <Button onClick={handleDelete} variant='danger-soft' size='sm'><FaRegTrashAlt /></Button>
        </div>
    );
};

export default DeleteTutor;