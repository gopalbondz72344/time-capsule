"use client";
import React from "react";
import CreateCapsuleForm from "@/components/CreateCapsuleForm";
import { CreateCapsuleSchema } from "@/lib/validations";
import { createCapsule } from "@/lib/actions/capsule";

const Page = () => (
    <CreateCapsuleForm
        type="CREATE_CAPSULE"
        schema={CreateCapsuleSchema}
        defaultValues={{
            name: "",
            endDate: "",
            ImageUpload: [], // Ensuring an array to handle multiple files
            VideoUpload: [],
        }}
        onSubmit={createCapsule}
    />
);

export default Page;