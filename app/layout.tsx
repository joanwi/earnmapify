import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MakeMoneyWeb - Data-Driven Web Analytics",
  description: "Explore top-performing websites across different categories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
