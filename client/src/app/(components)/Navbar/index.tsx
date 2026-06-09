// "use client";
// import React from "react";
// import { Bell, Menu, Moon, Settings, Sun } from "lucide-react";
// import Link from "next/link";
// import { useAppDispatch, useAppSelector } from "@/app/redux";
// import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";

// const Navbar = () => {
//   const dispatch = useAppDispatch();
//   const isSidebarCollapsed = useAppSelector(
//     (state) => state.global.isSidebarCollapsed
//   );

//   const isDarkMode = useAppSelector((state) => state.global.isDarkMode);


//   const toggleSidebar = () => {
//     dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
//   };

//   const  toggleDarkMode = () => {
//     dispatch(setIsDarkMode(!isDarkMode));
//   }

//   return (
//     <div className="flex justify-between items-center w-full mb-7">
//       {/* LEFT SIDE */}
//       <div className="flex justify-between items-center gap-5">
//         <button
//           className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
//           onClick={toggleSidebar}
//         >
//           <Menu className="w-4 h-4" />
//         </button>
      
//       <div className="relative">
//         <input
//           type="search"
//           placeholder="Start type to search groups & products"
//           className="pl-10 pr-4 py-2 w-50 md:w-60 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500"
//         />

//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Bell className="text-gray-500" size={20} />
//         </div>
//       </div>
//       </div>

//       {/* RIGHT SIDE */}

//       <div className="flex justify-between items-center gap-5">
//         <div className="hidden md:flex justify-between items-center gap-5">
//            <div>
//             <button onClick={toggleDarkMode}>
//               {isDarkMode ? (
//                  <Moon className="cursor-pointer text-gray-500" size={24} />
//              ): (
//               <Sun className="cursor-pointer text-gray-500" size={24} />
//              )}
//             </button>  
//             </div> 
//             <div className="relative">
//                 <Bell className="cursor-pointer text-gray-500" size={24} />
//                 <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full">
//                     3
//                 </span>
//             </div>
//             <hr className="w-0 h-7 border border-solid border-1 border-gray-300 mx-3"/>
//             <div className="flex items-center gap-3 cursor-pointer">
//               <div className="w-9 h-9">
//                 image
//               </div><span className="font-semibold">Akum</span>
//             </div>
//         </div>
//         <Link href="/settings">
//         <Settings className="cursor-pointer text-gray-500" size={24} />
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

"use client";
import React from "react";
import { Bell, LogOut, Menu, Moon, Settings, Sun } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const { data: session } = useSession();

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  return (
    <div className="flex justify-between items-center w-full mb-7">
      {/* LEFT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <button
          className="px-3 py-3 bg-gray-100 dark:bg-white/5 dark:text-slate-300 rounded-full hover:bg-emerald-100 dark:hover:bg-white/10 transition-colors"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="relative">
          <input
            type="search"
            placeholder="Start typing to search groups & products"
            className="pl-10 pr-4 py-2 w-50 md:w-60 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-emerald-500
            dark:border-0 dark:bg-white/5 dark:text-slate-200 dark:placeholder-slate-500 dark:ring-1 dark:ring-inset dark:ring-white/10 dark:focus:ring-2 dark:focus:ring-brand-indigo dark:rounded-custom transition-all"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Bell className="text-gray-500 dark:text-slate-500" size={20} />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex justify-between items-center gap-5">
        {/* Dark Mode Toggle Button  (mr-3) */}
        <button onClick={toggleDarkMode} className="ml-2">
          {isDarkMode ? (
            <Moon className="cursor-pointer text-slate-400 hover:text-white transition-colors" size={24} />
          ) : (
            <Sun className="cursor-pointer text-gray-500" size={24} />
          )}
        </button>
        <div className="relative hidden md:block">
                <Bell className="cursor-pointer text-gray-500 dark:text-slate-400 dark:hover:text-white transition-colors" size={24} />
                 <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 dark:bg-brand-indigo dark:text-white rounded-full">
                     3
                 </span>
             </div>
             <hr className="w-0 h-7 border border-solid border-1 border-gray-300 dark:border-white/10 mx-3 hidden md:block"/>
             <div className="hidden md:flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                {session?.user?.name?.charAt(0) ?? "E"}
              </div>
              <span className="font-semibold dark:text-white/80 text-sm">
                {session?.user?.name ?? "Eugene"}
              </span>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              title="Sign out"
              className="hidden md:flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-gray-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
        {/* Settings Button */}
        <Link href="/settings">
          <Settings className="cursor-pointer text-gray-500 dark:text-slate-400 dark:hover:text-white transition-colors" size={24} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

