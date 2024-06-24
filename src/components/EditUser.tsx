"use client";
import React, { useEffect } from "react";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Edit } from "lucide-react";
import { DeleteUser, EditUserByAdmin } from "@/actions/actions";
import { UserRole } from "@prisma/client";

const EditUser = ({ email, role }: { email: string; role: string }) => {
  const [roleValue, setRoleValue] = React.useState(role);


  return (
    <>
      <DialogTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <Edit size={16} />{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <div className="flex w-full items-center justify-between gap-2">
            <Label>User Role</Label>

            <Select  onValueChange={setRoleValue}>
              <SelectTrigger className="w-[180px]">
                <SelectValue  placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="USER">User</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <DialogClose className="w-full grid grid-cols-2 gap-2 py-4">

          <Button size={"sm"} variant={"destructive"} onClick={()=>DeleteUser(email)} >Delete User</Button>
          <Button size={"sm"} onClick={()=>EditUserByAdmin(email, roleValue)}>Save</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </>
  );
};

export default EditUser;
