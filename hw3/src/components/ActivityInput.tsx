"use client";

import { useRef, useState, useEffect } from "react";
import useAct from "@/hook/useAct";
import useUserInfo from "@/hook/useUserInfo";
import React from 'react'

export default function ActivityInput(){

  const [dialogOpen, setDialogOpen] = useState(false);
    
  const { handle } = useUserInfo();
  const titleRef = useRef<HTMLInputElement>(null);
  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);
  const { postTweet } = useAct();

  const dialog = document.querySelector('dialog');
  
function closeDialog(event:any) {// eslint-disable-line
  // If the target dialog is
  if(!dialog) return;
  if (!event.target.contains(dialog)) return;
  setDialogOpen(false);
}

useEffect(() => {
  if (dialogOpen) {
    document.addEventListener('mousedown', closeDialog);
  } else {
    document.removeEventListener('mousedown', closeDialog);
  }

  return () => {
    document.removeEventListener('mousedown', closeDialog);
  };
}, [dialogOpen]);  // eslint-disable-line
  const handleOpen = () =>{
    setDialogOpen(true);
  }

  const handleAct = async () => {
    
    const title = titleRef.current?.value;
    const start_date = startRef.current?.value;
    const end_date = endRef.current?.value
    console.log(title)
    if(!title){
      alert("Please input title")
    }
    if (!title) return;
    if (!handle) return;
    if(!start_date){
      alert("Please input start_date")
    }
    if(!start_date) return;
    if(!end_date){
      alert("Please input end_date")
    }
    if(!end_date) return;

    const start = new Date(start_date)
    const end = new Date(end_date)
    if(end < start)
    {
      alert("start should be earlier than end")
    }
    if(end < start)
    {
      return;
    }
    if((end.valueOf() - start.valueOf()) > 604800000){
      alert("can't pass 1 week");
    }
    if((end.valueOf() - start.valueOf()) > 604800000){
      return;
    }

    

    try {
      await postTweet({
        handle ,
        title ,
        start_date,
        end_date  ,
      });
      titleRef.current.value = "";
      startRef.current.value = "";
      endRef.current.value = "";
      // this triggers the onInput event on the growing textarea
      // thus triggering the resize
      // for more info, see: https://developer.mozilla.org/en-US/docs/Web/API/Event
    } catch (e) {
      console.error(e);
      alert("Error posting act");
    }
    setDialogOpen(false);
  };
  return (
    <>

     <button onClick={handleOpen} className="px-4 pt-3 border-solid border-2">新增活動</button>
      <dialog open={dialogOpen} >
        <p>Activity name</p>
        <input ref={titleRef} type="text"/>
        <p>開始日期</p>
        <input ref={startRef} type="date"/>
        <p>結束日期</p>
        <input ref={endRef} type="date"/>
        <button onClick={handleAct}>儲存</button>
      </dialog>
    </>
    
  )
}

