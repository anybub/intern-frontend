import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupValidation } from "@/lib/validation";
import { z } from "zod";
import { Link } from "react-router-dom";
import Loader from "@/components/shared/Loader";
import axios from "axios";
import { useState } from "react";

const SignupForm = () => {
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 1. Define your form.
    const form = useForm<z.infer<typeof SignupValidation>>({
        resolver: zodResolver(SignupValidation),
        defaultValues: {
            name: "",
            Registration_No: "",
            email: "",
            password: "",
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof SignupValidation>) {
        setIsCreatingAccount(true);
        setError(null);

        try {
            // Replace with your actual endpoint
            const response = await axios.post("/api/signup", values);

            console.log(response.data); // Handle successful response as needed

            // Optionally, redirect or show a success message
        } catch (error) {
            console.error(error);
            setError(
                "An error occurred while creating your account. Please try again."
            );
        } finally {
            setIsCreatingAccount(false);
        }
    }

    return (
        <Form {...form}>
            <div className="sm:w-420 flex-center flex-col">
                <img
                    className="bg-light-2 rounded-full"
                    src="/assets/National_Institute_Of_Technology_Silchar_Logo.png"
                    alt="logo"
                    height={100}
                    width={100}
                />
                <h3 className="h3-bold pt-2">Create a new account</h3>
                <p className="text-light-4 small-regular md:base-regular mt-2">
                    Please enter your details
                </p>

                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-3 w-full mt-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="shad-form_label">
                                    Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        className="shad-input"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="Registration_No"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="shad-form_label">
                                    Registration No.
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        className="shad-input"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="shad-form_label">
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        className="shad-input"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="shad-form_label">
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        className="shad-input"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="shad-button_primary">
                        {isCreatingAccount ? (
                            <div className="flex-center gap-2">
                                <Loader /> Loading...
                            </div>
                        ) : (
                            "Sign Up"
                        )}
                    </Button>

                    {error && (
                        <p className="text-red-500 text-center mt-2">{error}</p>
                    )}

                    <p className="text-small-regular text-light-2 text-center mt-2">
                        Already have an account?
                        <Link
                            to="/sign-in"
                            className="text-primary-600 text-small-semibold ml-1">
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </Form>
    );
};

export default SignupForm;
