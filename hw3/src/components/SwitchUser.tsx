'use client'
import React from 'react';



import { useRouter } from "next/navigation";

export default function SwitchUser()  {
   
    const router = useRouter();
    const switchButton = () => {
        router.push("/");
        console.log("ma");
    }
    
    
    return (
        <button className="px-4 pt-3 border-solid border-2" onClick={switchButton}>切換使用者</button>
    );
}


