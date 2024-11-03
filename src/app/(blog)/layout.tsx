import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar heading="Blog" url="/" />
      <main className="container flex-1">{children}</main>
      <Footer />
    </>
  );
}
