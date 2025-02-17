import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SideBar } from "@/components/SideBar";
import { MobileNav } from "@/components/MobileNav";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Controle de Estoque",
  description: "Organize seu estoque do jeito certo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${poppins.variable} ${geistMono.variable}`}>
        <SideBar />
        <MobileNav />
        {children}
      </body>
    </html>
  );
}
