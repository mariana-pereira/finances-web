import {
  ChartNoAxesCombined,
  CreditCard,
  DollarSign,
  House,
  Landmark,
  Settings,
  Target,
} from "lucide-react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

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
        <div className="h-[100vh] w-[20vw] bg-blue-900 rounded-e-2xl flex flex-col items-center">
          <div className="pb-8">
            <div className="w-36 h-36 bg-zinc-500 rounded-full mt-16 mb-8"></div>
            <strong className="text-3xl">Mariana Pereira</strong>
          </div>
          <div className="w-[20vw] h-[80vh] bg-zinc-950 rounded-2xl py-9">
            <div className="flex flex-row pl-12 h-16">
              <House color="white" size={24} />
              <strong className="ml-7 text-xl">Início</strong>
            </div>
            <div className="flex flex-row pl-12 h-16">
              <Landmark color="white" size={24} />
              <strong className="ml-7 text-xl">Contas</strong>
            </div>
            <div className="flex flex-row pl-12 h-16">
              <CreditCard color="white" size={24} />
              <strong className="ml-7 text-xl">Cartões</strong>
            </div>
            <div className="flex flex-row pl-12 h-16">
              <Target color="white" size={24} />
              <strong className="ml-7 text-xl">Objetivos</strong>
            </div>
            <div className="flex flex-row pl-12 h-16">
              <ChartNoAxesCombined color="white" size={24} />
              <strong className="ml-7 text-xl">Investimentos</strong>
            </div>
            <div className="flex flex-row pl-12 h-16">
              <DollarSign color="white" size={24} />
              <strong className="ml-7 text-xl">Budget</strong>
            </div>

            <div className={"border-t border-gray-300 my-0"}></div>

            <div className="flex flex-row pl-12 h-16 pt-7">
              <Settings color="white" size={24} />
              <strong className="ml-7 text-xl">Configurações</strong>
            </div>
          </div>
        </div>
        <main className="max-w-[100vw] lg:col-start-2 lg:px-8 lg:pt-8">
          {children}
        </main>
      </body>
    </html>
  );
}
