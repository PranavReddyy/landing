'use client'
import { TextMorph } from '@/components/ui/text-morph'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { useEffect, useState } from 'react'

function CopyButton() {
  const [text, setText] = useState('Copy')
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  useEffect(() => {
    setTimeout(() => {
      setText('Copy')
    }, 2000)
  }, [text])

  return (
    <button
      onClick={() => {
        setText('Copied')
        navigator.clipboard.writeText(currentUrl)
      }}
      className="font-base flex items-center gap-1 text-center text-sm text-zinc-500 transition-colors dark:text-zinc-400"
      type="button"
    >
      <TextMorph>{text}</TextMorph>
      <span>URL</span>
    </button>
  )
}

export default function LayoutBlogPost({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="pointer-events-none fixed left-0 top-0 z-10 h-12 w-full bg-gray-100 to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] dark:bg-zinc-950" />
      <ScrollProgress
        className="fixed top-0 z-20 h-0.5 bg-gray-300 dark:bg-zinc-600"
        springOptions={{
          bounce: 0,
        }}
      />

      <div className="absolute right-4 top-16 sm:top-20 md:top-24">
        <CopyButton />
      </div>
      <main className="prose prose-gray max-w-full px-4 sm:px-6 md:px-0 mt-16 sm:mt-20 md:mt-24 pb-16 md:pb-20 
        prose-h4:prose-base dark:prose-invert 
        prose-h1:text-lg sm:prose-h1:text-xl prose-h1:font-medium 
        prose-h2:mt-8 sm:prose-h2:mt-12 prose-h2:scroll-m-20 prose-h2:text-base sm:prose-h2:text-lg prose-h2:font-medium 
        prose-h3:text-sm sm:prose-h3:text-base prose-h3:font-medium 
        prose-h4:font-medium 
        prose-h5:text-sm sm:prose-h5:text-base prose-h5:font-medium 
        prose-h6:text-sm sm:prose-h6:text-base prose-h6:font-medium 
        prose-strong:font-medium
        prose-p:text-sm sm:prose-p:text-base
        prose-ul:text-sm sm:prose-ul:text-base
        prose-ol:text-sm sm:prose-ol:text-base
        prose-li:text-sm sm:prose-li:text-base
        prose-code:text-xs sm:prose-code:text-sm
        prose-pre:text-xs sm:prose-pre:text-sm
        prose-img:rounded-lg prose-img:mx-auto">
        {children}
      </main>
    </>
  )
}