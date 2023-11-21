'use client';
import { BiError } from "react-icons/bi";
import { useEffect } from 'react';
import { useRouter } from "next/navigation";

function DocsPage() {
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
      // Reload the page after every 5 seconds
      router.refresh();
    }, 1000); // 5000 milliseconds = 5 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [router]);

  return (
    <div className="flex h-[90vh] w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <BiError className="text-yellow-500" size={80} />
        <p className="text-sm font-semibold text-slate-700">
          Please select a chatroom or the chatroom has already been created
        </p>
      </div>
    </div>
  );
}
export default DocsPage;
