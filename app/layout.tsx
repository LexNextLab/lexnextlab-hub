import type { Metadata } from "next";
import { Geologica } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geologica = Geologica({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LexNext Lab | Sistemas internos",
  description: "Acesso aos sistemas internos do escritório.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geologica.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh min-w-0 flex-col overflow-x-hidden font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <TooltipProvider delay={280}>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
