"use client";

import { useEffect, useState } from "react";
import { ImageKitProvider, IKImage, IKVideo } from "imagekitio-next";
import { getCapsuleById } from "@/lib/actions/capsule";
import config from "@/lib/config";
import { countdownTimer } from "@/lib/utils";
import { SyncLoader } from 'react-spinners';

const {
    env: {
        imagekit: { publicKey, urlEndpoint },
    },
} = config;

const authenticator = async () => {
    try {
        const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { token, expire, signature };
    } catch (error: any) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};

interface CapsuleProps {
    id: string;
}

const ViewCapsule = ({ id }: CapsuleProps) => {
    const [capsule, setCapsule] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [timeRemaining, setTimeRemaining] = useState<string>("");

    useEffect(() => {
        if (!id) return;

        const fetchCapsule = async () => {
            try {
                setLoading(true);
                const capsuleData = await getCapsuleById(id);
                setCapsule(capsuleData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching capsule:", error);
                setLoading(false);
            }
        };

        fetchCapsule();
    }, [id]);

    useEffect(() => {
        if (capsule?.endDate) {
            const interval = setInterval(() => {
                const countdown = countdownTimer(capsule.endDate);
                setTimeRemaining(countdown);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [capsule]);

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-gray-800">
            <SyncLoader color="#ffffff" size={15} />
        </div>
    );

    if (!capsule) return <p className="text-white text-center">Capsule not found.</p>;

    const images = Array.isArray(capsule.ImageUpload) ? capsule.ImageUpload : [];
    const videos = Array.isArray(capsule.VideoUpload) ? capsule.VideoUpload : [];
    const isBackdropVisible = capsule.status !== "UNLOCKED" && capsule.endDate && timeRemaining !== "0 d : 0 h : 0 m : 0 s";

    return (
        <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
              <div className={`relative max-w-4xl mx-auto p-6  ${isBackdropVisible ? "" : "bg-dark-100 mt-5"} rounded-lg `}>
                {/* Full-page Backdrop Overlay */}
                {isBackdropVisible && (
                    <div className="absolute inset-0 mt-[200px]  bg-opacity-60 flex justify-center items-center text-center text-white p-8">
                        <div>
                            <h2 className="text-4xl font-extrabold mb-4">This Capsule "{capsule.name}" is locked until</h2>
                            <p className="text-2xl mb-6">{timeRemaining}</p>
                            <a href={`/unlock-capsule?id=${id}`}
                               className="inline-block px-8 py-4 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
                                Unlock Capsule
                            </a>
                        </div>
                    </div>
                )}

                {/* Content Section (only visible if backdrop is not shown) */}
                {!isBackdropVisible && (
                    <>
                        {/* Capsule Info */}
                        <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-white">"{capsule.name}" Capsule</h1>

                        {/* Images Section */}
                        <h2 className="mt-12 text-xl sm:text-2xl md:text-4xl   font-semibold text-white">Images</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-6">
                            {images
                                .filter((image: string) => image.startsWith("/capsules/images/"))
                                .map((image: string, index: number) => {
                                    const imageUrl = `${urlEndpoint}${image}`;
                                    return (
                                        <div key={index} className="relative group rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
                                            <IKImage
                                                path={image}
                                                width={300}
                                                height={200}
                                                className="w-full h-full object-cover"
                                                alt={`Image ${index}`}
                                            />
                                            {/* Download Button */}
                                            <a
                                                href={imageUrl}
                                                download
                                                className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                Download
                                            </a>
                                        </div>
                                    );
                                })}
                        </div>

                        {/* Videos Section */}
                        <h2 className="mt-14 text-xl sm:text-2xl md:text-4xl font-semibold text-white">Videos</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                            {videos
                                .filter((video: string) => video.startsWith("/capsules/videos/"))
                                .map((video: string, index: number) => (
                                    <IKVideo
                                        key={index}
                                        path={video}
                                        controls
                                        width={300}
                                        height={200}
                                        className="rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                                    />
                                ))}
                        </div>
                    </>
                )}
            </div>
        </ImageKitProvider>
    );
};

export default ViewCapsule;
