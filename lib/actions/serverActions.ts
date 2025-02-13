// lib/actions/serverActions.ts

"use server";

import { signOut } from "@/auth";

// Server-side action to handle sign out
export const handleSignOut = async () => {
    await signOut();
};
