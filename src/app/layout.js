import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CineCritic - Movie Reviews",
  description: "Discover and explore movie reviews from our critics",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-white `}
      >
        <Header />
        <main className="container mx-auto px-4 py-8 min-h-screen">
          {children}
        </main>
        <footer className="bg-black py-6 mt-12">
          <div className="container mx-auto px-4 text-center text-gray-400">
            <p>CineCritic © {new Date().getFullYear()} - All rights reserved</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
