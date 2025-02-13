'use client'
import { useRef, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "@/hooks/use-toast";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea} from "@/components/ui/textarea";

const Contact = () => {
    const formRef = useRef<HTMLFormElement | null>(null);

    const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formRef.current) return;

        try {
            await emailjs.sendForm(
                process.env.NEXT_PUBLIC_YOUR_SERVICE_ID as string,
                process.env.NEXT_PUBLIC_YOUR_TEMPLATE_ID as string,
                formRef.current,
                process.env.NEXT_PUBLIC_YOUR_PUBLIC_KEY as string  // Add the public key here
            );

            toast({
                title: "Success",
                description: "Email sent successfully!",
            });

            formRef.current.reset();
        } catch (error) {
            console.error("Error sending email:", error);
            toast({
                title: "Error sending email",
                description: "An error occurred.",
                variant: "destructive",
            });
        }
    };


    return (
        <div id="contact" className="flex flex-col items-center justify-center min-h-screen custom-background py-10 px-5">
            <h1 className="text-4xl counter-font font-bold text-white mb-6">Contact Us</h1>
            <form
                ref={formRef}
                onSubmit={sendEmail}
                className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-4"
            >
                <div>
                    <Label htmlFor="user_name" className="block text-gray-700 counter-font font-bold mb-1">
                        Name
                    </Label>
                    <Input
                        type="text"
                        id="user_name"
                        name="user_name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="user_email" className="block text-gray-700 counter-font font-bold mb-1">
                        Email
                    </Label>
                    <Input
                        type="email"
                        id="user_email"
                        name="user_email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="subject" className="block text-gray-700 counter-font font-bold mb-1">
                        Subject
                    </Label>
                    <Input
                        type="text"
                        id="subject"
                        name="subject"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="message" className="block text-gray-700 counter-font font-bold mb-1">
                        Message
                    </Label>
                    <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    ></Textarea>
                </div>

                <Button
                    type="submit"
                    className="w-full py-2 bg-blue-500 counter-font text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Send Message
                </Button>
            </form>
        </div>
    );
};

export default Contact;
