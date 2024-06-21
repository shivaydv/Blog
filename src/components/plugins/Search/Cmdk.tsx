import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import Link from "next/link";

import { CommandLoading } from "cmdk";

const Post = [
  {
    id: 1,
    title: "How to Build a Successful Blog",
    author: "Tim Burton",
    date_published: "2022-01-19",
    content:
      "Building a successful blog takes time, effort, and dedication. It's not just about writing; it's about creating valuable content that resonates with your readers. Start by identifying your niche and understanding your audience's needs. Consistency is key – keep a regular posting schedule and always engage with your audience through comments and social media. Remember to promote your blog on various platforms and consider collaborations with other bloggers to expand your reach. Over time, with perseverance and the right strategy, you'll see growth and success in your blogging journey.",
  },
  {
    id: 2,
    title: "The Importance of Self-Care for Bloggers",
    author: "Mary Smith",
    date_published: "2022-01-12",
    content:
      "Blogging, while  rewarding, can also be stressful and demanding. That's why self-care is pivotal for bloggers. Many bloggers face burnout, especially when they're juggling their blog with other commitments. It's vital to take breaks, prioritize mental health, and engage in activities outside blogging. Whether it's reading a book, taking a short vacation, or even just a walk in the park, these activities can rejuvenate the mind. Remember, a well-rested and happy blogger produces better content!",
  },
  {
    id: 3,
    title: "Maximizing Engagement on Your Blog",
    author: "John Seele",
    date_published: "2022-01-05",
    content:
      "Engagement is the lifeline of any blog. When readers interact with your content, it's a sign they value your insights. To boost engagement, focus on crafting compelling content that offers solutions to your readers' challenges. Use eye-catching images, infographics, and engaging headlines. Encourage discussions by asking open-ended questions at the end of your posts. Engage with your readers in the comments, showing them you value their opinions. Additionally, sharing your posts on social media and encouraging readers to do the same can significantly boost engagement levels.",
  },
  {
    id: 4,
    title: "How to Monetize Your Blog",
    author: "Jane Smith",
    date_published: "2022-02-03",
    content:
      "Monetizing a blog is a goal for many bloggers. Thankfully, there are numerous ways to achieve this. Ad networks, like Google AdSense, can be a steady revenue source. Affiliate marketing, where you earn a commission for every sale made through a link on your blog, can be lucrative. Sponsored posts and collaborations with brands can also bring in significant income. Additionally, consider creating and selling digital products, like e-books or courses. Remember, while monetization is important, always prioritize delivering quality content to your readers.",
  },
  {
    id: 5,
    title: "Effective Blogging Strategies for Beginners",
    author: "Peter Wright",
    date_published: "2022-02-10",
    content:
      "Embarking on a blogging journey can seem overwhelming, but with the right strategies, it becomes manageable and enjoyable. First, choose a niche you're passionate about – this will make content creation more authentic. Invest time in keyword research to ensure your posts reach the right audience. Use high-quality images and maintain a clean website layout for a better user experience. Networking with other bloggers can provide valuable insights and potential collaboration opportunities. Lastly, be patient and persistent. Blogging is a marathon, not a sprint, and success often comes to those who persevere.",
  },
  {
    id: 6,
    title: "The Power of Visual Content in Blogging",
    author: "James Brown",
    date_published: "2022-02-17",
    content:
      "In today's digital age, visual content has become an indispensable aspect of blogging. Studies have shown that content accompanied by relevant images receives 94% more views than content without. From infographics, GIFs, to high-quality photographs, visuals not only enhance the aesthetic appeal but also improve comprehension. Embedding videos can further boost engagement, with many users preferring video tutorials over written content. However, always ensure the visuals are relevant and of high quality. Remember, the right visual can often convey what words might take paragraphs to explain.",
  },
  {
    id: 7,
    title: "Harnessing Social Media for Blog Growth",
    author: "Peter Mc. Donald",
    date_published: "2022-02-24",
    content:
      "Social media is a potent tool for bloggers. Platforms like Facebook, Twitter, and Instagram can drive significant traffic to your blog. Start by sharing every new post, but don't stop there. Engage with your followers, join relevant groups, and participate in discussions. Use hashtags effectively to expand your reach. Running paid ad campaigns, especially for cornerstone content, can also yield great returns. However, always be genuine. Social media users can easily discern automated posts from genuine interaction. Nurture your community, and they'll become your blog's best promoters.",
  },
  {
    id: 8,
    title: "The Role of SEO in Successful Blogging",
    author: "Janet Smithey",
    date_published: "2022-03-03",
    content:
      "Search Engine Optimization (SEO) is the backbone of organic blog growth. A well-optimized blog ensures better rankings on search engines, driving consistent and targeted traffic. Start by understanding keyword research and integrate those keywords naturally within your content. But SEO isn't just about keywords. Optimizing meta descriptions, using proper header tags, and creating quality backlinks are crucial. Moreover, site speed and mobile optimization play a significant role in rankings. Keeping abreast of SEO updates and trends is essential as the digital landscape is ever-evolving.",
  },
  {
    id: 9,
    title: "Guest Blogging: Benefits and Best Practices",
    author: "Elon R. Musk",
    date_published: "2022-03-10",
    content:
      "Guest blogging is a two-pronged strategy. For the guest writer, it's an opportunity to tap into a new audience, while for the host blog, it's fresh content from a different perspective. It can boost domain authority through quality backlinks and increase your blog's credibility. When guest blogging, always choose blogs relevant to your niche. Deliver your best content, respecting the guidelines of the host blog. While the primary goal isn't self-promotion, most blogs allow a bio with a link back to your blog, directing potential readers your way.",
  },
  {
    id: 10,
    title: "Understanding Your Blog Analytics",
    author: "Peter Wollanskyi",
    date_published: "2022-03-17",
    content:
      "Blog analytics are more shiva than just numbers; they're insights into your blog's performance. Platforms like Google Analytics provide a wealth of information. Understand metrics like bounce rate, average session duration, and page views. Identify which content resonates most with your audience and which sources drive the most traffic. With these insights, you can refine your content strategy, focusing on what works and improving what doesn’t. Regularly reviewing and acting upon these analytics ensures continuous growth and evolution of your blog.",
  },
];

const Cmdk = ({ open, setOpen }: any) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  // useEffect(() => {

  //   try {
  //     fetch('https://dummyapi.online/api/blogposts')
  //         .then((res) => res.json())
  //         .then((data) => {
  //             setPosts(data.data)
  //         })

  //   } catch (error) {
  //     console.log(error)
  //   }
  //   finally {
  //     setLoading(false)
  //   }

  // }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList className={"max-h-[480px] space-y-4"}>
        {/* {loading && <CommandLoading>Fetching data…</CommandLoading>} */}
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Blogs">
          <div className={"flex flex-col gap-4"}>
            {Post.slice(0, 4).map((post: any) => (
              <Link href={`/blog/${post.id}`}>
                <CommandItem
                  className={"flex flex-col items-start justify-center"}
                >
                  <div>
                    <p>{post.date_published}</p>
                  </div>
                  <span className={"text-lg"}>{post.title}</span>
                </CommandItem>
              </Link>
            ))}
          </div>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default Cmdk;
