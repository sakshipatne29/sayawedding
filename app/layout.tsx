import type { Metadata } from "next";
import { Cormorant_Garamond, Dancing_Script, Jost } from "next/font/google";
import { wedding } from "@/data/wedding";
import { BackgroundMusic } from "@/components/BackgroundMusic";
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

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-script",
});

const title = `${wedding.couple.bride} & ${wedding.couple.groom} are getting married`;
const description = `Join us to celebrate ${wedding.couple.bride} and ${wedding.couple.groom} — ${wedding.saveTheDate.dateRange}. ${wedding.hashtag}`;

// Link previews (WhatsApp etc.) need an absolute image URL. Vercel sets this at build time.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The inline script runs before first paint, so a guest who has already opened
    // the invitation this session never sees the welcome screen flash on reload.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("sayawedding:opened"))document.documentElement.dataset.opened="1"}catch(e){}`,
          }}
        />
      </head>
      <body className={`${cormorant.variable} ${jost.variable} ${dancingScript.variable} font-body bg-ivory text-ink`}>
        {children}
        <BackgroundMusic />
      </body>
    </html>
  );
}
