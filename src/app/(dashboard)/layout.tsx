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

  return (
    <div className="flex min-h-[100dvh] w-full max-w-7xl mx-auto flex-col ">
      <Navbar heading="Admin Panel" />
      <main className="w-full flex-1 p-4 md:gap-8 md:p-0 ">
        {children}
      </main>
    </div>
  );
}
