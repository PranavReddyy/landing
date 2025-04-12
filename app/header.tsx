'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'
import { Magnetic } from '@/components/ui/magnetic'
import { FileTextIcon } from 'lucide-react'
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
          delay: 1.2, // Delay after the tagline finishes
          duration: 0.6 // Slightly longer fade-in for emphasis
        }}
      >
        <Magnetic springOptions={{ bounce: 0 }} intensity={0.2}>
          <a
            href="https://drive.google.com/file/d/1t3XBOx93yL8K6bfe01h37aUTYJ27Jake/view?usp=sharing"
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