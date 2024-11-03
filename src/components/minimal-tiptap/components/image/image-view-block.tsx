import { isNumber, NodeViewProps, NodeViewWrapper } from '@tiptap/react'
import { useMemo } from 'react'
import { useImageLoad } from '../../hooks/use-image-load'
import { cn } from '@/lib/utils'
import Image from "next/image";

const ImageViewBlock = ({ editor, node, getPos }: NodeViewProps) => {
  const imgSize = useImageLoad(node.attrs.src)

  const paddingBottom = useMemo(() => {
    if (!imgSize.width || !imgSize.height) {
      return 0
    }

    return (imgSize.height / imgSize.width) * 100
  }, [imgSize.width, imgSize.height])

  return (
    <NodeViewWrapper>
      <div draggable data-drag-handle>
        <figure>
          <div className="relative w-full" style={{ paddingBottom: `${isNumber(paddingBottom) ? paddingBottom : 0}%` }}>
            <div className="absolute h-full w-full">
              <div
                className={cn('relative h-full max-h-full w-full max-w-full rounded transition-all')}
                style={{
                  boxShadow: editor.state.selection.from === getPos() ? '0 0 0 1px hsl(var(--primary))' : 'none'
                }}
              >
                <div className="relative flex h-full max-h-full w-full max-w-full overflow-hidden">
                  <Image
                    src={node.attrs.src}
                    alt={node.attrs.alt}
                    title={node.attrs.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                  />
                </div>
              </div>
            </div>
          </div>
        </figure>
      </div>
    </NodeViewWrapper>
  )
}

export { ImageViewBlock }
