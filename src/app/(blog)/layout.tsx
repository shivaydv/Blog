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
      <main className="container my-8 flex-1 md:my-10">{children}</main>
      <Separator />
      <Footer />
    </>
  );
}
