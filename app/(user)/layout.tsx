import "../globals.css";

import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      <div className="px-5 sm:px-10">
        <Banner />
        {children}
      </div>
      <Footer />
    </div>
  );
}
