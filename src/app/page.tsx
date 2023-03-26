"use client";

import styles from './page.module.css'
import {signIn} from "next-auth/react"

export default function Home() {
  return (
    <main className={styles.main}>
      <a href="/api/auth/signin" onClick={async e => {
        e.preventDefault()
        await signIn()
      }}>Sign In</a>
    </main>
  )
}
