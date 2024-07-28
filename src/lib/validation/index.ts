import { z } from "zod";

export const SignupValidation = z.object({
    username: z.string().min(1, "Name is required"),
    scholarId: z.string().min(7, "Scholar ID must be 7 characters long").max(7, "Scholar ID must be 7 characters long"),
    email: z
        .string()
        .email("Invalid email address")
        .refine((val) => val.endsWith("nits.ac.in"), {
            message: "Invalid email address. Must be a NITS email.",
        }),
    password: z.string().min(8, "Password must be at least 6 characters long"),
    branch: z.enum(["CSE", "ECE", "ME", "CE", "EEE", "CHE", "MME", "CIVIL", "ARCHI"], {
        message: "Invalid branch value.",
    }),
    address: z.string().min(1, "Address is required"),
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
