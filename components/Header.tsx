import styles from "../styles/header.module.css";

import Link from "next/link";

export default function Header() {
  return (
    <div className={styles.header}>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </div>
  );
}
