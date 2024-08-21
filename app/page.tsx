"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import Link from "next/link";
import Divider from "@/components/ui/Divider";
import Header from "@/components/ui/Header";
import MainHeader from "@/components/ui/MainHeader";

function OfficerCard({
  name,
  role,
  year,
  imageLink,
}: {
  name: string;
  role: string;
  year: string;
  imageLink: string;
}) {
  return (
    <div>
      <Image
        src={imageLink}
        width={250}
        height={250}
        alt={name}
        className="rounded-3xl"
      />

      <div className="text-3xl">{name}</div>
      <div className="text-md italic">({year})</div>
      <div className="text-xl">{role}</div>
    </div>
  );
}

export default function Home() {
  const { setTheme } = useTheme();

  setTheme("dark");

  return (
    <main className="flex p-6 w-full flex-col gap-6">
      <MainHeader />

      <div className="shadow-div w-full p-6 rounded-3xl bg-card h-[65vh] flex justify-center align-middle flex-col">
        <h1 className="text-9xl text-devClub text-center font-semibold">
          TJ Dev Club
        </h1>
        <p className="text-center text-xl">Hello world!</p>
      </div>

      <div className="shadow-div w-full p-6 rounded-3xl bg-card min-h-96 flex flex-col gap-4">
        <Header>About Dev Club</Header>
        <p className="text-xl">
          TJ Dev Club is a club focused on building programs, primarily web
          apps. We teach club members how to build apps and websites, hold
          programming competitions, and host a Discord server for club members
          to discuss software development and showcase their projects.
        </p>

        <p className="text-xl">Dev Club is held on Wednesdays B block.</p>
      </div>

      <div className="shadow-div w-full p-6 rounded-3xl bg-card flex flex-col gap-4">
        <Header>Officers</Header>
        <div className="flex justify-around flex-wrap gap-4">
          <OfficerCard
            imageLink="/temp.png"
            name="Sophia Huang"
            role="Co-President"
            year="2025"
          />

          <OfficerCard
            imageLink="/temp.png"
            name="Ryan Ghimire"
            role="Co-President"
            year="2025"
          />

          <OfficerCard
            imageLink="/temp.png"
            name="Shayan Akram"
            role="Lecturer"
            year="2025"
          />

          <OfficerCard
            imageLink="/temp.png"
            name="Eric Guo"
            role="Lecturer"
            year="2026"
          />
        </div>
      </div>
    </main>
  );
}
