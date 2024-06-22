import { MDXRemote } from "next-mdx-remote/rsc"
import Prisma from "../../../../../prisma"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const page = async({ params }: { params: { slug: string } }) => {

    const post = await Prisma.post.findUnique({
        where:{
            slug:params.slug
        }
    })

  return (
    <div className="max-w-3xl mx-auto relative">
        {/* <Link href="/" className="flex gap-1 justify-start   items-center font-semibold"><ArrowLeft size={16}/>Back</Link> */}
        {
            post?<>
            <h1 className="text-2xl md:text-4xl w-full font-bold font-fragment pb-8">{post.title}</h1>
            <MDXRemote source={post?.content} />
            <div className="bg-red-300  h-screen"></div>
            </>:null
        }

    </div>
  )
}



export default page