"use server";

import { db } from "@/database/drizzle";
import { eq,and} from "drizzle-orm";
import { capsules } from "@/database/schema";
import fuzzy from "fuzzy";
import {CreateCapsule, Riddle} from "@/type";
import config from "@/lib/config";
import {auth} from "@/auth";

// function to unlock the capsules on the endDate
const unlockCapsules = async () => {
    try {
        const today = new Date().toISOString().split("T")[0];

        // Find all capsules that are still LOCKED and need to be unlocked
        const lockedCapsules = await db
            .select()
            .from(capsules)
            .where(and(eq(capsules.status, "LOCKED"), eq(capsules.endDate, today)));

        for (const capsule of lockedCapsules) {
            await db.update(capsules)
                .set({ status: "UNLOCKED" })
                .where(eq(capsules.id, capsule.id));

            console.log(`Capsule ${capsule.id} unlocked.`);
        }
    } catch (error) {
        console.error("Error unlocking capsules:", error);
    }
};

setInterval(unlockCapsules, 24 * 60 * 60 * 1000);

// function to unlock capsule if the user passes the riddles quiz
export const unlockCapsule = async (id: string, score: number) => {
    if (score === 5) {
        try {
            const updatedCapsule = await db
                .update(capsules)
                .set({ status: "UNLOCKED" })
                .where(eq(capsules.id, id)); // Update only the capsule with matching id

            console.log(`Capsule unlocked: ${updatedCapsule}`);
            return { message: "Capsule unlocked!" };
        } catch (error) {
            console.error("Error unlocking capsule:", error);
            throw new Error("Failed to unlock capsule");
        }
    } else {
        return { message: "Score must be 5/5 to unlock the capsule" };
    }
};

// Function to fetch riddles
export const fetchRiddles = async (count: number) => {
    try {
        const response = await fetch(`${config.env.riddlesUrl}/riddles?count=${count}`);
        return response.json();
    } catch (error) {
        console.error("Error fetching riddles:", error);
        return [];
    }
};

// Function to fetch Riddles of particular capsule
export const fetchCapsuleRiddles = async (id: string): Promise<Riddle[]> => {
    try {
        const capsule = await db
            .select()
            .from(capsules)
            .where(eq(capsules.id, id))
            .limit(1);

        if (!capsule.length) {
            throw new Error("No Capsule found");
        }

        const storedRiddles = capsule[0].riddles as Riddle[]; // Ensure proper type

        if (!Array.isArray(storedRiddles)) {
            throw new Error("Invalid riddle data format");
        }

        return storedRiddles;
    } catch (error) {
        console.error("Error fetching capsule riddles:", error);
        return []; // Ensure function always returns an array
    }
};

// Checking the answer of that riddle using fuzzy matching
export const checkAnswer = async (id: string, userAnswer: string) => {
    try {
        const capsule = await db
            .select()
            .from(capsules)
            .where(eq(capsules.id, id))
            .limit(1);

        if (!capsule.length) {
            throw new Error("No Capsule found");
        }

        const storedRiddles = capsule[0].riddles; // Assuming `riddles` is a JSON field

        if (!Array.isArray(storedRiddles)) {
            throw new Error("Invalid riddles format");
        }

        // Extract stored answers
        const storedAnswers = storedRiddles.map(r => r.answer.toLowerCase().trim());

        // Perform fuzzy matching
        const fuzzyMatch = fuzzy.filter(userAnswer.toLowerCase().trim(), storedAnswers);
        const matchedAnswer = fuzzyMatch.length ? fuzzyMatch[0].string : null;

        return matchedAnswer
            ? { message: "Correct answer!" }
            : { message: "Incorrect answer!" };
    } catch (error) {
        console.error("Error checking answer:", error);
        return { message: "Error checking answer" };
    }
};


// Function to create a new capsule
export const createCapsule = async (params: CreateCapsule) => {
    try {
        const session = await auth();
        const email = session?.user?.email;

        if (!email) {
            return {
                success: false,
                message: "User is not authenticated",
            };
        }

        const endDate = params.endDate ? new Date(params.endDate).toISOString() : new Date().toISOString();
        const createdAt = new Date().toISOString(); // Get current date/time

        const ImageUpload = Array.isArray(params.ImageUpload) ? params.ImageUpload : [];
        const VideoUpload = Array.isArray(params.VideoUpload) ? params.VideoUpload : [];
        const riddles = await fetchRiddles(5);

        const [newCapsule] = await db
            .insert(capsules)
            .values({
                name: params.name,
                userEmail: email, // Ensure correct column name
                endDate,
                createdAt,
                status: "LOCKED", // New capsules start as LOCKED
                ImageUpload: JSON.stringify(ImageUpload), // Store as JSON
                VideoUpload: JSON.stringify(VideoUpload), // Store as JSON
                riddles: JSON.stringify(riddles), // Store as JSON
            })
            .returning(); // Return all fields

        return {
            success: true,
            data: newCapsule,
        };
    } catch (error) {
        console.error("Error creating capsule:", error);
        return {
            success: false,
            message: "An error occurred while creating the capsule",
        };
    }
};

// Function for getting capsules of that particular user using email
export const getLockedCapsules = async (email: string) => {
    try {
        if (!email) {
            throw new Error("Unauthorized: No email provided.");
        }

        const result = await db
            .select()
            .from(capsules)
            .where(and(eq(capsules.status, "LOCKED"), eq(capsules.userEmail, email))) // Filter by status and user email
            .orderBy(capsules.endDate);

        return result;
    } catch (error) {
        console.error("Error fetching locked capsules:", error);
        throw new Error("Failed to retrieve locked capsules.");
    }
};

export const getUnLockedCapsules = async (email: string) => {
    try {
        if (!email) {
            throw new Error("Unauthorized: No email provided.");
        }

        const result = await db
            .select()
            .from(capsules)
            .where(and(eq(capsules.status, "UNLOCKED"), eq(capsules.userEmail, email))) // Filter by status and user email
            .orderBy(capsules.endDate);

        return result;
    } catch (error) {
        console.error("Error fetching unlocked capsules:", error);
        throw new Error("Failed to retrieve unlocked capsules.");
    }
};

// Function for getting capsule details by using id
export const getCapsuleById = async (id: any) => {
    try {
        if (!id) throw new Error("No ID provided.");

        const result = await db
            .select()
            .from(capsules)
            .where(eq(capsules.id, id))
            .limit(1);

        return result[0] || null; // Return capsule or null if not found
    } catch (error) {
        console.error("Error fetching capsule by ID:", error);
        throw new Error("Failed to retrieve capsule.");
    }
};

