import Link from "next/link";
import Prisma from "../../../prisma";
import { FormateDate } from "@/lib/FormateDate";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";


export default async function Home() {
  const blogs = await Prisma.post.findMany({
    where: {
      published: true,
    },
    select: {
      title: true,
      description: true,
      slug: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="">
      <header className="">
        <Avatar className="w-16 h-16" >
          <AvatarImage src="/shiva.jpg" alt="Shiva Image"/>
          <AvatarFallback>
            SY
          </AvatarFallback>
        </Avatar>
        <p className=" text-lg font-semibold font-fragment mt-2">Shiva Yadav</p>
        <p className="text font-fragment">Web Devloper & Freelancer</p>
        
      </header>
<Separator className="mt-6"/>  
<h1 className="text-xl font-semibold pb-6 pt-3" >Latest Blogs</h1>    
      <div className=" grid gap-6  md:gap-6 ">
        {blogs.length > 0 ? (
          blogs.map((post) => {
            return (
              <Link
                href={`/post/${post.slug}`}
                key={post.slug}
                className="grid gap-1 font-fragment p-2 shadow-sm bdsg-secondary "
              >
                  <span className="flex items-center text-sm text-muted-foreground md:text-xs">
                    {FormateDate(post.createdAt.toString())}
                  </span>
                <div>
                  <h2 className="line-clamp-1 text-lg sm:text-xl font-bold md:text-2xl ">
                    {post.title}
                  </h2>
                  <p className=" line-clamp-1  text-muted-foreground max-w-2xl">
                    {post.description}
                  </p>
                </div>
                
              </Link>
            );
          })
        ) : (
          <p className="w-full text-center">No Blog found</p>
        )}
      </div>
    </div>
  );
}
