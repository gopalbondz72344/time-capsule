"use client";

import { useState } from "react";
import LockedCapsuleList from "@/components/LockedCapsuleList";
import UnLockedCapsuleList from "@/components/UnLockedCapsuleList";

export default function CapsuleTabs({ lockedCapsules, unlockedCapsules }: any) {
    const [activeTab, setActiveTab] = useState("locked");

    return (
        <div>
            {/* Tabs Navigation */}
            <div className="flex justify-center border-b border-gray-700">
                <button
                    className={`px-6 py-3 text-lg font-semibold transition-all ${
                        activeTab === "locked" ? "border-b-4 border-blue-500 text-blue-400" : "text-gray-400 hover:text-gray-300"
                    }`}
                    onClick={() => setActiveTab("locked")}
                >
                    Locked Capsules
                </button>
                <button
                    className={`px-6 py-3 text-lg font-semibold transition-all ${
                        activeTab === "unlocked" ? "border-b-4 border-blue-500 text-blue-400" : "text-gray-400 hover:text-gray-300"
                    }`}
                    onClick={() => setActiveTab("unlocked")}
                >
                    Unlocked Capsules
                </button>
            </div>

            {/* Capsule List Display */}
            <div className="mt-6 p-4 bg-dark-800 rounded-lg shadow-md overflow-y-auto max-h-[80vh]">
                {activeTab === "locked" ? (
                    <>
                        <h2 className="text-xl font-semibold mb-4 text-center">Locked Capsules</h2>
                        <LockedCapsuleList capsules={lockedCapsules} />
                    </>
                ) : (
                    <>
                        <h2 className="text-xl font-semibold mb-4 text-center">Unlocked Capsules</h2>
                        <UnLockedCapsuleList capsules={unlockedCapsules} />
                    </>
                )}
            </div>
        </div>
    );
}
