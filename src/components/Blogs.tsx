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

const Blogs = async () => {
  const blogs = await Prisma.post.findMany({
    select: {
      title: true,
      slug: true,
      createdAt: true,
    },
  });

  return (
    <div className="grid gap-4 py-2">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-semibold"> All Posts</h1>
        <Button size={"sm"} asChild>
          <Link href={"/admin/create-blog"}>Create New Post</Link>
        </Button>
      </div>

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
          {blogs.map((post) => (
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
                        Cancle
                      </Button>
                      <form action={DeletePost} className="w-full">
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
    </div>
  );
};

export default Blogs;
