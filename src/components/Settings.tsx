
"use client"
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
import { MinimalTiptapEditor } from './minimal-tiptap'
import { MDXRemote } from "next-mdx-remote/rsc";




const Settings = () => {

    const [edit , setEdit] = React.useState(false)
  

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
            
            <Input defaultValue={"Shiva Yadav"}  id="name" placeholder={ "Enter your name"} readOnly={edit?false:true}  />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input defaultValue={"shivayadav@gmail.com"} id="email" placeholder={"Enter your email"} type="email" readOnly={edit?false:true}  />
          </div>
          <div className="space-y-2">
          
          
  
            
          </div>
        </CardContent>
        <CardFooter className="border-t p-6">
          <Button onClick={() => setEdit(!edit)}>{edit ? "Save" : "Edit"}</Button>
        </CardFooter>
      </Card>
    </div>
  );
};



export default Settings;
