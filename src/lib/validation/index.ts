import { z } from "zod"

export const SignupValidation = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    Registration_No: z.string().min(7, { message: "Registration No must be at least 2 characters." }),
    email: z.string().email({message:"Should be a valid email address"}),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
})
export const SignInValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
})