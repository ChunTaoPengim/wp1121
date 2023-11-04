"use client";

import { useRef } from "react";
import useChat from "@/hook/useChat";
import React from 'react'

type ChatProps = {
    handle: string;
    actId: number;
  };


  export default function ChatInput (
   {
    handle,
    actId,
  }:ChatProps)  {
    const titleRef = useRef<HTMLTextAreaElement>(null);
    const { postChat } = useChat();
    const handleChat = async () => {
    
        const content = titleRef.current?.value;
        
        console.log(content)
        if (!content) return;
    
    
        // const start_date = new Date(start)
        // const end_date = new Date(end)
    
        
        try {
          await postChat({
            handle ,
            content ,
            actId,
          });
          titleRef.current.value = "";
          
         
          // this triggers the onInput event on the growing textarea
          // thus triggering the resize
          // for more info, see: https://developer.mozilla.org/en-US/docs/Web/API/Event
        } catch (e) {
          console.error(e);
          alert("Error posting act");
        }
      };
      return (
        <>
            <textarea ref={titleRef}></textarea>
            <button onClick={handleChat}>新增</button>
        </>
        
      )
}

// export default ChatInput