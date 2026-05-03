import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Leonida Labs — Tools for the GTA VI era",
  description: "Coming soon. Building the creator stack for Vice City's return.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Leonida Labs",
    description: "Tools for the GTA VI era. Coming soon.",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leonida Labs",
    description: "Tools for the GTA VI era. Coming soon.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
