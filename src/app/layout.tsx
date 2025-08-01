import type { Metadata } from "next";
import { Kanit, Roboto } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const kanitFont = Kanit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-kanit"
})

const robotoFont = Roboto({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
})

export const metadata: Metadata = {
  title: "ระบบลงทะเบียนหนังสือ",
  description: "สร้างโดยพงษ์ภัทร",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${kanitFont.variable} ${robotoFont.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
