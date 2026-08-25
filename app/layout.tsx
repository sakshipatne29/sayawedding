import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { wedding } from "@/data/wedding";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

const title = `${wedding.couple.bride} & ${wedding.couple.groom} are getting married`;
const description = `Join us to celebrate ${wedding.couple.bride} and ${wedding.couple.groom} — ${wedding.saveTheDate.dateRange}. ${wedding.hashtag}`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${jost.variable} font-body bg-ivory text-ink`}>
        {children}
      </body>
    </html>
  );
}
