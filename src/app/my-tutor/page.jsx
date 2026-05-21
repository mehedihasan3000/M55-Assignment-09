import DeleteTutor from '@/components/DeleteTutor';
import EditTutor from '@/components/EditTutor';
import { Button, Table } from '@heroui/react';
import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

export const dynamic = 'force-dynamic';

const MyTutors = async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors`);
    const allTutors = await res.json();
    // console.log(allTutors)



    return (
        <Table variant="secondary">
            <Table.ScrollContainer>
                <Table.Content aria-label="Team members" className="min-w-150">
                    <Table.Header>
                        <Table.Column isRowHeader>Tutor Name</Table.Column>
                        <Table.Column>Subject</Table.Column>
                        <Table.Column>Available</Table.Column>
                        <Table.Column>Hourly Fee</Table.Column>
                        <Table.Column>Total Slot</Table.Column>
                        <Table.Column>Registration Date</Table.Column>
                        <Table.Column>Action</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {
                            allTutors.map(item => <Table.Row key={item._id}>
                                <Table.Cell>{item.name}</Table.Cell>
                                <Table.Cell>{item.subject}</Table.Cell>
                                <Table.Cell>{item.slot}</Table.Cell>
                                <Table.Cell>{item.fee}</Table.Cell>
                                <Table.Cell>{item.slot}</Table.Cell>
                                <Table.Cell>{item.daysandtime}</Table.Cell>
                                <Table.Cell className={'flex items-center gap-1.5'}>
                                    <DeleteTutor id={item._id} />
                                    <EditTutor tutor={item} />

                                </Table.Cell>
                            </Table.Row>)
                        }


                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    );
};

export default MyTutors;