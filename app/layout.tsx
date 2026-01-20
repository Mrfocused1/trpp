import type { Metadata } from "next";
import { Inter, Oswald, Creepster } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500"],
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["300", "400", "600"],
});

const creepster = Creepster({
  subsets: ["latin"],
  variable: "--font-creepster",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "TRAPSTAR | London's Finest",
  description: "Born in The Ends. Built for the streets. London's finest since day one.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} ${creepster.variable}`}>
      <body className="font-sans selection:bg-hundred-red selection:text-white">
        {children}
      </body>
    </html>
  );
}
