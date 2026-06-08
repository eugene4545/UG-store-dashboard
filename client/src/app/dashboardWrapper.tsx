"use client";

import React, { useEffect } from "react";
import Navbar from "@/app/(components)/Navbar";
import Sidebar from "@/app/(components)/Sidebar";
import { Store } from "@mui/x-data-grid/utils/Store";
import StoreProvider, { useAppSelector } from "./redux";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

   useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
   }, [isDarkMode])
  return (
    <div
      className={`${
        isDarkMode ? "dark" : "light"
      } flex w-full min-h-screen ${
        isDarkMode
          ? "bg-obsidian text-[#e1e2e7]"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <Sidebar />
      <main
        className={`flex flex-col w-full h-full py-7 px-9 ${
          isDarkMode ? "bg-obsidian" : "bg-gray-50"
        } ${isSidebarCollapsed ? "md:pl-24" : "md:pl-72"}`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;
