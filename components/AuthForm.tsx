"use client";
import React, {useEffect} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    DefaultValues,
    FieldValues,
    Path,
    SubmitHandler,
    useForm,
    UseFormReturn,
} from "react-hook-form";
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
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";

import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface Props<T extends FieldValues> {
    schema: ZodType<T>;
    defaultValues: T;
    onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
    type: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
                                             type,
                                             schema,
                                             defaultValues,
                                             onSubmit,
                                         }: Props<T>) => {
    const router = useRouter();
    const isSignIn = type === "SIGN_IN";
    const form: UseFormReturn<T> = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues as DefaultValues<T>,
    });
    useEffect(() => {
        form.reset(defaultValues as DefaultValues<T>);
    },[]);
    const handleSubmit: SubmitHandler<T> = async (data) => {
        const result = await onSubmit(data);

        if (result.success) {
            toast({
                title: "Success",
                description: isSignIn
                    ? "You have successfully signed in."
                    : "You have successfully signed up.",
            });

            router.push("/");
        } else {
            toast({
                title: `Error ${isSignIn ? "signing in" : "signing up"}`,
                description: result.error ?? "An error occurred.",
                variant: "destructive",
            });
        }
    };
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold text-white">
                {isSignIn ? "Welcome back to TimeCapsule" : "Create your Account"}
            </h1>
            <p className="text-light-100">
                {isSignIn
                    ? "Unlock and revisit your cherished memories anytime, anywhere."
                    : "Please complete all the fields to securely store and preserve your moments for the future."}

            </p>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-6 w-full"
                >
                    {Object.keys(defaultValues).map((field) => (
                        <FormField
                            key={field}
                            control={form.control}
                            name={field as Path<T>}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="capitalize">
                                        {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                                    </FormLabel>
                                    <FormControl>
                                            <Input
                                                required
                                                type={
                                                    FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                                                }
                                                {...field}
                                                className="form-input"
                                            />

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}

                    <Button type="submit" className="form-btn">
                        {isSignIn ? "Sign In" : "Sign Up"}
                    </Button>
                </form>
            </Form>
            <p className="text-center text-base font-medium">
                {isSignIn ? "New to TimeCapsule? " : "Already have an account? "}

                <Link
                    href={isSignIn ? "/sign-up" : "/sign-in"}
                    className="font-bold text-white"
                >
                    {isSignIn ? "Create an account" : "Sign in"}
                </Link>
            </p>
        </div>
    );
};
export default AuthForm;