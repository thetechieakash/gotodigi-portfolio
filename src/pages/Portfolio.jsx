import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/Themecontext.jsx'
import { SectionHeader } from '../components/ui.jsx'
import Thumbnail from '../components/Thumbnail.jsx';
import projectService from '../appwrite/projectService.js';
import storageService from '../appwrite/storageService.js';
import { ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa'

function ProjectCard({ project }) {
    return (
        <article className="group overflow-hidden rounded-[34px] border border-black/8 bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(0,0,0,.08)] dark:border-white/10 dark:bg-[#0f0f10]">
            <Link to={`/project/${project.project_slug}`}>
                {/* Thumbnail */}
                <div className="relative aspect-16/10 overflow-hidden">
                    <Thumbnail
                        fileId={project.project_thumbnail}
                        alt={project.project_name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    {/* Overlay */}

                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-80" />
                    {/* Category */}
                    <div className="absolute left-6 top-6">
                        <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold backdrop-blur-xl dark:bg-black/40 dark:text-white">
                            {project.project_categories?.[0] || "Project"}
                        </span>
                    </div>

                    {/* Links */}

                    <div className="absolute right-6 top-6 flex gap-3 opacity-0 transition duration-300 group-hover:opacity-100">
                        {project.live_link && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    window.open(project.live_link, "_blank", "noopener,noreferrer");
                                }}
                                className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black shadow-lg transition hover:scale-110"
                            >
                                <ArrowUpRight size={18} />
                            </button>
                        )}
                        {project.github_link && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    window.open(project.github_link, "_blank", "noopener,noreferrer");
                                }}
                                className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shadow-lg transition hover:scale-110"
                            >
                                <FaGithub size={18} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Content */}

                <div className="relative -mt-30 px-6 pb-6">
                    <div className="rounded-[28px] border border-white/40 bg-white/90 p-6 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-[#161616]/90">
                        <div className="mb-5 flex items-start justify-between gap-4">
                            <div>
                                <h3 className="text-2xl font-bold tracking-tight">
                                    {project.project_name}
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-black/60 dark:text-white/55 line-clamp-3">
                                    {project.project_short_description}
                                </p>
                            </div>
                        </div>

                        {/* Tech */}

                        <div className="mb-6 flex flex-wrap gap-2">
                            {project.tech_stack?.slice(0, 5).map((tech) => (
                                <span
                                    key={tech}
                                    className="rounded-full bg-black/5 px-3 py-1.5 text-xs font-medium transition dark:bg-white dark:text-black"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Footer */}

                        <div className="flex items-center justify-between">
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        window.open(project.live_link, "_blank", "noopener,noreferrer");
                                    }}

                                    className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:scale-105 dark:bg-white dark:text-black"
                                >
                                    Live view
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </article>
    )
}

function ProjectCardSkeleton({ dark }) {
    return (
        <div className="overflow-hidden rounded-[34px] border border-black/8 bg-white dark:border-white/10 dark:bg-[#0f0f10] animate-pulse">
            {/* Image */}
            <div className="aspect-16/10 bg-black/5 dark:bg-white/5" />
            {/* Floating Card */}
            <div className="-mt-12 px-6 pb-6">
                <div className="rounded-[28px] border border-white/40 bg-white/90 p-6 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-[#161616]/90">
                    <div className="h-8 w-48 rounded-full bg-black/10 dark:bg-white/10" />
                    <div className="mt-5 space-y-3">
                        <div className="h-3 rounded-full bg-black/8 dark:bg-white/8" />
                        <div className="h-3 w-10/12 rounded-full bg-black/8 dark:bg-white/8" />
                        <div className="h-3 w-8/12 rounded-full bg-black/8 dark:bg-white/8" />
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-8 w-18 rounded-full bg-black/8 dark:bg-white/8"
                            />
                        ))}
                    </div>
                    <div className="mt-8 flex justify-between">
                        <div className="flex gap-3">
                            <div className="h-11 w-28 rounded-full bg-black/10 dark:bg-white/10" />
                            <div className="h-11 w-24 rounded-full bg-black/10 dark:bg-white/10" />
                        </div>
                        <div className="h-6 w-6 rounded-full bg-black/10 dark:bg-white/10" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Portfolio() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);
    const [projects, setProjects] = useState([])
    useEffect(() => {

        const loadProjects = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await projectService.getProjects({ status: true, featured: true });
                setProjects(data.documents)
            } catch (error) {
                setError(error);
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        loadProjects()
    }, [])

    return (
        <>
            {projects.length > 0 && (
                <SectionHeader
                    eyebrow="// Portfolio"
                    title="Selected Work."
                    subtitle="A collection of products, SaaS platforms, mobile applications, dashboards, and experiments I've designed and developed."
                />
            )}

            {/* Projects */}

            {loading ? (

                <div className="mt-14 grid gap-10 lg:grid-cols-2">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <ProjectCardSkeleton key={index} />
                    ))}
                </div>
            ) : (
                <div className="mt-14 grid gap-10 lg:grid-cols-2">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.$id || project.project_name}
                            project={project}
                        />
                    ))}
                </div>
            )}
            {/* Empty */}
            {!loading && projects.length === 0 && (
                <div className="flex min-h-100 flex-col items-center justify-center">
                    <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-black/5 dark:bg-white/5">
                        <svg
                            width="40"
                            height="40"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 6v12M6 12h12" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-semibold">
                        Projects Coming Soon
                    </h2>
                    <p className="mt-4 max-w-lg text-center text-black/60 dark:text-white/50">
                        I'm currently working on new products and client
                        projects. They'll be published here soon.
                    </p>
                </div>
            )}
            {/* Error */}
            {error && (
                <div className="mt-14 rounded-[28px] border border-red-200 bg-red-50 p-8 text-center dark:border-red-500/20 dark:bg-red-500/10">
                    <h3 className="text-xl font-semibold text-red-600 dark:text-red-400">
                        Failed to load projects
                    </h3>
                    <p className="mt-2 text-sm text-red-500">
                        Please refresh the page and try again.
                    </p>
                </div>
            )}
        </>
    )
}