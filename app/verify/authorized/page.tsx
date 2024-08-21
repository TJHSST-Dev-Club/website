"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/ui/Header";
import { Suspense, useEffect, useState } from "react";
import { getDiscordCode } from "../serverActions";

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default function VerifyAuthorized() {
  const { setTheme } = useTheme();
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const authorizationCode = new URL(window.location.href).searchParams.get(
      "code"
    );

    if (!authorizationCode) {
      setCode("No authorization code received.");
      setError(true);
      return;
    }

    getDiscordCode(authorizationCode).then((result) => {
      let [code, isSuccess] = result;
      if (!isSuccess) {
        setError(true);
      }

      setCode(code);
    });
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

      {code.length == 0 ? (
        <LoadingVerification />
      ) : !error ? (
        <Verified code={code} />
      ) : (
        <VerificationError errorMessage={code} />
      )}
    </main>
  );
}

function Verified({ code }: { code: string }) {
  return (
    <div className="shadow-div w-full p-6 rounded-3xl bg-card min-h-64 text-xl flex gap-4 flex-col">
      <Header>Verification complete!</Header>

      <p>Next steps:</p>

      <ol>
        <li>1. Join the Discord server if you haven't already</li>
        <li>2. Click on the #verify channel</li>
        <li>3. Type in "/verify". Don't press enter yet.</li>
        <li>
          4. Click on the "/verify" command in the menu above the chat bar.
        </li>
        <li>
          5. In the "code" options box in the chat bar, enter the following
          code: <b>{code}</b>
        </li>
        <li>6. Press enter or send the message</li>
      </ol>

      <p>
        You should then gain access to the rest of the server. If you are still
        having trouble, contact an officer.
      </p>
    </div>
  );
}

function LoadingVerification() {
  return (
    <div className="shadow-div w-full p-6 rounded-3xl bg-card min-h-64 text-xl flex gap-4 flex-col">
      <Header>Verifying...</Header>
    </div>
  );
}

function VerificationError({ errorMessage }: { errorMessage: string }) {
  return (
    <div className="shadow-div w-full p-6 rounded-3xl bg-card min-h-64 text-xl flex gap-4 flex-col">
      <Header>Error</Header>
      <p>
        Failed to verify. The error message is: <b>{errorMessage}</b>
      </p>
      <p>Please try again, or contact an officer.</p>
    </div>
  );
}
