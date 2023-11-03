import { useMemo } from "react";

import { useSearchParams } from "next/navigation";



// this is a helper function to get user info in client components
export default function useUserInfo() {
  const searchParams = useSearchParams();
  const username = useMemo(() => searchParams.get("username"), [searchParams]); // usememo, cache重複呼叫的
  const handle = useMemo(() => searchParams.get("handle"), [searchParams]);
 

  return {
    username,
    handle,
  };
}