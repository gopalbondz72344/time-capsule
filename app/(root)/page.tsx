import { auth } from "@/auth";
import { getCapsules } from "@/lib/actions/capsule";
import { dateConverter } from "@/lib/utils"; // Only need date conversion here
import CapsuleList from "@/components/CapsuleList"; // CapsuleList will handle countdown logic

export default async function Home() {
    // Fetching data on the server-side using `async/await`
    const session = await auth();
    const email = session?.user?.email ?? "IN";
    const data = await getCapsules(email);

    // Updating capsules data with converted dates
    const updatedCapsules = data.map((capsule: any) => ({
        ...capsule,
        createdDate: dateConverter(capsule.createdAt),
        // No countdown logic here, handled in CapsuleList
    }));

    return (
        <div className="flex flex-col min-h-screen text-white">
            <div className="mt-2">
                <CapsuleList capsules={updatedCapsules} /> {/* Pass capsules to CapsuleList */}
            </div>
        </div>
    );
}
