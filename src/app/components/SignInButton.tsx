"use client"
import {signIn} from "next-auth/react";

export default function SignInButton() {
  return <a href="/api/auth/signin" onClick={async e => {
    e.preventDefault()
    await signIn()
  }}>Sign In</a>;
}
