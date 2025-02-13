"use client"
import React from 'react'
import Image from "next/image";

const TimeCapsuleLogo = () => {
    return (
        <Image
            src="/assets/time-capsule.svg" // Ensure the image is in the public/assets folder
            alt="file"
            width={100}
            height={100}
        />
    )
}
export default TimeCapsuleLogo
