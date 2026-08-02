"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface UrlRedirectProps {
  url: string;
  allowExternal?: boolean; 
}

const UrlRedirect = ({ url, allowExternal = false }: UrlRedirectProps) => {
  const router = useRouter();

  useEffect(() => {
    const isInternal = url.startsWith("/") && !url.startsWith("//");

    if (isInternal) {
      router.replace(url);
    } else if (allowExternal) {
      window.location.replace(url);
    } else {
      console.warn("Blocked unsafe external redirect attempt:", url);
    }
  }, [url, router, allowExternal]);

  return null;
};

export default UrlRedirect;
