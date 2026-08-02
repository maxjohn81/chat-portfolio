import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Public_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { JsonLd } from "@/components/json-ld";

const publicSansHeading = Public_Sans({ subsets: ['latin'], variable: '--font-heading' });
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rivo-andriharisoa-site.vercel.app"),
  title: {
    default: "Rivo Andriharisoa — Développeur full-stack web et mobile",
    template: "%s | Rivo Andriharisoa",
  },
  description:
    "Portfolio interactif de Rivo Andriharisoa, développeur full-stack web et mobile. Découvrez mes compétences, mes projets et mon parcours en conversation.",
  keywords: [
    "Rivo Andriharisoa",
    "développeur full-stack",
    "développeur web Madagascar",
    "développeur mobile",
    "portfolio développeur",
  ],
  openGraph: {
    title: "Rivo Andriharisoa — Développeur full-stack web et mobile",
    description: "Portfolio interactif — découvrez mon profil en conversation.",
    url: "https://rivo-andriharisoa-site.vercel.app",
    siteName: "Rivo Andriharisoa",
    locale: "fr_FR",
    type: "website",
    images: ["/icon.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rivo Andriharisoa — Développeur full-stack web et mobile",
    description: "Portfolio interactif — découvrez mon profil en conversation.",
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "Tesal_14wv9pNIiP6VDxejXLfzC5kpq1HEGuwETsOiI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
       suppressHydrationWarning
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable, publicSansHeading.variable)}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}