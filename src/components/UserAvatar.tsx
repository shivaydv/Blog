import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Logout } from "@/actions/authActions";
import Image from "next/image";

export default async function UserAvatar() {
  const session = await auth();

  if (session)
    return (
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={"icon"} variant={"ghost"}>
              <Avatar className="h-8 w-8">
                <AvatarImage asChild>
                  <Image
                    src={session?.user?.image!}
                    alt="Profile Picture"
                    width={40}
                    height={40}
                  />
                </AvatarImage>
                <AvatarFallback>
                  {session?.user?.name?.charAt(0)}
                </AvatarFallback>
                <span className="sr-only">Toggle user menu</span>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-6 mt-4">
            {session?.user?.role === "ADMIN" && (
              <Link href={"/admin"}>
                <DropdownMenuItem>Admin Panel</DropdownMenuItem>
              </Link>
            )}

            <DialogTrigger asChild>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to logout?
            </DialogDescription>
          </DialogHeader>
          <div className="flex w-full items-center justify-center gap-2">
            <DialogClose>
              <Button>Cancel</Button>
            </DialogClose>
            <DialogClose>
              <form action={Logout}>
                <Button type="submit" variant={"destructive"}>
                  Logout
                </Button>
              </form>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    );

  return (
    <Link href={"/login"} className={buttonVariants({ variant: "ghost" })}>
      Login
    </Link>
  );
}
