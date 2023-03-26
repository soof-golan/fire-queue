"use client"

import {useSession} from "next-auth/react";

export default function AuthStatus() {
  const session = useSession()
  const loading = session.status === "loading"
  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      Yay: {session.data?.user?.email}
    </div>
  );
}
