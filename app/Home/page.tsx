import React from 'react'
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

const Page = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Hero />
            <About />
            <Contact />
        </div>
    )
}
export default Page
