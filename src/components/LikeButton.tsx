"use client";

import { toggleLike } from "@/actions/interactionActions";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useTransition } from "react";
import { LoginDialog } from "./LoginDialog";
import { useState } from "react";

interface LikeButtonProps {
  postId: string;
  isLiked: boolean;
  likesCount: number;
  isLoggedIn: boolean;
}

export function LikeButton({ postId, isLiked, likesCount, isLoggedIn }: LikeButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const handleLike = () => {
    if (!isLoggedIn) {
      setShowLoginDialog(true);
      return;
    }
    startTransition(() => toggleLike(postId));
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="gap-2"
        onClick={handleLike}
        disabled={isPending}
      >
        <Heart
          className={`h-5 w-5 ${
            isLiked ? "fill-red-500 text-red-500" : "text-gray-500"
          }`}
        />
        <span>{likesCount}</span>
      </Button>

      <LoginDialog 
        open={showLoginDialog} 
        onOpenChange={setShowLoginDialog}
      />
    </>
  );
} 