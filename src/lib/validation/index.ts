import { z } from "zod";

export const SignupValidation = z.object({
    name: z.string().min(1, "Name is required"),
    Registration_No: z.string().min(1, "Registration No. is required"),
    email: z
        .string()
        .email("Invalid email address")
        .refine((val) => val.endsWith("nits.ac.in"), {
            message: "Invalid email address. Must be a NITS email.",
        }),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const SignInValidation = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters." }),
});
// src/lib/validation.ts

export const ElectionValidation = z.object({
    name: z.string().min(1, { message: "Election name is required." }),
    post: z.enum(["GS", "VP", "TS", "CR"], { message: "Invalid post value." }),
    startTime: z.string().refine(
        (val) => {
            const now = new Date();
            const start = new Date(val);
            return start > now;
        },
        { message: "Start time must be in the future." }
    ),
    endTime: z.string().refine(
        (val) => {
            const start = new Date();
            const end = new Date(val);
            return end > start;
        },
        { message: "End time must be after start time." }
    ),
});
