import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GetUser } from "@/app/_methods/dal";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A SONG OF ICE AND FIRE WIKI",
  description: "Final Exam",
};

export default async function RootLayout({children, footer, header, sidebar}: LayoutProps<"/">) {
  const user = await GetUser();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header>
          {header}
        </header>
        <div style={{ display: "flex", flex: 1, gap: "1rem", padding: "1rem" }}>
          <div>
            {(user) ? sidebar : null}
          </div>
          <div>
            {children}
          </div>
        </div>
        <footer>
          {footer}
        </footer>
      </body>
    </html>
  );
}
