import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://surya6074.github.io/ak-wedding";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Aravindh & Karthiga | Wedding Invitation",
  description:
    "Together with our families, we cordially invite you to celebrate our wedding. 14 & 15 November 2026 at Aaryan Thirumana Mahal, Madurai.",
  openGraph: {
    title: "Aravindh & Karthiga | Wedding Invitation",
    description:
      "Save the Date: 14 & 15 November 2026 | Aaryan Thirumana Mahal, Madurai. Tap to open your personal wedding card.",
    url: siteUrl,
    siteName: "Aravindh & Karthiga Wedding",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Aravindh & Karthiga Wedding Invitation",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aravindh & Karthiga | Wedding Invitation",
    description:
      "Save the Date: 14 & 15 November 2026 | Madurai. Tap to open your personal wedding card.",
    images: [`${siteUrl}/og-image.jpg`],
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
        {/* Direct Open Graph meta tags for WhatsApp & Social Crawlers */}
        <meta property="og:site_name" content="Aravindh & Karthiga Wedding" />
        <meta property="og:title" content="Aravindh & Karthiga | Wedding Invitation" />
        <meta
          property="og:description"
          content="Save the Date: 14 & 15 November 2026 | Aaryan Thirumana Mahal, Madurai. Tap to open your personal invitation card."
        />
        <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />
        <meta property="og:image:secure_url" content={`${siteUrl}/og-image.jpg`} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <link rel="image_src" href={`${siteUrl}/og-image.jpg`} />
      </head>
      <body className="bg-[#FAF7F2] text-[#2C2422] antialiased selection:bg-[#C5A059] selection:text-white overflow-x-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
