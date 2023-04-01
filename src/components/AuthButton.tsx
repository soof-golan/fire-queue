"use client";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

function TheButton() {
  const session = useSession();
  const link =
    session.status === "authenticated"
      ? "/api/auth/signout"
      : "/api/auth/signin";
  const text = session.status === "authenticated" ? "Sign Out" : "Sign In";
  return (
    <button>
      <Link
        href={link}
        onClick={async (e) => {
          e.preventDefault();
          if (session.status === "loading") return;
          if (session.status === "authenticated") {
            await signOut();
          } else {
            await signIn();
          }
        }}
      >
        {text}
      </Link>
    </button>
  );
}

export default function AuthButton() {
  return (
    <SessionProvider>
      <TheButton />
    </SessionProvider>
  );
}
