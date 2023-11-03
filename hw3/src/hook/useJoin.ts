import { useState } from "react";

import { useRouter } from "next/navigation";

export default function useJoin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const joinAct = async ({
    actId,
    userHandle,
  }: {
    actId: number;
    userHandle: string;
  }) => {
    if (loading) return;
    setLoading(true);

    const res = await fetch("/api/joins", {
      method: "POST",
      body: JSON.stringify({
        actId,
        userHandle,
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    router.refresh();
    setLoading(false);
  };

  const quitAct = async ({
    actId,
    userHandle,
  }: {
    actId: number;
    userHandle: string;
  }) => {
    if (loading) return;

    setLoading(true);
    const res = await fetch("/api/joins", {
      method: "DELETE",
      body: JSON.stringify({
        actId,
        userHandle,
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    router.refresh();
    setLoading(false);
  };

  return {
    joinAct,
    quitAct,
    loading,
  };
}
