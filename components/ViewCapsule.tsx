"use client";

import { useEffect, useState } from "react";
import { ImageKitProvider, IKImage, IKVideo } from "imagekitio-next";
import {getCapsuleById} from "@/lib/actions/capsule";
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
        <div className="loader-container">
            <SyncLoader  color="#ffffff" size={15} />
        </div>
    );

    if (!capsule) return <p className="text-white">Capsule not found.</p>;

    const images = Array.isArray(capsule.ImageUpload) ? capsule.ImageUpload : [];
    const videos = Array.isArray(capsule.VideoUpload) ? capsule.VideoUpload : [];
    const isBackdropVisible = capsule.status !== "UNLOCKED" && capsule.endDate && timeRemaining !== "0 d : 0 h : 0 m : 0 s";
    return (
        <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
            <div className="relative max-w-4xl mx-auto p-6">
                {/* Full-page Backdrop Overlay */}
                {isBackdropVisible && (
                        <div className="text-center mt-[200px] text-white">
                            <h2 className="text-3xl font-bold">This Capsule "{capsule.name}" is locked until </h2>
                            <p className="text-lg mt-2">{timeRemaining}</p>
                            <a href={`/unlock-capsule?id=${id}`}
                               className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300">
                                Unlock Capsule
                            </a>
                    </div>
                )}

                {/* Content Section (only visible if backdrop is not shown) */}
                {!isBackdropVisible && (
                    <>
                        {/* Capsule Info */}
                        <h1 className="text-3xl font-bold text-white">{capsule.name}</h1>

                        {/* Images Section */}
                        <h2 className="mt-8 text-2xl font-semibold text-white">Images</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                            {images
                                .filter((image: string) => image.startsWith("/capsules/images/"))
                                .map((image: string, index: number) => {
                                    const imageUrl = `${urlEndpoint}${image}`; // Construct the image URL
                                    return (
                                        <div key={index} className="relative group">
                                            <IKImage
                                                path={image}
                                                width={150}
                                                height={150}
                                                className="rounded-md shadow-md"
                                                alt={`Image ${index}`}
                                            />
                                            {/* Download Button */}
                                            <a
                                                href={imageUrl}
                                                download
                                                className="absolute bg-blue-500 mt-2 ml-7 rounded-md px-2 py-1 text-white"
                                            >
                                                Download
                                            </a>
                                        </div>
                                    );
                                })}
                        </div>

                        {/* Videos Section */}
                        <h2 className="mt-14 text-2xl font-semibold text-white">Videos</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            {videos
                                .filter((video: string) => video.startsWith("/capsules/videos/"))
                                .map((video: string, index: number) => (
                                    <IKVideo
                                        key={index}
                                        path={video}
                                        controls
                                        width={300}
                                        height={200}
                                        className="rounded-md shadow-md"
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
