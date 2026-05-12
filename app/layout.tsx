import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vietnam Diamond & Zebra Electric Company",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className="h-full antialiased">
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}