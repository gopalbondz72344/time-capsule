"use client";
import React, {useState} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    DefaultValues,
    FieldValues,
    Path,
    SubmitHandler,
    useForm,
    UseFormReturn,
} from "react-hook-form";
import FileUpload from "@/components/FileUpload"; // Your file upload component
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ZodType } from "zod";
import { CAPSULE_FIELD_NAMES, CAPSULE_FIELD_TYPES } from "@/constants";

import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface Props<T extends FieldValues> {
    schema: ZodType<T>;
    defaultValues: T;
    onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
    type: "CREATE_CAPSULE";
}

const CreateCapsuleForm = <T extends FieldValues>({
                                                      type,
                                                      schema,
                                                      defaultValues,
                                                      onSubmit,
                                                  }: Props<T>) => {
    const router = useRouter();
    const form: UseFormReturn<T> = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues as DefaultValues<T>,
    });
    const [ImagefilePaths, setImageFilePaths] = useState<string[]>([]);
    const [VideofilePaths, setVideoFilePaths] = useState<string[]>([]);

    const handleImageChange = (newFilePaths: string[]) => {
        setImageFilePaths(newFilePaths);
        form.setValue("ImageUpload" as Path<T>, newFilePaths as any);
    };
    const handleVideoChange = (newFilePaths: string[]) => {
        setVideoFilePaths(newFilePaths);
        form.setValue("VideoUpload" as Path<T>, newFilePaths as any);
    }

    const handleSubmit: SubmitHandler<T> = async (data) => {
        const result = await onSubmit({ ...data, ImageUpload: ImagefilePaths, VideoUpload: VideofilePaths });

        if (result.success) {
            toast({ title: "Success", description: "Capsule created successfully!" });
            router.push("/");
        } else {
            toast({ title: "Error", description: result.error ?? "An error occurred.", variant: "destructive" });
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold text-white">Create your Capsule</h1>
            <p className="text-light-100">
                Unlock and revisit your cherished memories anytime, anywhere.
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-full">
                    {Object.keys(defaultValues).map((field) => (
                        <FormField
                            key={field}
                            control={form.control}
                            name={field as Path<T>}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="capitalize text-white">
                                        {CAPSULE_FIELD_NAMES[field.name as keyof typeof CAPSULE_FIELD_TYPES]}
                                    </FormLabel>
                                    <FormControl>
                                        {/* Check for Image or Video upload and render accordingly */}
                                        {field.name === "ImageUpload" || field.name === "VideoUpload" ? (
                                            <FileUpload
                                                type={field.name === "ImageUpload" ? "image" : "video"}
                                                accept={field.name === "ImageUpload" ? "image/*" : "video/*"}
                                                placeholder={`Upload your ${field.name === "ImageUpload" ? "images" : "videos"}`}
                                                folder={`capsules/${field.name === "ImageUpload" ? "images" : "videos"}`}
                                                variant="light"
                                                onFileChange={field.name === "ImageUpload" ? handleImageChange : handleVideoChange}
                                                value={field.name === "ImageUpload" ? ImagefilePaths : VideofilePaths}
                                            />
                                        ) : (
                                            <Input
                                                required
                                                type={CAPSULE_FIELD_TYPES[field.name as keyof typeof CAPSULE_FIELD_TYPES]}
                                                {...field}
                                                className="form-input"
                                            />
                                        )}
                                        {field.name === "EndDate" ? (
                                            <Input
                                                required
                                                type="date"
                                                min={new Date(Date.now() + 86400000).toISOString().split("T")[0]} // Set min to tomorrow
                                                {...field}
                                                className="form-input"
                                            />
                                        ) : (
                                            <Input
                                                required
                                                type={CAPSULE_FIELD_TYPES[field.name as keyof typeof CAPSULE_FIELD_TYPES]}
                                                {...field}
                                                className="form-input"
                                            />
                                        )}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}

                    <Button type="submit" className="form-btn">
                        Create Capsule
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default CreateCapsuleForm;
