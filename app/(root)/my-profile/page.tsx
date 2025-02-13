import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { getUserDetails } from "@/lib/actions/auth";
import { handleSignOut } from "@/lib/actions/serverActions";

// Server Component - Fetch user data directly inside the page
const Page = async () => {
    // Fetch session and user details on the server side
    const session = await auth();
    const email = session?.user?.email || "IN";
    const userDetails = await getUserDetails(email);
    const formattedDate = userDetails?.createdAt
        ? new Date(userDetails.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })
        : "N/A"; // Fallback text if userDetails or createdAt is null/undefined
    return (
        <>
            {/* Use the server-side action for sign-out */}
            <form
                action={handleSignOut} // Calling server-side action for sign-out
                method="POST"
                className="mb-10 ml-[10px] md:ml-[800px] lg:ml-[1300px]"
            >
                <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 rounded-lg px-6 py-2 shadow-lg transform hover:scale-105">
                    Logout
                </Button>
            </form>

            <div className="flex justify-center items-center min-h-screen md:bg-gradient-to-r md:from-blue-500 md:to-purple-500 py-12">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 space-y-6 ring-1 ring-gray-200">
                    <h1 className="text-3xl font-extrabold text-center text-gray-800">My Profile</h1>
                    <div className="text-gray-700">
                        {/* Render user details if available */}
                        {userDetails ? (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center p-4 rounded-lg bg-gray-50 shadow-md">
                                    <span className="font-semibold text-gray-600">Full Name:</span>
                                    <span className="text-gray-800">{userDetails.fullName}</span>
                                </div>
                                <div className="flex justify-between items-center p-4 rounded-lg bg-gray-50 shadow-md">
                                    <span className="font-semibold text-gray-600">Email:</span>
                                    <span className="text-gray-800">{userDetails.email}</span>
                                </div>
                                <div className="flex justify-between items-center p-4 rounded-lg bg-gray-50 shadow-md">
                                    <span className="font-semibold text-gray-600">Last Activity:</span>
                                    <span className="text-gray-800">{userDetails.lastActivityDate}</span>
                                </div>
                                <div className="flex justify-between items-center p-4 rounded-lg bg-gray-50 shadow-md">
                                    <span className="font-semibold text-gray-600">Created At:</span>
                                    <span className="text-gray-800">{formattedDate}</span>
                                </div>
                            </div>
                        ) : (
                            <p className="text-center text-gray-600">Loading user details...</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
