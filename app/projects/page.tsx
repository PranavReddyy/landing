'use client'
import { motion } from 'motion/react'
import { XIcon } from 'lucide-react'
import Link from 'next/link'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { PROJECTS } from '../data'
import { useEffect, useState, useRef } from 'react'
import {
    MorphingDialog,
    MorphingDialogTrigger,
    MorphingDialogContent,
    MorphingDialogClose,
    MorphingDialogContainer,
} from '@/components/ui/morphing-dialog'

const VARIANTS_CONTAINER = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
}

const VARIANTS_SECTION = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
    duration: 0.3,
}

type ProjectVideoProps = {
    src?: string;
    link?: string;
}

function ProjectVideo({ src, link }: ProjectVideoProps) {
    if (!src) return null;

    // States for loading and visibility
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        setMounted(true);

        const checkIfMobile = () => {
            const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
            const isMobileDevice = mobileRegex.test(navigator.userAgent) || window.innerWidth < 768;
            setIsMobile(isMobileDevice);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    // Set up intersection observer for lazy loading
    useEffect(() => {
        if (!mounted) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => observer.disconnect();
    }, [mounted]);

    if (!mounted) return null;

    // Loading placeholder
    const placeholder = (
        <div className="aspect-video w-full rounded-xl bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
    );

    // For mobile devices with optional link
    if (isMobile) {
        const videoElement = (
            <>
                {!isLoaded && placeholder}
                <video
                    ref={videoRef}
                    src={isVisible ? src : undefined}
                    autoPlay={isVisible}
                    loop
                    muted
                    playsInline
                    disablePictureInPicture
                    className={`aspect-video w-full rounded-xl ${!isLoaded ? 'opacity-0 absolute' : 'opacity-100'}`}
                    controls={false}
                    onLoadedData={() => setIsLoaded(true)}
                    preload="auto"
                />
            </>
        );

        // If link is provided, make video clickable
        if (link) {
            return (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block cursor-pointer relative"
                >
                    {videoElement}
                </a>
            );
        }

        return <div className="relative">{videoElement}</div>;
    }

    // Desktop version with dialog
    return (
        <MorphingDialog
            transition={{
                type: 'spring',
                bounce: 0,
                duration: 0.3,
            }}
        >
            <MorphingDialogTrigger className="relative">
                {!isLoaded && placeholder}
                <video
                    ref={videoRef}
                    src={isVisible ? src : undefined}
                    autoPlay={isVisible}
                    loop
                    muted
                    playsInline
                    className={`aspect-video w-full cursor-zoom-in rounded-xl ${!isLoaded ? 'opacity-0 absolute' : 'opacity-100'}`}
                    onLoadedData={() => setIsLoaded(true)}
                    preload="auto"
                />
            </MorphingDialogTrigger>
            <MorphingDialogContainer>
                <MorphingDialogContent className="relative max-w-5xl mx-auto aspect-video rounded-2xl bg-zinc-50 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50 flex items-center justify-center">
                    <video
                        src={src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="aspect-video w-full h-auto rounded-xl object-contain"
                    />
                </MorphingDialogContent>
                <MorphingDialogClose
                    className="fixed top-4 right-4 md:top-6 md:right-6 h-fit w-fit rounded-full bg-white p-1 shadow-md"
                    variants={{
                        initial: { opacity: 0 },
                        animate: {
                            opacity: 1,
                            transition: { delay: 0.3, duration: 0.1 },
                        },
                        exit: { opacity: 0, transition: { duration: 0 } },
                    }}
                >
                    <XIcon className="h-4 w-4 md:h-5 md:w-5 text-zinc-500" />
                </MorphingDialogClose>
            </MorphingDialogContainer>
        </MorphingDialog>
    );
}

export default function AllProjects() {
    return (
        <motion.main
            className="space-y-16 md:space-y-24 relative z-10"
            variants={VARIANTS_CONTAINER}
            initial="hidden"
            animate="visible"
        >
            <motion.section
                variants={VARIANTS_SECTION}
                transition={TRANSITION_SECTION}
                className="px-1 md:px-0"
            >
                <div className="flex-1">
                    <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 mb-8">
                        Collection of all my projects across various domains and technologies.
                    </p>
                </div>
            </motion.section>

            <motion.section
                variants={VARIANTS_SECTION}
                transition={TRANSITION_SECTION}
                className="px-1 md:px-0"
            >
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium">All Projects</h3>
                    <Link
                        href="/"
                        className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                    >
                        ← Back home
                    </Link>
                </div>
                <div className="flex flex-col space-y-0">
                    <AnimatedBackground
                        enableHover
                        className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/80"
                        transition={{
                            type: 'spring',
                            bounce: 0,
                            duration: 0.5,
                        }}
                    >
                        {PROJECTS.map((project) => (
                            <div
                                key={project.id}
                                className="group -mx-3 rounded-xl px-3 py-3 relative hover:bg-zinc-50/20 dark:hover:bg-zinc-900/20 transition-all duration-300"
                                data-id={project.id}
                            >
                                {/* Video hover effect (left side, desktop only) */}
                                {project.video && (
                                    <div className="hidden lg:block absolute -translate-x-[110%] top-1/2 -translate-y-1/2 w-1/3 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out group-hover:pointer-events-auto">
                                        <div className="rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50">
                                            <ProjectVideo src={project.video} />
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-col">
                                    {/* Project title that's always visible */}
                                    <div className="flex items-center justify-between">
                                        {project.link ? (
                                            <a
                                                className="font-medium text-zinc-900 transition-colors hover:text-zinc-700 dark:text-zinc-100 dark:hover:text-zinc-300"
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {project.name}
                                            </a>
                                        ) : (
                                            <h4 className="font-medium text-zinc-900 dark:text-zinc-100">
                                                {project.name}
                                            </h4>
                                        )}
                                    </div>

                                    {/* Description with smooth animation (expanding below) */}
                                    <div
                                        className={`
          md:overflow-hidden md:transition-all md:duration-500 md:ease-in-out
          md:max-h-0 md:group-hover:max-h-[200px] 
          md:opacity-0 md:group-hover:opacity-100
          md:mt-0 md:group-hover:mt-3
          md:transform md:translate-y-2 md:group-hover:translate-y-0
          md:pointer-events-none md:group-hover:pointer-events-auto
          mt-3 block
        `}
                                        aria-hidden={true}
                                    >
                                        <div className="flex flex-col space-y-3">
                                            {/* Video displayed only on mobile */}
                                            {project.video && (
                                                <div className="block lg:hidden rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50">
                                                    <ProjectVideo src={project.video} link={project.link} />
                                                </div>
                                            )}

                                            {/* Description text */}
                                            <p className="text-zinc-500 dark:text-zinc-400">
                                                {project.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </AnimatedBackground>
                </div>
            </motion.section>
        </motion.main>
    )
}