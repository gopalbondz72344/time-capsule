"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";
import {AuthCredentials} from "@/type";

export const signInWithCredentials = async (
    params: Pick<AuthCredentials, "email" | "password">,
) => {
    const { email, password } = params;
    try {
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
        if (result?.error) {
            return { success: false, error: result.error };
        }
        return { success: true };
    } catch (error) {
        console.log(error, "SignIn error");
        return { success: false, error: "Signin error" };
    }
};


export const signUp = async (params: AuthCredentials) => {
    const { fullName, email, password } = params;
    const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

    if (existingUser.length > 0) {
        return { success: false, error: "User already exists" };
    }
    const hashedPassword = await hash(password, 10);

    try {
        await db.insert(users).values({
            fullName,
            email,
            password: hashedPassword,
        });
        await signInWithCredentials({ email, password });
        return { success: true };
    } catch (error) {
        console.log(error, "SignUp error");
        return { success: false, error: "SignUp error" };
    }
};

export const getUserDetails = async (email: string) => {
    try {
        const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
        return user.length > 0 ? user[0] : null; // Return the first user or null if not found
    } catch (error) {
        console.error("Error fetching user details:", error);
        return null;
    }
};
