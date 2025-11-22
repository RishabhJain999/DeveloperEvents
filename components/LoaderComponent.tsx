"use client";

import { startTransition, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavigationLink({ href, children, ...props }: { href: string; children: React.ReactNode }) {
   const router = useRouter();
   const [isPending, start] = useTransition();

   const handleClick = (e) => {
      e.preventDefault();

      start(() => {
         router.push(href);
      });
   };

   return (
      <>
         {isPending && (
            <div
               className={`fixed inset-0 flex items-center justify-center bg-black/25 z-50 transition-opacity duration-500 ${isPending ? "opacity-100" : "opacity-0"
                  }`}
            >
               <div className="flex flex-col items-center">
                  {/* Spinner */}
                  <div className="size-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                  {/* <p className="mt-4 text-white text-lg">Loading...</p> */}
               </div>
            </div>
         )}

         <Link href={href} onClick={handleClick} {...props}>
            {children}
         </Link>
      </>
   );
}
