"use client";

import {
  ChartNoAxesCombined,
  CreditCard,
  DollarSign,
  House,
  Landmark,
  Settings,
  Target,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 👈 import this
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // 👈 current route
  const toggleMenu = () => setIsOpen((prev) => !prev);

  const navItems = [
    { icon: <House size={22} />, label: "Início", path: "/home" },
    { icon: <Landmark size={22} />, label: "Contas", path: "/accounts" },
    { icon: <CreditCard size={22} />, label: "Cartões", path: "/cards" },
    { icon: <Target size={22} />, label: "Objetivos", path: "/goals" },
    { icon: <ChartNoAxesCombined size={22} />, label: "Investimentos", path: "/investments" },
    { icon: <DollarSign size={22} />, label: "Budget", path: "/budget" },
  ];

  const bottomItems = [{ icon: <Settings size={22} />, label: "Configurações", path: "/settings" }];

  return (
    <html lang="pt-BR" className="dark antialiased">
      <body className={`${inter.className} bg-zinc-950 text-white`}>
        <div className="flex flex-col lg:flex-row h-screen">
          {/* Mobile Header */}
          <header className="lg:hidden flex items-center justify-between px-6 py-4 bg-blue-900 shadow-md">
            <h1 className="text-xl font-bold">Finances</h1>
            <button
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="text-white focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </header>

          {/* Sidebar / Drawer */}
          <aside
            className={`
              fixed lg:static inset-y-0 left-0 z-40 transform 
              ${isOpen ? "translate-x-0" : "-translate-x-full"} 
              lg:translate-x-0 
              transition-transform duration-300 ease-in-out
              bg-blue-900 w-64 lg:w-[20vw] flex flex-col items-center rounded-tr-2xl
            `}
          >
            <div className="py-8 flex flex-col justify-center items-center">
              <div className="w-24 h-24 bg-zinc-500 rounded-full mb-4 mt-4 lg:mt-16" />
              <strong className="text-xl lg:text-2xl">Mariana Pereira</strong>
            </div>

            <nav className="flex-1 w-full bg-zinc-950 rounded-tr-2xl py-6">
              {navItems.map((item) => {
                const isActive = pathname === item.path; // 👈 check active route
                return (
                  <Link
                    key={item.label}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex flex-row items-center pl-8 py-4 cursor-pointer transition-colors
                      ${
                        isActive
                          ? "bg-blue-800 text-white"
                          : "hover:bg-zinc-800 text-zinc-300"
                      }`}
                  >
                    {item.icon}
                    <span className="ml-6 text-lg">{item.label}</span>
                  </Link>
                );
              })}

              <div className="border-t border-zinc-800 my-4 mx-4" />

              {bottomItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.label}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex flex-row items-center pl-8 py-4 cursor-pointer transition-colors
                      ${
                        isActive
                          ? "bg-blue-800 text-white"
                          : "hover:bg-zinc-800 text-zinc-300"
                      }`}
                  >
                    {item.icon}
                    <span className="ml-6 text-lg">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Overlay for mobile when menu open */}
          {isOpen && (
            <div
              onClick={toggleMenu}
              className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
            ></div>
          )}

          {/* Main content */}
          <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 bg-zinc-950">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
