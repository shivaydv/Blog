import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { auth } from "@/auth";
import Prisma from "../../prisma";

import { EditUserName } from "@/actions/userActions";

const Settings = async () => {
  const session = await auth();

  const user = await Prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
    select: {
      name: true,
      email: true,
    },
  });

  if (!user?.email || !user?.name) {
    return null;
  }

  return (
    <div className="grid gap-6 py-2">
      <Card>
        <CardHeader>
          <CardTitle>Basic Info</CardTitle>
          <CardDescription>Update your profile information.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" action={EditUserName}>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <div className="flex items-center justify-center gap-2">
                <Input
                  defaultValue={user?.name || ""}
                  id="name"
                  name="name"
                  placeholder={"Enter your name"}
                />
                <Button variant={"outline"} type="submit" size={"lg"}>
                  Update
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                defaultValue={user?.email || ""}
                id="email"
                name="email"
                placeholder={"Enter your email"}
                type="email"
                readOnly={true}
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
