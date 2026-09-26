import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "Kian AgentNet | Autonomous Web Protocol & AI Extraction Gateway",
  description: "High-performance AI extraction protocol and automated agent gateway designed for private enterprise privacy and seamless data extraction.",
  keywords: ["AI extraction", "Web Protocol", "AgentNet", "Kian Solutions", "API Gateway", "Next.js"],
  authors: [{ name: "Kian Solutions" }],
  openGraph: {
    title: "Kian AgentNet | Autonomous Web Protocol",
    description: "Test and deploy high-performance AI web extraction and protocol gateways instantly.",
    url: "https://kian-agentnet-ui.vercel.app",
    siteName: "Kian AgentNet",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kian AgentNet",
    description: "Autonomous Web Protocol & AI Extraction Gateway",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-kian-900 text-white selection:bg-kian-brand/30`}
      >
        {children}
      </body>
    </html>
  );
}