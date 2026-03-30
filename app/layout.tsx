import type { Metadata, Viewport } from "next";
import { Geologica } from "next/font/google";
import { PwaRegister } from "@/components/pwa-register";
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
  applicationName: "LexNext Lab",
  manifest: "/LEXNEXTLAB/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: "LexNext Lab",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
  icons: {
    icon: [
      { url: "/LEXNEXTLAB/favicon.ico", sizes: "any" },
      {
        url: "/LEXNEXTLAB/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/LEXNEXTLAB/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [{ url: "/LEXNEXTLAB/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#204889",
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
        <PwaRegister />
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
