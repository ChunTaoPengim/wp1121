"use client";

import { useState } from "react";
import type { EventHandler, MouseEvent } from "react";

import { Check } from "lucide-react";

import useJoin from "@/hook/useJoin";
import { cn } from "@/lib/utils";

type LikeButtonProps = {
  initialLikes: number;
  initialLiked?: boolean;
  actId: number;
  handle?: string;
};

export default function JoinButton({
  initialLikes,
  initialLiked,
  actId,
  handle,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(initialLikes);
  const { joinAct, quitAct, loading } = useJoin();

  const handleClick: EventHandler<MouseEvent> = async (e) => {
    // since the parent node of the button is a Link, when we click on the
    // button, the Link will also be clicked, which will cause the page to
    // navigate to the tweet page, which is not what we want. So we stop the
    // event propagation and prevent the default behavior of the event.
    e.stopPropagation();
    e.preventDefault();
    if (!handle) return;
    if (liked) {
      await quitAct({
        actId,
        userHandle: handle,
      });
      setLikesCount((prev) => prev - 1);
      setLiked(false);
    } else {
      await joinAct({
        actId,
        userHandle: handle,
      });
      setLikesCount((prev) => prev + 1);
      setLiked(true);
    }
  };

  return (
    <button
      className={cn(
        "flex  items-center gap-1 hover:text-brand",
        liked && "text-brand",
      )}
      onClick={handleClick}
      disabled={loading}
    >
      <div
        className={cn(
          "flex items-center  rounded-full p-1.5 transition-colors duration-300 ",

        )}
      >
        < Check size={18} />
      </div>
      {liked?<section className="bg-yellow-200">已參加</section>:<section className="bg-blue-200">未參加</section>}
      {likesCount >= 0  && likesCount}人
      
    </button>
  );
}
