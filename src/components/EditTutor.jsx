'use client'
import { authClient } from '@/lib/auth-client';
import { Button, Input, Label, TextField, Select, ListBox, Calendar, DateField, DatePicker, TextArea, Modal, Surface } from '@heroui/react';
import { redirect } from 'next/navigation';
import React from 'react';
import { CiEdit } from 'react-icons/ci';

const EditTutor = ({tutor}) => {

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const tutorData = Object.fromEntries(formData.entries());

        const { data: tokenData } = await authClient.token();

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-tutor/${tutor._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenData?.token}`
            },
            body: JSON.stringify(tutorData),
        })

        const data = await res.json();
        // console.log("data:", data);
        if (data.modifiedCount > 0) {
            redirect('/my-tutor')
        }
    }

    return (
        <Modal>
            <Button variant="outline"><CiEdit /></Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading>Edit your tutor</Modal.Heading>
                            
                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                                    <TextField className="w-full" defaultValue={tutor.name} name="name" type="text">
                                        <Label>Tutor Name</Label>
                                        <Input placeholder="John Doe" />
                                    </TextField>
                                    <TextField className="w-full" defaultValue={tutor.photo} name="photo" type="url">
                                        <Label>Photo</Label>
                                        <Input placeholder="Photo Url" />
                                    </TextField>

                                    <Select className="w-full" defaultValue={tutor.subject} name='subject' placeholder="Select one">
                                        <Label>Select a subject</Label>
                                        <Select.Trigger>
                                            <Select.Value />
                                            <Select.Indicator />
                                        </Select.Trigger>
                                        <Select.Popover>
                                            <ListBox>
                                                <ListBox.Item id="Math" textValue="Math">
                                                    Math
                                                    <ListBox.ItemIndicator />
                                                </ListBox.Item>
                                                <ListBox.Item id="Physics" textValue="Physics">
                                                    Physics
                                                    <ListBox.ItemIndicator />
                                                </ListBox.Item>
                                                <ListBox.Item id="English" textValue="English">
                                                    English
                                                    <ListBox.ItemIndicator />
                                                </ListBox.Item>
                                                <ListBox.Item id="Computer" textValue="Computer">
                                                    Computer
                                                    <ListBox.ItemIndicator />
                                                </ListBox.Item>
                                            </ListBox>
                                        </Select.Popover>
                                    </Select>

                                    <TextField className="w-full" defaultValue={tutor.daysandtime} name="daysandtime" type="text">
                                        <Label>Available Days and time</Label>
                                        <Input placeholder="Sun - Thu 5:00 PM - 8:00 PM" />
                                    </TextField>
                                    <TextField className="w-full" defaultValue={tutor.fee} name="fee" type="text">
                                        <Label>Hourly fee</Label>
                                        <Input placeholder="80" />
                                    </TextField>
                                    <TextField className="w-full" defaultValue={tutor.slot} name="slot" type="text">
                                        <Label>Total slot</Label>
                                        <Input placeholder="10" />
                                    </TextField>

                                    <DatePicker className="w-full" name="date">
                                        <Label>Session Start Date</Label>
                                        <DateField.Group fullWidth>
                                            <DateField.Input defaultValue={tutor.date}>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
                                            <DateField.Suffix>
                                                <DatePicker.Trigger>
                                                    <DatePicker.TriggerIndicator />
                                                </DatePicker.Trigger>
                                            </DateField.Suffix>
                                        </DateField.Group>
                                        <DatePicker.Popover>
                                            <Calendar aria-label="Event date">
                                                <Calendar.Header>
                                                    <Calendar.YearPickerTrigger>
                                                        <Calendar.YearPickerTriggerHeading />
                                                        <Calendar.YearPickerTriggerIndicator />
                                                    </Calendar.YearPickerTrigger>
                                                    <Calendar.NavButton slot="previous" />
                                                    <Calendar.NavButton slot="next" />
                                                </Calendar.Header>
                                                <Calendar.Grid>
                                                    <Calendar.GridHeader>
                                                        {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                                                    </Calendar.GridHeader>
                                                    <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
                                                </Calendar.Grid>
                                                <Calendar.YearPickerGrid>
                                                    <Calendar.YearPickerGridBody>
                                                        {({ year }) => <Calendar.YearPickerCell year={year} />}
                                                    </Calendar.YearPickerGridBody>
                                                </Calendar.YearPickerGrid>
                                            </Calendar>
                                        </DatePicker.Popover>
                                    </DatePicker>

                                    <TextField className="w-full" defaultValue={tutor.institution} name="institution" type="text">
                                        <Label>Institution</Label>
                                        <Input placeholder="MIT" />
                                    </TextField>

                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="textarea-rows-3">Experience</Label>
                                        <TextArea
                                            aria-label="Short Description about experience"
                                            id="textarea-rows-3"
                                            placeholder="3 years teaching experience"
                                            rows={3}
                                            defaultValue={tutor.experience}
                                            name='experience'
                                        />
                                    </div>

                                    <TextField className="w-full" defaultValue={tutor.location} name="location">
                                        <Label>Location (Area/City)</Label>
                                        <Input placeholder="Massachuasets" />
                                    </TextField>

                                    <Select className="w-full" defaultValue={tutor.mode} name='mode' placeholder="Select one">
                                        <Label>Teaching Mode</Label>
                                        <Select.Trigger>
                                            <Select.Value />
                                            <Select.Indicator />
                                        </Select.Trigger>
                                        <Select.Popover>
                                            <ListBox>
                                                <ListBox.Item id="online" textValue="Online">
                                                    Online
                                                    <ListBox.ItemIndicator />
                                                </ListBox.Item>
                                                <ListBox.Item id="offline" textValue="Offline">
                                                    Offline
                                                    <ListBox.ItemIndicator />
                                                </ListBox.Item>
                                                <ListBox.Item id="both" textValue="Both">
                                                    Both
                                                    <ListBox.ItemIndicator />
                                                </ListBox.Item>
                                            </ListBox>
                                        </Select.Popover>
                                    </Select>

                                    <div className="flex gap-2">
                                        <Button type="submit" slot="close" className={'bg-[#0B2F5B]'}>
                                            Save
                                        </Button>
                                    </div>
                                </form>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default EditTutor;