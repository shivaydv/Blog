
import { BsGithub, BsGoogle } from "react-icons/bs";
import {  Login, LoginbyGithub, LoginbyGoogle } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const page = async () => {
  const session = await auth();
  if (session) redirect("/profile");

  return (
    <div className="flex flex-col h-[100dvh] w-full md:flex-row ">
    <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 w-full md:w-1/2 h-full">
          
        <div className="space-y-4 max-w-md">
          <h2 className="text-center text-3xl font-bold text-foreground">
            Sign in to your account
          </h2>
        <p className="text-muted-foreground text-center">
              Welcome to our Website! <br/>We're excited to have you on board.
            </p>
          
          <div className="flex justify-evenly items-center gap-2 max-md:flex-col">
          <form  action={LoginbyGoogle}>

        <Button variant={"outline"} className="w-full" type="submit" size={"lg"}>
          <BsGoogle className="mr-2" size={16} /> Login with Google
        </Button>
          </form>
          <form  action={LoginbyGithub}>

        <Button variant={"outline"}  className="w-full" type="submit" size={"lg"}>
          <BsGithub className="mr-2" size={16} /> Login with Github
        </Button>
          </form>
      </div>
            
          <div className="flex justify-center">
              <Link href="/" className="text-sm font-medium text-primary hover:text-primary/80" prefetch={false}>
                Go Home
              </Link>
            </div>
        </div>
      
    </div>
    <div className="flex items-center justify-center w-full max-md:hidden md:w-1/2 bg-muted">
      <Image src="/login.svg" width={500} height={500} alt="Sign in illustration" className="max-w-[300px] lg:max-w-[450px]" />
    </div>
  </div>
  );
};

export default page;


