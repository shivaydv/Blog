import { BsGithub, BsGoogle } from "react-icons/bs";
import { LoginbyGithub, LoginbyGoogle } from "@/actions/authActions";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const page = async () => {
  const session = await auth();
  if (session) redirect("/");

  return (
    <div className="flex h-[100dvh] w-full flex-col md:flex-row">
      <div className="flex h-full w-full items-center justify-center px-4 py-12 sm:px-6 md:w-1/2 lg:px-8">
        <div className="max-w-md space-y-4">
          <h2 className="text-center text-3xl font-bold text-foreground">
            Sign in to your account
          </h2>
          <p className="text-center text-muted-foreground">
            Welcome to our Website! <br />
            We&apos;re excited to have you on board.
          </p>

          <div className="flex items-center justify-evenly gap-2 max-md:flex-col">
            <form action={LoginbyGoogle}>
              <Button
                variant={"outline"}
                className="w-full"
                type="submit"
                size={"lg"}
              >
                <BsGoogle className="mr-2" size={16} /> Login with Google
              </Button>
            </form>
            <form action={LoginbyGithub}>
              <Button
                variant={"outline"}
                className="w-full"
                type="submit"
                size={"lg"}
              >
                <BsGithub className="mr-2" size={16} /> Login with Github
              </Button>
            </form>
          </div>

          <div className="flex justify-center">
            <Link
              href="/"
              className="text-sm font-medium text-primary hover:text-primary/80"
              prefetch={false}
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center bg-muted max-md:hidden md:w-1/2">
        <Image
          src="/login.svg"
          width={500}
          height={500}
          alt="Sign in illustration"
          className="max-w-[300px] lg:max-w-[450px]"
        />
      </div>
    </div>
  );
};

export default page;
