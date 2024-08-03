import "./globals.css";

import { Inter } from "@/fonts/fonts";

export const metadata = {
  title: "Next.js JS Boilerplate",
  description: "Next.js JS Boilerplate",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={Inter.className}>{children}</body>
    </html>
  );
}
