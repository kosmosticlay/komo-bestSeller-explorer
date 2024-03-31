import "../styles/global.css";
import styles from "../styles/home.module.css";

import { Metadata } from "next";
import Header from "../components/Header";
import { Rajdhani } from "next/font/google";

const rajdhaniFont = Rajdhani({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | NYT Best Seller",
    default: "NYT Best Seller",
  },
  description: "The New York Times Best Seller List",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={rajdhaniFont.className}>
      <body>
        <div className={styles.container}>
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
