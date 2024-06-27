"use client";
import { CreatePost, EditPost } from "@/actions/postActions";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

import Link from "next/link";

import React, { useState } from "react";

const EditBlog = ({
  title,
  description,
  content,
  slug,
}: {
  title?: string;
  description?: string;
  content?: string;
  slug?: string;
}) => {
  const [value, setValue] = useState(content || "");
  return (
    <form action={slug ? EditPost : CreatePost} className="flex flex-col gap-4">
      <div className="flex w-full items-center justify-between">
        <Link
          href={"/admin"}
          className="flex items-center justify-center gap-1 font-semibold"
        >
          <ArrowLeft size={16} />
          Go Back
        </Link>
        <Button type="submit" className="justify-center">
          {slug ? "Update" : "Publish"}
        </Button>
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">
          {slug ? "Edit Blog Post" : "Create New Blog Post"}
        </h1>
        <p className="text-muted-foreground">
          {slug
            ? "Fill out the form below to edit a blog post."
            : "Fill out the form below to create a new blog post."}
        </p>
      </div>
      <div className="grid gap-6 px-6">
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            defaultValue={title || ""}
            name="title"
            id="title"
            placeholder="Enter a title"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Input
            defaultValue={description || ""}
            name="description"
            id="description"
            placeholder="Enter a description"
            className=""
          />
        </div>
        {/* <div className="grid gap-2">
          <Label htmlFor="keywords">Keywords</Label>
          <Input
            id="keywords"
            name="keywords"
            placeholder="Enter keywords (separated by commas)"
          />
        </div> */}
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
          {slug && <Input id="slug" name="slug" type="hidden" value={slug} />}
        </div>
      </div>
    </form>
  );
};

export default EditBlog;
