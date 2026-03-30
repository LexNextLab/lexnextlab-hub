import type { Metadata, Viewport } from "next";
import { Geologica } from "next/font/google";
import { PwaRegister } from "@/components/pwa-register";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

/** Base absoluta para og:image / Twitter — necessário em previews (WhatsApp, etc.) */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

const geologica = Geologica({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const title = "LexNext Lab | Sistemas internos";
const description = "Acesso aos sistemas internos do escritório.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
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
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "LexNext Lab",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/LEXNEXTLAB/LOGO.png",
        alt: "LexNext Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/LEXNEXTLAB/LOGO.png"],
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
