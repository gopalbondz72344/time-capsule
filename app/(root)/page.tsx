import { auth } from "@/auth";
import { getLockedCapsules, getUnLockedCapsules } from "@/lib/actions/capsule";
import { dateConverter } from "@/lib/utils";
import CapsuleTabs from "@/components/CapsuleTabs";
import AddCapsuleBtn from "@/components/AddCapsuleBtn";

export default async function Home() {
    const session = await auth();
    const email = session?.user?.email ?? "IN";
    const lockedData = await getLockedCapsules(email);
    const unlockedData = await getUnLockedCapsules(email);

    const updatedLockedCapsules = lockedData.map((capsule: any) => ({
        ...capsule,
        createdDate: dateConverter(capsule.createdAt),
    }));

    const updatedUnlockedCapsules = unlockedData.map((capsule: any) => ({
        ...capsule,
        createdDate: dateConverter(capsule.createdAt),
    }));

    return (
        <div className="min-h-screen bg-dark-300 p-6 text-white">
            {/* Centered Add Capsule Button */}
            <div className="flex justify-center mb-6">
                <AddCapsuleBtn extraClass="w-48 h-12 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition" />
            </div>

            {/* Capsule Tabs (Client Component) */}
            <CapsuleTabs lockedCapsules={updatedLockedCapsules} unlockedCapsules={updatedUnlockedCapsules} />
        </div>
    );
}
