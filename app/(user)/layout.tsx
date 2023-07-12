import "../globals.css";
import "../styles.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import Providers from "../components/Provider";
import Banner from "../components/Banner";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  metadataBase: new URL("https://nailedit.vercel.app/"),
  title: { default: "NailedIt", template: "%s | NailedIt" },
  description: "We got this",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nailedit.vercel.app/",
    siteName: "NailedIt",
    images: [
      {
        url: "https://res.cloudinary.com/dqkyatgoy/image/upload/v1689069033/nailedit/Frame_2_yrkykb.png",
        width: 800,
        height: 600,
        alt: "NailedIt",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@nailedit",
    title: "NailedIt",
    description: "We got this",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={inter.className + " px-10 max-w-7xl mx-auto pt-5 lg:pt-0"}
      >
        <Providers>
          <Header />
          <Banner />

          {children}
        </Providers>
      </body>
    </html>
  );
}
