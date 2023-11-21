"use client";

// import { useDocument } from "@/hook/useDocument";
import useChat from "@/hook/useChat";

// import { auth } from "@/lib/auth";
// import { redirect } from "next/navigation";
// import { publicEnv } from "@/lib/env/public";
import { useRef } from "react";
import { useEffect } from 'react';
import { useRouter } from "next/navigation";
function DocPage() {

  
  // const { documentId } = useDocument();
  const router = useRouter();
  const {postChat, userId, documentId} = useChat()
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const handleChat = async () => {
    
    const content = titleRef.current?.value;
    
    console.log(content)
    console.log(typeof documentId)
    if (!content) return;


    // const start_date = new Date(start)
    // const end_date = new Date(end)

    
    try {
      await postChat({
        userId: userId,
        content ,
        docId : documentId,
        
      });
      titleRef.current.value = "";
      
     
      // this triggers the onInput event on the growing textarea
      // thus triggering the resize
      // for more info, see: https://developer.mozilla.org/en-US/docs/Web/API/Event
    } catch (e) {
      console.error(e);
      alert("Error posting act");
    }
    router.refresh();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Reload the page after every 5 seconds
      router.refresh();
    }, 1000); // 5000 milliseconds = 5 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [router]);
  
  return (
  
   <div>
      <textarea ref={titleRef}>Type something to chat</textarea>
      <button onClick={handleChat}>新增</button>
    </div>
  );
}

export default DocPage;
