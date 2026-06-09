import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DashboardWrapper from "./dashboardWrapper";
import SessionWrapper from "./(components)/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EUGIE'S — Streetwear Management",
  description: "Internal inventory and sales dashboard for EUGIE'S Streetwear",
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
        <SessionWrapper>
          <DashboardWrapper>{children}</DashboardWrapper>
        </SessionWrapper>
      </body>
    </html>
  );
}
