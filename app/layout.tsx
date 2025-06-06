import type { Metadata } from "next";
import "./globals.css";
import { geistMono, geistSans } from "@/utils/fonts";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Desyn",
  description: "Your creativity finally measured",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster richColors position="top-center" />
        {children}
      </body>
    </html>
  );
}
