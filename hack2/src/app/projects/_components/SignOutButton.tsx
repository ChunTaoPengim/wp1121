// TODO: 4. Call the signOut() function when the button is clicked
// hint: You may want to change the first line of this file
"use client";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { publicEnv } from "@/lib/env/public";
export default function SignOutButton() {
  const handlesignout = () => {
    signOut({ callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}/auth`});
    

  }
  return <Button data-testid="sign-out-button" variant={"outline"} onClick={handlesignout} >Sign Out</Button>;
}
// TODO: 4. end
