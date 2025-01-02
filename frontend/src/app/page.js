import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to Our Restaurant</h1>
      <a href="/booking" className={styles.bookButton}>
        Book a Table
      </a>
    </main>
  );
}
