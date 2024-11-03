import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Prisma from "../../prisma";
import { FormateDate } from "@/lib/FormateDate";
import { Button } from "./ui/button";
import { Edit } from "lucide-react";

import { DeleteUser, EditUserByAdmin } from "@/actions/userActions";

const Users = async () => {
  const users = await Prisma.user.findMany({
    select: {
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return (
    <>
      <Table>
        <TableCaption>All Registered Users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Registration Date</TableHead>
            <TableHead className="text-center">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.email}>
              <TableCell className="text-nowrap font-medium">
                {user.name}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="text-nowrap">
                {FormateDate(user.createdAt.toString())}
              </TableCell>
              {/* Delete Button */}
              <TableCell className="text-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={"ghost"} size={"sm"}>
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Delete this User</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this user?
                      </DialogDescription>
                    </DialogHeader>

                    <DialogClose className="grid w-full grid-cols-2 gap-2">
                      <Button size={"sm"} variant={"outline"}>
                        Cancle
                      </Button>
                      <form action={DeleteUser} className="w-full">
                        <Input name="email" type="hidden" value={user.email} />

                        <Button
                          type="submit"
                          size={"sm"}
                          variant={"destructive"}
                          className="w-full"
                        >
                          Yes
                        </Button>
                      </form>
                    </DialogClose>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Users;
