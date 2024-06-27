"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useSession } from "next-auth/react";
import { EditUserName } from "@/actions/userActions";

const Settings = () => {
  const session = useSession();

  const [edit, setEdit] = React.useState(false);

  const [newName, setNewName] = React.useState(session.data?.user?.name || "");

  const handlesubmit = (e: React.FormEvent, newName: string, email: string) => {
    e.preventDefault();
    EditUserName(newName, email);
    setEdit(!edit);
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Info</CardTitle>
          <CardDescription>Update your profile information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>

            <Input
              defaultValue={session.data?.user?.name || ""}
              onChange={(e) => setNewName(e.target.value)}
              id="name"
              placeholder={"Enter your name"}
              readOnly={edit ? false : true}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              defaultValue={session.data?.user?.email || ""}
              id="email"
              placeholder={"Enter your email"}
              type="email"
              readOnly={edit ? false : true}
            />
          </div>
          <div className="space-y-2"></div>
        </CardContent>
        <CardFooter className="border-t p-6">
          {edit ? (
            <Button
              onClick={(e) =>
                handlesubmit(e, session.data?.user?.email || "", newName)
              }
            >
              Save
            </Button>
          ) : (
            <Button onClick={() => setEdit(!edit)}>Edit</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Settings;
