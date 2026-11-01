import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aravindh & Karthiga — Wedding Invitation",
  description: "Two Hearts... One Journey... With the blessings of our loved ones. Join us in celebrating the wedding of Aravindh and Karthiga on 14th & 15th November 2026 at Aaryan Thirumana Mahal, Madurai.",
  openGraph: {
    title: "Aravindh & Karthiga — Wedding Invitation",
    description: "Two Hearts... One Journey... With the blessings of our loved ones. Save the Date: 14th & 15th November 2026, Madurai.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FAF7F2] text-[#2C2422] antialiased selection:bg-[#C5A059] selection:text-white overflow-x-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
