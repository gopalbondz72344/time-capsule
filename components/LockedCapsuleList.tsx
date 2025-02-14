'use client';

import Link from "next/link";
import AddCapsuleBtn from "@/components/AddCapsuleBtn";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { countdownTimer } from "@/lib/utils"; // Import the countdown timer

export default function LockedCapsuleList({ capsules }: { capsules: any[] }) {
    const [updatedCapsules, setUpdatedCapsules] = useState<any[]>(capsules);

    // Handle countdown updates every second
    useEffect(() => {
        const interval = setInterval(() => {
            setUpdatedCapsules(prevCapsules => {
                return prevCapsules.map(capsule => ({
                    ...capsule,
                    countdown: countdownTimer(capsule.endDate), // Update countdown every second
                }));
            });
        }, 1000); // Updates every second

        return () => clearInterval(interval); // Clean up on unmount
    }, [capsules]); // Re-run effect when capsules data changes
    return (
        <div className="capsule-list-container">
            <div className="capsule-list-title flex justify-end items-center">
                <AddCapsuleBtn />
            </div>
            <ul className="capsule-ul">
                {updatedCapsules.length > 0 ? (
                    updatedCapsules.map(({ id, name, createdDate, countdown }: any) => (
                        <li key={id} className="capsule-list-item">
                            <Link href={`/capsules?id=${id}`} className="flex flex-1 items-center gap-4">
                                <div className="rounded-md bg-dark-500 p-2 sm:block">
                                    <Image
                                        src="/assets/time-capsule.svg"
                                        alt="file"
                                        width={100}
                                        height={100}
                                    />
                                </div>
                                <div className="space-y-2 p-3 bg-dark-400 rounded-lg shadow-md">
                                    <h3 className="text-lg font-semibold text-white truncate">{name}</h3>
                                    <p className="text-sm text-gray-400">
                                        Created <span className="font-medium text-blue-300">
                                            {createdDate}
                                        </span>
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        Capsule is Locked until <span className="font-medium text-green-300">
                                            {countdown || 'Calculating...'}
                                        </span>
                                    </p>
                                </div>
                            </Link>
                        </li>
                    ))
                ) : (
                    <p className="text-white text-center mt-4">No capsules found.</p>
                )}
            </ul>
        </div>
    );
}
