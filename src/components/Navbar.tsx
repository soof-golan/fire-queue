"use client"
import Link from "next/link";
import AuthButton from "@/components/AuthButton";

export default function Navbar() {
  return (
    <nav className="">
      <Link href="/">Home</Link>
      <AuthButton/>
    </nav>
  );
}
