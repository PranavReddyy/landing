import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'All Projects | Pranav',
    description: 'Complete list of projects by Pranav',
}

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
        </>
    )
}