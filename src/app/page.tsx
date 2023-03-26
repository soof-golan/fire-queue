import styles from './page.module.css'
import SignInButton from "@/components/SignInButton";
import prisma from "@/prismaClient";
import getBetterServerSession from "@/auth/getBetterServerSession";

export default async function Home() {
  const session = await getBetterServerSession()
  if (!session || !session.user || !session.user.id) {
    return (
      <main className={styles.main}>
        <SignInButton/>
      </main>
    )
  }
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: session.user.id,
    },
    include: {
      ownedEvents: true,
    }
  })

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
