import { z } from "zod";

export const signUpSchema = z
    .object({
        fullName: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(8),
    })

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export const CreateCapsuleSchema = z.object({
    name: z.string().min(10),
    endDate: z.string().min(8), // Ensure the end date is properly validated
    ImageUpload: z.array(z.string()),
    VideoUpload: z.array(z.string()),
    riddles: z.array(z.string()),
});

