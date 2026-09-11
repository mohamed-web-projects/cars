import type { Metadata, Viewport } from "next";
import { Anton, Rowdies, Acme, Sour_Gummy } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CompareProvider } from "@/lib/compare-context";
import { CompareDrawer } from "@/components/CompareDrawer";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const rowdies = Rowdies({
  variable: "--font-rowdies",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

const acme = Acme({
  variable: "--font-acme",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const sourGummy = Sour_Gummy({
  variable: "--font-sour-gummy",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://autovault.example.com"),
  title: {
    default: "AutoVault — The Modern Automotive Encyclopedia",
    template: "%s | AutoVault",
  },
  description:
    "A 2026-grade automotive platform: explore car segments, compare fuels and specs, and visualize car parts with modern interactive tools.",
  keywords: ["cars", "automotive", "car segments", "fuel comparison", "car parts", "upm"],
  openGraph: {
    title: "AutoVault — The Modern Automotive Encyclopedia",
    description:
      "Explore car segments, compare fuels and specs, and visualize car parts.",
    type: "website",
    siteName: "AutoVault",
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoVault — The Modern Automotive Encyclopedia",
    description:
      "Explore car segments, compare fuels and specs, and visualize car parts.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0c12" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${anton.variable} ${rowdies.variable} ${acme.variable} ${sourGummy.variable} min-h-screen antialiased selection:bg-primary/20`}
      >
        <ThemeProvider>
          <CompareProvider>
            <ScrollProgress />
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
            >
              Skip to content
            </a>
            <Navbar />
            <main id="main" className="min-h-screen overflow-x-clip">
              {children}
            </main>
            <Footer />
            <CompareDrawer />
          </CompareProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}