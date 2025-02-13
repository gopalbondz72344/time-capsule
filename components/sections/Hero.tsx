import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
    return (
        <div id="hero" className="relative min-h-screen">
            {/* Background Video */}
            <video
                src="/videos/hero.mp4"
                className="absolute inset-0 w-full h-full object-cover"
                muted
                loop
                autoPlay
                playsInline // Ensures it works on mobile
            />

            {/* Black Transparent Overlay */}
            <div className="absolute inset-0 bg-black/70" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-4">
                {/* Quote section */}
                <p className="text-white text-md md:text-3xl font-semibold mb-6 max-w-3xl">
                    &#34;A time capsule is not just a box; it&#39;s a treasure chest filled with stories waiting to be told.&#34;
                </p>

                {/* Text section */}
                <p className="text-white text-md md:text-lg mb-8 max-w-3xl leading-relaxed">
                    Time capsules are more than just containers; they are the bridges between past, present, and future.
                    They allow us to preserve memories, milestones, and stories, creating a tangible connection to the past.
                    Whether it’s a letter to future generations, a keepsake of an important moment, or a collection of items
                    that define an era, a time capsule serves as a timeless reminder of who we were and how we lived.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <Button className="w-full max-w-[200px] px-5 py-4 text-sm md:py-6 md:text-xl text-white border border-white bg-black rounded-md hover:bg-white hover:text-black transition duration-300">
                        <Link href="/sign-in">Login</Link>
                    </Button>
                    <Button className="w-full max-w-[200px] px-5 py-4 text-sm md:py-6 md:text-xl bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                        <Link href="/sign-up">Register</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
