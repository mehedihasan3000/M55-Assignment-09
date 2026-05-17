'use client'
import { Button, Input, Label, TextField, Select, ListBox, Calendar, DateField, DatePicker, TextArea } from '@heroui/react';
import React from 'react';

const AddTutorPage = () => {

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const tutorData = Object.fromEntries(formData.entries());

        const res = await fetch('http://localhost:8000/add-tutor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tutorData)
        })

        const data = await res.json();
        console.log(data);
    };

    return (
        <div className='max-w-xl mx-auto my-10'>
            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                <TextField className="w-full" name="name" type="text">
                    <Label>Tutor Name</Label>
                    <Input placeholder="John Doe" />
                </TextField>
                <TextField className="w-full" name="photo" type="url">
                    <Label>Photo</Label>
                    <Input placeholder="Photo Url" />
                </TextField>

                <Select className="w-full" placeholder="Select one">
                    <Label>Select a subject</Label>
                    <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                        <ListBox>
                            <ListBox.Item id="math" textValue="Math">
                                Math
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="physics" textValue="Physics">
                                Physics
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="english" textValue="English">
                                English
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="computer" textValue="Computer">
                                Computer
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                        </ListBox>
                    </Select.Popover>
                </Select>

                <TextField className="w-full" name="daysandtime" type="text">
                    <Label>Available Days and time</Label>
                    <Input placeholder="Sun - Thu 5:00 PM - 8:00 PM" />
                </TextField>
                <TextField className="w-full" name="fee" type="text">
                    <Label>Hourly fee</Label>
                    <Input placeholder="80" />
                </TextField>
                <TextField className="w-full" name="slot" type="text">
                    <Label>Total slot</Label>
                    <Input placeholder="10" />
                </TextField>

                <DatePicker className="w-full" name="date">
                    <Label>Session Start Date</Label>
                    <DateField.Group fullWidth>
                        <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
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

                <TextField className="w-full" name="institution" type="text">
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
                    />
                </div>

                <TextField className="w-full" name="location">
                    <Label>Location (Area/City)</Label>
                    <Input placeholder="Massachuasets" />
                </TextField>

                <Select className="w-full" placeholder="Select one">
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
                        Submit
                    </Button>
                    <Button type="reset" slot="close" variant="outline">
                        Reset
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddTutorPage;