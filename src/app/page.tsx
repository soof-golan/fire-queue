import styles from './page.module.css'
import SignInButton from "@/app/components/SignInButton";
import {getServerSession} from "next-auth";
import prisma from "@/prismaClient";
import { authOptions } from "@/pages/api/auth/[...nextauth]"

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (!session || !session.user || !session.user.email) {
    return (
      <main className={styles.main}>
        <SignInButton/>
      </main>
    )
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    },
    include: {
      ownedEvents: true,
    }
  })

  if (!user) {
    return (
      <main className={styles.main}>
        <SignInButton/>
      </main>
    )
  }

  return (
    <main className={styles.main}>
      <div>
        You are signed in as {user?.email}
      </div>
      <div>
        You have {user?.ownedEvents?.length} events.
      </div>
    </main>
  )
}
