"use client";
import { CreatePost } from "@/actions/actions";
import Test from "@/components/Test";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

import Link from "next/link";

import React, { useActionState, useRef } from "react";

const page = () => {
  const [value, setValue] = React.useState("");
  


  return (
   
      <form action={CreatePost} className="flex flex-col gap-4">
        <div className="w-full flex items-center justify-between">
      <Link href={"/admin"} className="flex justify-center items-center gap-1"><ArrowLeft size={16}/> Go Back</Link>
      <Button type="submit" className="justify-center">
          Publish
        </Button>
        </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Create New Blog Post</h1>
        <p className="text-muted-foreground">
          Fill out the form below to create a new blog post.
        </p>
      </div>
        <div className="grid gap-6 px-6">    
        
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input name="title" id="title" placeholder="Enter a title" />
        
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Input
          name="description"
            id="description"
            placeholder="Enter a description"
            className=""
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="keywords">Keywords</Label>
          <Input
            id="keywords"
            name="keywords"
            placeholder="Enter keywords (separated by commas)"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="content">Content</Label>
          <Input
            id="content"
            name="content"
            type="hidden"
            placeholder="Enter content"
            value={value}
          />
          <MinimalTiptapEditor
            value={value}
            onValueChange={setValue}
            outputValue="html"
            disabled={false}
            contentClass="max-w-4xl  mx-auto "
          />
          <div />
        </div>
        
        </div>
      </form>
    
  );
};

export default page;
