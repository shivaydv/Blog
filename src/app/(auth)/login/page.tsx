import { BsGoogle } from "react-icons/bs";
import { Login } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

const page = async () => {
  const session = await auth();
  if (session) redirect("/profile");

  return (
    <div className="container flex h-full w-full flex-col items-center justify-center gap-4 font-mono">
      <div>
        <h2 className="text-center text-3xl font-bold text-foreground">
          Welcome to Shiva&apos;s Blog
        </h2>
        <p className="font-base mt-2 text-center text-muted-foreground">
          Login to your account
        </p>
      </div>
      <form action={Login}>
        <Button type="submit" size={"lg"}>
          <BsGoogle className="mr-2" size={16} /> Login with Google
        </Button>
      </form>
      <Link
        href={"/"}
        className="font-semibold transition-all hover:underline hover:underline-offset-4"
      >
        Go Home
      </Link>
    </div>
  );
};

export default page;
