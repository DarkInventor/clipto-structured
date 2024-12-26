import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthCheck } from "@/components/AuthCheck";
import { getAnalytics, logEvent } from "firebase/analytics";
import { Analytics } from "@/components/FirebaseAnalytics";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.animator.studio/"), 
  title: "Animator Studio",
  description: "Create Beautiful Animations In Seconds",
  keywords: ["animation", "studio", "design", "motion graphics", "creative tools", "animator", "animated video", "screen studio"],
  icons: {
    icon: "/favicon-32x32.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "Animator Studio",
    description: "Create Beautiful Animations In Seconds",
    url: "https://animator.studio",
    siteName: "Animator Studio",
    images: [
      {
        url: "https://pub-a49ce427d0254ca983d7c77bb50b7846.r2.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Animator Studio",        
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Animator Studio",
    description: "Create Beautiful Animations In Seconds",
    creator: "@kathanmehtaa",
    images: ["https://pub-a49ce427d0254ca983d7c77bb50b7846.r2.dev/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <head>

    <meta name="apple-mobile-web-app-title" content="Animator Studio" />
    </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <Analytics />        
        <AuthCheck />
        {children}
      </body>
    </html>
  );
}
