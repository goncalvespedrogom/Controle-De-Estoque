import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google"; // Substituindo Geist pelo Poppins
import "./globals.css";
import { SideBar } from "@/components/SideBar";
import { MobileNav } from "@/components/MobileNav";

// Define a fonte Poppins com diferentes pesos
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Inclui pesos mais usados
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${geistMono.variable}`}>
        <SideBar />
        <MobileNav />
        {children}
      </body>
    </html>
  );
}
