import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();
  if (!session) redirect("/login");
  return <div>Welcome {session?.user?.name}</div>;
};

export default page;
