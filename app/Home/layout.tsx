import React, {ReactNode} from 'react'
import Header from "@/components/Header";
import {auth} from "@/auth";

const Layout = async ({ children }: { children: ReactNode }) => {
    const session = await auth();
    return (
        <main className="bg-blue-500 -mt-[40px]">
            <Header session={session}/>
            <div>{children}</div>
        </main>
    )
}
export default Layout
