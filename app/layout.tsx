'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import React from "react";
import Header from "@/app/components/Header";
import LocalStorageWrapper from "@/app/components/LocalStorageWrapper";
import StoreProvider from "@/app/StoreProvider";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <StoreProvider>
          <LocalStorageWrapper>
              <html lang="en">
                <body className={inter.className}>
                      <Header />
                      <div className='px-10 py-5'>
                        {children}
                      </div>
                </body>
              </html>
          </LocalStorageWrapper>
      </StoreProvider>
  )
}
