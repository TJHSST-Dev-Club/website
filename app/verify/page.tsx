"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/ui/Header";
import { getAuthCodeUrl } from "./serverActions";
import { useEffect, useState } from "react";

export default function Verify() {
  const { setTheme } = useTheme();
  const [authCodeUrl, setAuthCodeUrl] = useState("");

  useEffect(() => {
    getAuthCodeUrl().then((url) => setAuthCodeUrl(url));
  }, []);

  setTheme("dark");

  return (
    <main className="flex p-6 w-full flex-col gap-6">
      <div className="shadow-div w-full h-16 p-6 rounded-3xl bg-card flex flex-row justify-between">
        <p>Dev club logo</p>
        <p className="flex flex-row gap-2">
          <Link href="/" className="underline underline-offset-1">
            Home
          </Link>
          <Link href="/discord" className="underline underline-offset-1">
            Discord
          </Link>
        </p>
      </div>

      <div className="shadow-div w-full p-6 rounded-3xl bg-card min-h-64 text-xl flex gap-4 flex-col">
        <Header>Verification</Header>
        <p>
          We only allow current TJHSST students as well as alumni to gain access
          to our Discord server.
        </p>

        <p>
          If you are currently attending TJ, please click the "Login with Ion"
          button to continue. Join the Discord server before you begin.
        </p>

        <p>
          If you are a TJ alum or you are having trouble, please join the
          Discord server through the previous page and contact an officer.
        </p>
        {authCodeUrl.length == 0 ? (
          <Button>Please wait, generating link...</Button>
        ) : (
          <Button onClick={() => (window.location.href = authCodeUrl)}>
            Log in with Ion
          </Button>
        )}
      </div>
    </main>
  );
}
