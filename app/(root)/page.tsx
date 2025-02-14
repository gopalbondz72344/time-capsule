import { auth } from "@/auth";
import {getLockedCapsules, getUnLockedCapsules} from "@/lib/actions/capsule";
import { dateConverter } from "@/lib/utils"; // Only need date conversion here
import LockedCapsuleList from "@/components/LockedCapsuleList"; // CapsuleList will handle countdown logic
import UnLockedCapsuleList from "@/components/UnLockedCapsuleList";

export default async function Home() {
    // Fetching data on the server-side using `async/await`
    const session = await auth();
    const email = session?.user?.email ?? "IN";
    const lockedData = await getLockedCapsules(email);
    const unlockedData = await getUnLockedCapsules(email);

    // Updating capsules data with converted dates
    const updatedLockedCapsules = lockedData.map((capsule: any) => ({
        ...capsule,
        createdDate: dateConverter(capsule.createdAt),
        // No countdown logic here, handled in CapsuleList
    }));

    const updatedUnlockedCapsules = unlockedData.map((capsule: any) => ({
        ...capsule,
        createdDate: dateConverter(capsule.createdAt),
    }))
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-screen bg-dark-300 p-6 text-white">
            <div className="bg-dark-800 p-4 rounded-lg shadow-md overflow-auto">
                <h2 className="text-xl font-semibold mb-4">Locked Capsules</h2>
                <LockedCapsuleList capsules={updatedLockedCapsules}/>
            </div>
            <div className="bg-dark-800 p-4 rounded-lg shadow-md overflow-auto">
                <h2 className="text-xl font-semibold mb-4">Unlocked Capsules</h2>
                <UnLockedCapsuleList capsules={updatedUnlockedCapsules}/>
            </div>
        </div>
    );
}
