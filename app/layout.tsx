import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Website Traffic & Trends: Top Sites & Insights 2025 - EarnMapify",
  description: "Discover 2025's top website traffic data, trends, and rankings. Analyze PayPal, Stripe, Vercel, GitHub, games, tools, and more with Similarweb insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
