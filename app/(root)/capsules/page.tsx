// app/capsules/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import ViewCapsule from "@/components/ViewCapsule";  // Import the component that handles the capsule

const Page = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");  // Get the "id" from the URL query params

    if (!id) {
        return <p className="text-white">No ID provided</p>; // Handle cases where no ID is present
    }

    return (
        <div className="fixed bg-black opacity-80 -mt-[80px] md:-ml-[64px] -ml-[20px] md:w-[100vw] h-[100vh]">
            <ViewCapsule id={id} /> {/* Pass the ID to your ViewCapsule component */}
        </div>
    );
};

export default Page;
