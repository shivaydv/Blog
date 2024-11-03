import type { Editor } from '@tiptap/core'
import React, { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useToast } from "@/components/ui/use-toast"
import { LoadingSpinner } from '@/components/ui/loading-spinner'

interface ImageEditBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  editor?: Editor | null
  close?: () => void
  onImageUpload?: (url: string) => void
}

const ImageEditBlock = ({ editor, className, close, onImageUpload, ...props }: ImageEditBlockProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [link, setLink] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    fileInputRef.current?.click()
  }

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    const formData = new FormData()
    formData.append('file', file)

    try {
      setIsUploading(true)
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      const url = data.secure_url

      if (editor) {
        editor.chain().setImage({ src: url }).focus().run()
      }
      onImageUpload?.(url)
      close?.()
      
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      })
    } catch (error) {
      console.error("Upload failed:", error)
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleLink = () => {
    editor?.chain().focus().setImage({ src: link }).run()
    close?.()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleLink()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={cn('space-y-6', className)} {...props}>
        <div className="space-y-1">
          <Label>Attach an image link</Label>
          <div className="flex">
            <Input
              type="url"
              required
              placeholder="https://example.com"
              value={link}
              className="grow"
              onChange={e => setLink(e.target.value)}
              disabled={isUploading}
            />
            <Button 
              type="submit" 
              className="ml-2 inline-block"
              disabled={isUploading}
            >
              Submit
            </Button>
          </div>
        </div>
        <Button 
          className="w-full" 
          onClick={handleClick}
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <LoadingSpinner className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            "Upload from your computer"
          )}
        </Button>
        <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFile}
          disabled={isUploading}
        />
      </div>
    </form>
  )
}

export { ImageEditBlock }
