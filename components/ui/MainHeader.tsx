import Image from "next/image";
import Link from "next/link";

export default function MainHeader() {
  return (
    <div className="shadow-div w-full h-16 p-6 rounded-3xl bg-card flex flex-row justify-between items-center">
      <div className="relative h-16 w-16">
        <Image src={"/dev_club.svg"} fill={true} alt={"Dev club logo"} />
      </div>
      <p className="flex flex-row gap-2">
        <Link href="/" className="underline underline-offset-1">
          Home
        </Link>
        <Link href="/discord" className="underline underline-offset-1">
          Discord
        </Link>
      </p>
    </div>
  );
}
