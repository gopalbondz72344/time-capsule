"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { unlockCapsule, fetchCapsuleRiddles, checkAnswer } from "@/lib/actions/capsule";

interface Riddle {
    riddle: string;
}

const Page = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get("id") || ""; // Ensure id is always a string

    const [riddles, setRiddles] = useState<Riddle[]>([]);
    const [userAnswer, setUserAnswer] = useState("");
    const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState("");
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        const loadRiddles = async () => {
            if (!id) return;
            try {
                const data = await fetchCapsuleRiddles(id) as Riddle[];
                setRiddles(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching riddles:", error);
                setRiddles([]);
            }
        };
        loadRiddles();
    }, [id]);

    const handleAnswerCheck = async () => {
        if (!riddles[currentRiddleIndex]) {
            setMessage("⚠️ No riddle found.");
            return;
        }

        try {
            const result = await checkAnswer(id, userAnswer);
            setMessage("");
            if (result?.message === "Correct answer!") {
                setScore((prev) => prev + 1);
                setMessage("✅ Correct answer! 🎉");

                if (score + 1 === riddles.length) {
                    setShowDialog(true);
                    await unlockCapsule(id, score + 1); // Pass `id` to unlockCapsule
                } else {
                    setCurrentRiddleIndex((prev) => prev + 1);
                    setUserAnswer("");
                }
            } else {
                setMessage("❌ Incorrect answer. Try again!");
            }
        } catch (error) {
            console.error("Error checking answer:", error);
            setMessage("❌ Error checking answer. Try again.");
        }
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
        router.push(`/capsules?id=${id}`); // Redirect after closing
    };

    return (
        <div className="flex flex-col items-center p-6 relative">
            <h1 className="text-2xl text-white font-bold mb-4">Riddle Game</h1>

            {riddles.length > 0 ? (
                <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md">
                    <p className="text-lg font-semibold mb-4">{riddles[currentRiddleIndex]?.riddle}</p>
                    <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
                        Score: {score}/{riddles.length}
                    </div>

                    <Input
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Enter your answer..."
                        className="mb-4"
                    />
                    <Button onClick={handleAnswerCheck} className="w-full mb-2">
                        Submit Answer
                    </Button>
                    {message && <Alert className="mt-4">{message}</Alert>}
                </div>
            ) : (
                <p className="text-white">Loading riddles...</p>
            )}

            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>🎉 Capsule Unlocked! 🎉</DialogTitle>
                    </DialogHeader>
                    <p className="text-center">
                        Congratulations! You have answered all riddles correctly!
                    </p>
                    <Button className="mt-4 w-full" onClick={handleCloseDialog}>
                        Close
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Page;
