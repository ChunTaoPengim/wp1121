'use client'
import React from 'react';



import { usePathname, useRouter } from "next/navigation";

const SwitchUser = () => {
   
    const router = useRouter();
    const switchButton = () => {
        router.push("/");
        console.log("ma");
    }
    
    
    return (
        <button className="px-4 pt-3 border-solid border-2" onClick={switchButton}>切換使用者</button>
    );
}

export default SwitchUser;
