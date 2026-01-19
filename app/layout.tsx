import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
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

export const metadata: Metadata = {
  title: "1 HUNDRED | The Code. The Culture.",
  description: "Commitment. Showing Up. Staying Solid. Born in The Ends. Built to Last.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="font-sans selection:bg-hundred-red selection:text-white">
        {children}
      </body>
    </html>
  );
}
