"use client";
import { CreatePost, EditPost } from "@/actions/postActions";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useState, useRef, useTransition } from "react";
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES } from "@/config/categories";

const EditBlog = ({
  title,
  description,
  content,
  slug,
  category,
  bannerImage,
}: {
  title?: string;
  description?: string;
  content?: string;
  slug?: string;
  category?: string;
  bannerImage?: string;
}) => {
  const [value, setValue] = useState(content || "");
  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();
  const [localImagePreview, setLocalImagePreview] = useState<string | null>(bannerImage || null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        // Add the category to formData
        formData.set('category', selectedCategory);
        
        // Handle banner image
        if (imageFile) {
          const formDataForImage = new FormData();
          formDataForImage.append('file', imageFile);
          
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formDataForImage,
          });

          if (!response.ok) {
            throw new Error('Failed to upload image');
          }

          const data = await response.json();
          formData.set('bannerImage', data.secure_url);
        } else if (bannerImage) {
          formData.set('bannerImage', bannerImage);
        }

        // Submit the form
        const result = slug ? await EditPost(formData) : await CreatePost(formData);

        if (result?.errors) {
          console.log("Validation errors:", result.errors);
          
          // Create a more detailed error message
          const errorMessages = Object.entries(result.errors)
            .map(([field, errors]) => `${field}: ${errors.join(', ')}`)
            .join('\n');
          
          toast({
            title: "Validation Error",
            description: errorMessages,
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Success",
          description: slug ? "Post updated successfully" : "Post created successfully",
        });

        router.push('/admin');
        router.refresh();
      } catch (error) {
        console.error("Error:", error);
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setLocalImagePreview(previewUrl);
    }
  };

  return (
    <form action={handleSubmit} className="flex flex-col gap-6 pb-16">
      <div className="flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2 font-medium">
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
        <Button disabled={isPending} type="submit">
          {isPending ? (
            <>
              <LoadingSpinner className="mr-2 h-4 w-4 animate-spin" />
              {slug ? "Updating..." : "Publishing..."}
            </>
          ) : (
            <>{slug ? "Update" : "Publish"}</>
          )}
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
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Select 
            name="category" 
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="bannerImage">Banner Image</Label>
          <Input
            type="file"
            accept="image/*"
            name="bannerImage"
            id="bannerImage"
            onChange={handleImageChange}
          />
          {localImagePreview && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <img
                src={localImagePreview}
                alt="Banner preview"
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="content">Content</Label>
          <Input
            id="content"
            name="content"
            type="hidden"
            value={value}
          />
          <MinimalTiptapEditor
            value={value}
            onValueChange={setValue}
            outputValue="html"
            disabled={false}
            contentClass="max-w-4xl mx-auto"
          />
          {slug && <Input id="slug" name="slug" type="hidden" value={slug} />}
        </div>
      </div>
    </form>
  );
};

export default EditBlog;
