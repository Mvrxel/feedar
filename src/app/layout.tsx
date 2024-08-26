import "@/styles/globals.css";

import { type Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ProtectedProvider } from "@/components/ui/protected";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Zenner",
  description: "Zenner is an ai platform for scanning invoices and receipts",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ProtectedProvider>{children}</ProtectedProvider>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
