import { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
export default function useChat() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { docId: documentId } = useParams();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  
  const postChat = async ({
    content,
    userId,
    docId,
    
  }: {
    content: string;
    userId: string;
    docId: string;
  }) => {
    setLoading(true);

    const res = await fetch(`/api/documents/${documentId}`, {
      method: "POST",
      body: JSON.stringify({
        userId,
        content,
        docId,
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
    documentId,
    userId,
    loading,
  };
}
