"use client";

import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
import config from "@/lib/config";
import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils";

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

interface Props {
    type: "image" | "video";
    accept: string;
    placeholder: string;
    folder: string;
    variant: "dark" | "light";
    onFileChange: (filePaths: string[]) => void;
    value?: string[];
}

const FileUpload = ({
                        type,
                        accept,
                        placeholder,
                        folder,
                        variant,
                        onFileChange,
                        value = [],
                    }: Props) => {
    const ikUploadRef = useRef(null);
    const [files, setFiles] = useState<{ filePath: string }[]>(value.map((path) => ({ filePath: path })));
    const [progress, setProgress] = useState(0);

    const styles = {
        button: variant === "dark" ? "bg-dark-300" : "bg-light-600 border-gray-100 border",
        placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
        text: variant === "dark" ? "text-light-100" : "text-dark-400",
    };

    const onError = (error: any) => {
        console.error(error);
        toast({
            title: `${type} upload failed`,
            description: `Your ${type} could not be uploaded. Please try again.`,
            variant: "destructive",
        });
    };

    const onSuccess = (res: any) => {
        setFiles((prevFiles) => {
            const updatedFiles = [...prevFiles, { filePath: res.filePath }];
            onFileChange(updatedFiles.map((file) => file.filePath)); // Pass updated file paths
            return updatedFiles;
        });

        toast({
            title: `${type} uploaded successfully`,
            description: `${res.filePath} uploaded successfully!`,
        });
    };

    const onValidate = (file: File) => {
        const maxSize = type === "image" ? 20 * 1024 * 1024 : 50 * 1024 * 1024;

        if (file.size > maxSize) {
            toast({
                title: "File size too large",
                description: `Please upload a file that is less than ${maxSize / (1024 * 1024)}MB in size`,
                variant: "destructive",
            });
            return false;
        }
        return true;
    };

    return (
        <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
            <IKUpload
                ref={ikUploadRef}
                onError={onError}
                onSuccess={onSuccess}
                useUniqueFileName={true}
                validateFile={onValidate}
                onUploadStart={() => setProgress(0)}
                onUploadProgress={({ loaded, total }) => {
                    setProgress(Math.round((loaded / total) * 100));
                }}
                folder={folder}
                accept={accept}
                className="hidden"
                multiple={true} // Enable multiple file uploads
            />

            <button
                className={cn("upload-btn", styles.button)}
                onClick={(e) => {
                    e.preventDefault();
                    if (ikUploadRef.current) {
                        // @ts-ignore
                        ikUploadRef.current.click();
                    }
                }}
            >
                <Image src="/assets/upload.svg" alt="upload-icon" width={20} height={20} className="object-contain" />
                <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>
            </button>

            {progress > 0 && progress !== 100 && (
                <div className="w-full rounded-full bg-green-200">
                    <div className="progress" style={{ width: `${progress}%` }}>
                        {progress}%
                    </div>
                </div>
            )}

            <div className="uploaded-files flex flex-wrap gap-2">
                {files.map((file, index) => (
                    <div key={index} className="uploaded-file">
                        {type === "image" ? (
                            <IKImage alt={file.filePath} path={file.filePath} width={150} height={150} className="rounded-md" />
                        ) : (
                            <IKVideo path={file.filePath} controls width={300} height={300} className="rounded-md" />
                        )}
                    </div>
                ))}
            </div>
        </ImageKitProvider>
    );
};

export default FileUpload;
