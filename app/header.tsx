'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'
import { Magnetic } from '@/components/ui/magnetic'
import { FileTextIcon, FrameIcon } from 'lucide-react' // Using FrameIcon instead of PaletteIcon
import { motion } from 'motion/react'

export function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <Link href="/" className="font-medium text-black dark:text-white">
          Pranav Reddy Mitta
        </Link>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="text-zinc-600 dark:text-zinc-500"
          delay={0.5}
        >
          Designing Interfaces. Building Intelligence.
        </TextEffect>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1.2,
          duration: 0.6
        }}
        className="flex flex-col sm:flex-row items-end sm:items-center gap-3 sm:gap-5" // Stack vertically on mobile
      >
        <Magnetic springOptions={{ bounce: 0 }} intensity={0.2}>
          <a
            href="https://www.figma.com/design/XZ2qDAEvjV2a0Hn7h77En3/itsbypranav.com?node-id=0-1&t=HGlr1go2smDy6Qqo-1"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1 text-sm font-medium text-zinc-800 transition-colors duration-200 hover:text-black dark:text-zinc-400 dark:hover:text-white"
          >
            <FrameIcon className="h-4 w-4" /> {/* Changed to FrameIcon */}
            <span className="border-b border-dotted border-zinc-400 dark:border-zinc-600 group-hover:border-zinc-800 dark:group-hover:border-zinc-300">Portfolio</span>
          </a>
        </Magnetic>

        <Magnetic springOptions={{ bounce: 0 }} intensity={0.2}>
          <a
            href="https://drive.google.com/file/d/1GARXpGb11yEG9ikTVD8yS0IZ5JbrBG0k/view?usp=share_link"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1 text-sm font-medium text-zinc-800 transition-colors duration-200 hover:text-black dark:text-zinc-400 dark:hover:text-white"
          >
            <FileTextIcon className="h-4 w-4" />
            <span className="border-b border-dotted border-zinc-400 dark:border-zinc-600 group-hover:border-zinc-800 dark:group-hover:border-zinc-300">Resume</span>
          </a>
        </Magnetic>
      </motion.div>
    </header>
  )
}