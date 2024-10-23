import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import "../globals.css";

import logo from '../../assets/finances.svg';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "finances",
  description: "Um bom jeito de organizar suas finanças.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark antialiased">
      <body className={inter.className}>
        <div className="min-h-screen lg:grid lg:grid-cols-app dark:bg-zinc-900">
          <div className="flex flex-col items-center">
            <h1 className="to-zinc-900 text-7xl font-bold dark:text-zinc-100 mt-28 mb-16">
              finances
            </h1>
            <Image src={logo} width={500} alt="" />
          </div>
          <main className="max-w-[100vw] bg-blue-950 lg:col-start-2 lg:px-8 lg:pt-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
