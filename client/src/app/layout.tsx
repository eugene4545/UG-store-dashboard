import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DashboardWrapper from "./dashboardWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eugies",
  description: "Generated by create next app",
  icons: {
    icon:"/baD0h501.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/picsvg_download.svg" type="image/svg+xml" />
      </head>
      <body className={inter.className}>
        <DashboardWrapper>{children}</DashboardWrapper>
        </body>
    </html>
  );
}
