"use client";
import { authClient } from "@/lib/auth-client";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const tutorData = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signUp.email({
            ...tutorData
        }, {
            onRequest: (ctx) => {
                //show loading
            },
            onSuccess: (ctx) => {
                redirect('/')
            },
            onError: (ctx) => {
                // display the error message
                alert(ctx.error.message);
            },
        });
    };

    const signIn = async () => {
        await authClient.signIn.social({
            provider: "google",
        });
    };

    return (
        <Form className="flex max-w-xl mx-auto flex-col gap-4 p-2 mt-7" onSubmit={onSubmit}>
            <TextField
                isRequired
                name="name"
                validate={(value) => {
                    if (value.length < 3) {
                        return "Name must be at least 3 characters";
                    }
                    return null;
                }}
            >
                <Label>Name</Label>
                <Input placeholder="John Doe" />
                <FieldError />
            </TextField>
            <TextField name="image" type="url">
                <Label>Photo</Label>
                <Input placeholder="Photo Url" />
                <FieldError />
            </TextField>
            <TextField
                isRequired
                name="email"
                type="email"
                validate={(value) => {
                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                        return "Please enter a valid email address";
                    }

                    return null;
                }}
            >
                <Label>Email</Label>
                <Input placeholder="john@example.com" />
                <FieldError />
            </TextField>

            <TextField
                isRequired
                minLength={8}
                name="password"
                type="password"
                validate={(value) => {
                    if (value.length < 8) {
                        return "Password must be at least 8 characters";
                    }
                    if (!/[A-Z]/.test(value)) {
                        return "Password must contain at least one uppercase letter";
                    }
                    if (!/[0-9]/.test(value)) {
                        return "Password must contain at least one number";
                    }

                    return null;
                }}
            >
                <Label>Password</Label>
                <Input placeholder="Enter your password" />
                <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                <FieldError />
            </TextField>

            <div className="flex gap-2">
                <Button
                    type="submit"
                    fullWidth
                    size="sm"
                    radius="lg"
                    className="bg-[#0B2F5B] text-white font-semibold h-10 mt-2"
                >
                    Create Account
                </Button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
                <div className="h-px flex-1 bg-[#263042]" />
                <span className="text-sm text-gray-500">OR</span>
                <div className="h-px flex-1 bg-[#263042]" />
            </div>

            {/* Google Button */}
            <Button
                onClick={signIn}
                fullWidth
                variant="outline"
                radius="lg"
                className="h-10"
            >
                <FcGoogle />
                Continue with Google
            </Button>

            {/* Login Link */}
            <p className="mt-6 text-center text-gray-400">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="text-[#3B82F6] hover:underline"
                >
                    Login
                </Link>
            </p>
        </Form>
    );
}