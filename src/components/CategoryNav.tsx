"use client";
import Link from "next/link";
import { CATEGORIES as Categories } from "@/config/categories";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export function CategoryNav() {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');

  return (
    <div className="w-full border-b">
      <div className="container">
        <div className="no-scrollbar -mb-px flex items-center gap-2 overflow-x-auto py-1">
          <Link
            href="/"
            className={cn(
              "inline-flex whitespace-nowrap px-3 py-2.5 text-sm font-medium transition-colors hover:text-foreground/80",
              !currentCategory && "border-b-2 border-primary"
            )}
          >
            All Posts
          </Link>
          {Categories.map((category) => (
            <Link
              key={category}
              href={`/?category=${encodeURIComponent(category)}`}
              className={cn(
                "inline-flex whitespace-nowrap px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground/80",
                currentCategory === category && "border-b-2 border-primary text-foreground"
              )}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}