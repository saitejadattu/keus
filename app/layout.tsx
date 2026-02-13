import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// Sans-serif for navigation and body text
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

// Elegant Serif for the "Smart is the new home" heading
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Keus | Premium Smart Home Systems",
  description: "Smart is the new home - premium smarthome systems for distinctive spaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}