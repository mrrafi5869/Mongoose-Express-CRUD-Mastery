import { z } from "zod";

const fullNameValidationSchema = z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3)
});

const addressValidationSchema = z.object({
    street: z.string().min(2),
    city: z.string().min(2),
    country: z.string().min(3)
})

const userValidationSchema = z.object({
    userId: z.number().min(1),
    username: z.string().min(3),
    password: z.string().min(5).max(20),
    fullName: fullNameValidationSchema,
    age: z.number(),
    email: z.string().email(),
    isActive: z.boolean().default(true),
    hobbies: z.string().array(),
    address: addressValidationSchema,
    isDelete: z.boolean().default(false)
});

export default userValidationSchema;