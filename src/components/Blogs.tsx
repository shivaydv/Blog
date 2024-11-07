"use client";
import React from "react";
import Prisma from "../../prisma";
import {
  Table,
  TableBody,
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

import { Input } from "@/components/ui/input";
import { FormateDate } from "@/lib/FormateDate";
import { Button } from "./ui/button";
import { DeletePost } from "@/actions/postActions";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

const Blogs = ({ posts }: { posts: any[] }) => {
  const { toast } = useToast();

  const handleDelete = async (formData: FormData) => {
    try {
      await DeletePost(formData);
      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid gap-4 py-2">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-semibold">All Posts</h1>
        <Button size={"sm"} asChild>
          <Link href={"/admin/create-blog"}>Create New Post</Link>
        </Button>
      </div>

      {posts?.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Published Date</TableHead>
              <TableHead className="text-center">Edit</TableHead>
              <TableHead className="text-center">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.slug}>
                <TableCell className="line-clamp-2 w-full text-nowrap font-semibold">
                  {post.title.slice(0, 100)}
                </TableCell>
                <TableCell className="text-nowrap">
                  {FormateDate(post.createdAt.toString())}
                </TableCell>
                <TableCell className="text-center">
                  <Button variant={"ghost"} asChild size={"sm"}>
                    <Link href={`/admin/edit/${post.slug}`}>Edit</Link>
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant={"ghost"} size={"sm"}>
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Delete this Post</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this Post?
                        </DialogDescription>
                      </DialogHeader>

                      <DialogClose className="grid w-full grid-cols-2 gap-2">
                        <Button size={"sm"} variant={"outline"}>
                          Cancel
                        </Button>
                        <form action={handleDelete} className="w-full">
                          <Input name="slug" type="hidden" value={post.slug} />

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
      ) : (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed">
          <div className="flex flex-col items-center justify-center gap-2">
            <h3 className="text-xl font-semibold">No Posts Found</h3>
            <p className="text-sm text-muted-foreground">
              Get started by creating your first blog post
            </p>
            <Button asChild className="mt-4" size="sm">
              <Link href="/admin/create-blog">Create New Post</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
