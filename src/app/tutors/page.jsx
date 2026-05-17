import TutorCard from '@/components/TutorCard';
import React from 'react';

const AllTutorsPage = async () => {

    const res = await fetch('http://localhost:8000/tutors');
    const tutors = await res.json();
    console.log(tutors);

    return (
        <div className='grid grid-cols-3 gap-7'>
            {
                tutors.map(tutor => <TutorCard key={tutor._id} tutor={tutor} />)
            }
        </div>
    );
};

export default AllTutorsPage;