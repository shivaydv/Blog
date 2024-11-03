"use client";

import { addComment } from "@/actions/interactionActions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormateDate } from "@/lib/FormateDate";
import { useRef, useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    name: string;
    image: string | null;
  };
}

export function Comments({
  comments,
  postId,
  isLoggedIn,
}: {
  comments: Comment[];
  postId: string;
  isLoggedIn: boolean;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Comments</h2>
      
      <form
        ref={formRef}
        action={(formData) => {
          if (!isLoggedIn) {
            setShowLoginDialog(true);
            return;
          }
          startTransition(async () => {
            await addComment(formData);
            formRef.current?.reset();
          });
        }}
        className="space-y-4"
      >
        <input type="hidden" name="postId" value={postId} />
        <Textarea
          name="content"
          placeholder="Write a comment..."
          required
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Posting..." : "Post Comment"}
        </Button>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <Avatar>
              <AvatarImage src={comment.user.image || undefined} />
              <AvatarFallback>
                {comment.user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{comment.user.name}</span>
                <span className="text-sm text-muted-foreground">
                  {FormateDate(comment.createdAt.toString())}
                </span>
              </div>
              <p className="text-sm">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign in required</DialogTitle>
            <DialogDescription>
              Please sign in to comment on this post
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowLoginDialog(false)}>
              Cancel
            </Button>
            <Button asChild>
              <Link href="/login">Sign in</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 