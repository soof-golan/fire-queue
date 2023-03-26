import styles from './page.module.css'
import SignInButton from "@/app/components/SignInButton";

export default function Home() {
  return (
    <main className={styles.main}>
      <SignInButton/>
    </main>
  )
}
