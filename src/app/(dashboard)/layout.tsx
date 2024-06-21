import { auth } from "@/auth";
import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();

  if (!session) redirect("/login");
  if(session?.user?.role !== "ADMIN") redirect("/profile")

  return (
    <div className="">
      <Navbar />
      {children}
    </div>
  );
}
