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
      <Navbar heading="Shiva Yadav" url="/" />
      <main className="mx-auto max-w-7xl">{children}</main>
      <Footer />
    </>
  );
}
