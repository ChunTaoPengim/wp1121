import React from 'react'
import Link from "next/link";

import { MessageCircle, Repeat2, Share } from "lucide-react";

import { Separator } from "@/components/ui/separator";


import JoinButton from './JoinButton';
type JoinProps = {
  username?: string;
  handle?: string;
  id: number;
  authorName: string;
  authorHandle: string;
  title: string;
  joins: number;
  start_date: string;
  end_date: string;
  joined?: boolean;
};
const Act = ({
  username,
  handle,
  id,
  authorName,
  authorHandle,
  title,
  joins,
  start_date,
  end_date,
  joined,
}:JoinProps) => {
  return (

    <>
      <Link
      href={{
        pathname: `/act/${id}`,
        query: {
          joined,
          title,
          handle,
          
        },
      }}>
      <div>{title} {joins} {joined} {start_date} {end_date}
        <JoinButton 
        initialLikes={joins}
        initialLiked={joined}
        actId={id}
        handle={handle}/>
      
      </div>
      </ Link>
    </>
    
  )
}

export default Act