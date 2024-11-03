"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { Command as Cmdkicon, Search as SearchIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import { SearchPost } from "@/actions/postActions";
import Link from "next/link";
import { FormateDate } from "@/lib/FormateDate";

const Search = () => {
  const initialState = {
    blogs: [],
  };

  const [open, setOpen] = useState(false);
  const [state, formAction] = useFormState(SearchPost, initialState);

  const { blogs } = state;

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open: boolean) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div>
          <div className={"hidden md:block"}>
            <Button
              className={"mr-2 w-48 justify-between rounded-lg"}
              size={"sm"}
              variant={"outline"}
              onClick={() => {
                setOpen(true);
              }}
            >
              Search Blog...
              <div className={"flex items-center justify-center p-1"}>
                <Cmdkicon size={16} />
                <span className={"text-base"}>K</span>
              </div>
            </Button>
          </div>
          <div className={"block md:hidden"}>
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={() => {
                setOpen(true);
              }}
            >
              <SearchIcon size={20} />
            </Button>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-md p-4 md:max-w-2xl">
        <DialogHeader className="py-3">
          <DialogTitle>Search Blog by Title</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          <form action={formAction} className="flex gap-2">
            <Input
              id="search"
              name="search"
              placeholder="Type Something..."
              className="col-span-3"
            />
            <Button type="submit">Search</Button>
          </form>
          <div className="grid gap-2">
            {blogs.length > 0 ? (
              blogs.map((item: any) => (
                <Link
                  onClick={() => setOpen(false)}
                  href={`/post/${item.slug}`}
                  key={item.slug}
                  className="rounded-md bg-muted p-2"
                >
                  <span className="flex items-center text-sm text-muted-foreground">
                    {FormateDate(item.createdAt.toString())}
                  </span>
                  <h2 className="line-clamp-1 font-semibold md:text-lg">
                    {item.title}
                  </h2>
                </Link>
              ))
            ) : (
              <p className="w-full text-center">No Blog Found</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Search;
