"use client";
import { authClient } from "@/lib/auth-client";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { redirect } from "next/navigation";

export default function BookSession({ tutorName }) {

    const {
        data: session
    } = authClient.useSession()

    const user = session?.user;

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const bookSessionData = Object.fromEntries(formData.entries());
        bookSessionData.statusX = 'Confirmed';

        // console.log(bookSessionData);
        // const { data: tokenData } = await authClient.token();

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/book-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookSessionData),
        })

        const data = await res.json();
        // console.log("data:", data);
        if (data.insertedId) {
            redirect('/my-booked-sessions')
        }
    }

    return (
        <Modal>
            <Button
                className="h-14 rounded-2xl bg-[#0B2F5B] px-10 text-lg font-semibold text-white hover:opacity-90"
            >
                Book Session

            </Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading>Book Session</Modal.Heading>
                            <p className="mt-1.5 text-sm leading-5 text-muted">
                                Make changes to your profile here. Click save when you are done.
                            </p>
                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                                    <TextField className="w-full" name="name" type="text" defaultValue={user?.name}>
                                        <Label>Name</Label>
                                        <Input placeholder="Enter your name" />
                                    </TextField>
                                    <TextField className="w-full" name="email" type="email" defaultValue={user?.email}>
                                        <Label>Email</Label>
                                        <Input placeholder="Enter your email" />
                                    </TextField>
                                    <TextField className="w-full" name="phone" type="tel">
                                        <Label>Phone</Label>
                                        <Input placeholder="Enter your phone number" />
                                    </TextField>
                                    <TextField className="w-full" name="tutorname" defaultValue={tutorName}>
                                        <Label>Tutor Name</Label>
                                        <Input placeholder="Enter tutor name" />
                                    </TextField>

                                    <Modal.Footer>
                                        <Button type="submit" slot="close" className={'bg-[#0B2F5B]'}>Submit</Button>
                                    </Modal.Footer>
                                </form>
                            </Surface>
                        </Modal.Body>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}