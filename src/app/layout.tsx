import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paco's Taco Shop - Authentic Mexican Food",
  description:
    "Authentic Mexican Food, made fresh daily with recipes passed down through generations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-taco-cream text-taco-dark font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
