'use client'
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { NextUIProvider } from "@nextui-org/react";
import headerStyles from './components/Header/header.module.scss';
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { context } from "./contextProvider";
import ContextProvider from "./contextProvider";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



export default function RootLayout({ children }) {

  const pathname = usePathname();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}
      >
        <NextUIProvider>
          <ContextProvider>
            
            {(!pathname.includes("/ScheduledPosts") && !pathname.includes("/login")) ? <Header /> : 

            ( pathname.includes("/ScheduledPosts") ? <div className={headerStyles.headerWrapper}>
                <p className="text-xl text-center my-5"><b>Manage Scheduled Posts</b></p>
              </div> : <></>)}
            {!(pathname.includes("/login")) && <Sidebar />}
            <div className={"childrenWrapper"}>{children}</div>
          </ContextProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}


