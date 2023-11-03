import { useState } from "react";

import { useRouter } from "next/navigation";

export default function useAct() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const postTweet = async ({
    handle,
    title,
    start_date,
    end_date,
  }: {
    handle: string;
    title: string;
    start_date: string;
    end_date: string;
  }) => {
    setLoading(true);

    const res = await fetch("/api/activities", {
      method: "POST",
      body: JSON.stringify({
        handle,
        title,
        start_date,
        end_date,
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    // router.refresh() is a Next.js function that refreshes the page without
    // reloading the page. This is useful for when we want to update the UI
    // from server components.
    router.refresh();
    setLoading(false);
  };


  const getAct = async ({
    title,
    
  }: {
    title: string;
    
  }) => {
    setLoading(true);

    const queryParams = new URLSearchParams({ title});
    const res = await fetch(`/api/activities?${queryParams}`, {
    method: "GET",
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    // router.refresh() is a Next.js function that refreshes the page without
    // reloading the page. This is useful for when we want to update the UI
    // from server components.
    router.refresh();
    setLoading(false);
    return res.json();
  };


  return {
    getAct,
    postTweet,
    loading,
  };
}
