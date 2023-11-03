import { useState } from "react";

import { useRouter } from "next/navigation";

export default function useChat() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const postChat = async ({
    handle,
    content,
    actId,
    
  }: {
    handle: string;
    content: string;
    actId: number;
  }) => {
    setLoading(true);

    const res = await fetch("/api/chats", {
      method: "POST",
      body: JSON.stringify({
        handle,
        content,
        actId,
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

  return {
    postChat,
    loading,
  };
}
