"use client";

import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function RootLayout({ children }) {
  return (
    <div className="flex flex-col w-full">
      <Header />
      {children}
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}
