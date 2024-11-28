import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: "E-Ferramentas",
  description: "Revendedor de Ferramentas Eletricas",
  keywords: ['Furradeiras', 'Lixadeiras', 'Obra', 'Ferramentas eletricas']
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Header />
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
