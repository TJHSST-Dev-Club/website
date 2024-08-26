"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/ui/Header";
import MainHeader from "@/components/ui/MainHeader";
import { useState } from "react";

export default function Discord() {
  const { setTheme } = useTheme();

  setTheme("dark");

  return (
    <main className="flex p-6 w-full flex-col gap-6">
      <MainHeader />

      <div className="shadow-div w-full p-6 rounded-3xl bg-card min-h-64 text-xl flex gap-4 flex-col">
        <Header>Join the Dev Club Discord server!</Header>
        <ul>
          <li>- Get club announcements</li>
          <li>- Connect with other club members</li>
          <li>- Get help and showcase your work</li>
        </ul>

        <Button
          onClick={() =>
            (window.location.href = "https://discord.gg/sP3WVQRQPC")
          }
        >
          Join the server
        </Button>
      </div>

      <div className="shadow-div w-full p-6 rounded-3xl bg-card min-h-64 text-xl flex flex-col gap-4">
        <Header>Need to verify?</Header>

        <p>
          Once you&#39;ve joined the Discord server, you need to verify that you
          attend TJ.
        </p>

        <p>Please fill out this Google Form to verify.</p>

        <Button
          variant={"outline"}
          onClick={() =>
            (window.location.href = "https://forms.gle/4jTpWBPecgmjnGCE7")
          }
        >
          Click here to verify
        </Button>
      </div>
    </main>
  );
}

function MyComponent() {
  const [myMsg, setMsg] = useState("");

  function buttonHandler() {
    setMsg("Hello world!");
  }

  return (
    <div>
      <p>{myMsg}</p>
      <button onClick={buttonHandler}>Change message</button>
    </div>
  );
}


<script>
  function onClick
</script>