import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AB Logistics OS – ERP de Transporte y Logística en Galicia",
  description:
    "Software de gestión de transporte y logística en Galicia. ERP diseñado para proteger la rentabilidad de tu flota, automatizar la facturación y cumplir con VeriFactu 2026. Desarrollado en A Coruña.",
  keywords:
    "ERP logística, software transporte Galicia, VeriFactu, gestión flota, A Coruña",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
