import { Link } from 'react-router-dom';
import { useTheme } from '../context/Themecontext.jsx';
import { SectionHeader, ErrorMsg } from '../components/Ui.jsx';
import blogService from '../appwrite/blogService.js';
import storageService from '../appwrite/storageService.js';
import { useEffect, useState } from 'react';
import Thumbnail from '../components/Thumbnail.jsx';

export default function Blogs() {
    const { dark } = useTheme();
    const [posts, setPosts] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const loadPost = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await blogService.getPossts({ status: true });
                setPosts(data.documents)
            } catch (error) {
                setError(error);
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        loadPost()
    }, [])

    return (
        <>
        {!posts.length === 0 && (
            <SectionHeader
                eyebrow="// blog"
                title="Writing."
                subtitle="Occasional posts about dev stuff, tools, and things I've learned the hard way."
            />
        )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {loading ? (
                    // Render 4 skeletons while loading
                    Array.from({ length: 4 }).map((_, index) => (
                        <BlogSkeleton key={index} dark={dark} />
                    ))
                ) : (
                    posts.map((post) => (
                        <Link
                            key={post.$id}
                            to={`/blogs/${post.article_slug}`}
                            className={` overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${dark ? "bg-[#111] border border-white/10" : "bg-white border border-black/5 shadow-sm"} `}
                        >
                            <Thumbnail
                                fileId={post.article_thumbnail}
                                alt={post.article_title}
                                className="h-60 w-full rounded-3xl"
                            />

                            <div className="p-6">
                                <div className="mb-3 flex items-center justify-between">
                                    <time
                                        className={`text-xs ${dark
                                            ? "text-white/80"
                                            : "text-black/80"
                                            }`}
                                    >
                                        {new Date(post.$createdAt).toLocaleDateString()}
                                    </time>

                                    {/* <span
                                            className={`text-xs ${dark
                                                ? "text-white/40"
                                                : "text-black/40"
                                                }`}
                                        >
                                            {post.readTime || "5 min"}
                                        </span> */}
                                </div>

                                <h2 className="line-clamp-2 text-xl font-bold">
                                    {post.article_title}
                                </h2>

                                <p
                                    className={`mt-3 line-clamp-3 text-sm leading-6 ${dark
                                        ? "text-white/60"
                                        : "text-black/60"
                                        }`}
                                >
                                    {post.artical_short_description}
                                </p>

                                <div className="mt-6">
                                    <span className="font-medium text-accent">
                                        Read article →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    )))
                }
            </div>
            {!loading && posts.length === 0 && (
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
            {error && (
                <div className="mt-14 rounded-[28px] border border-red-200 bg-red-50 p-8 text-center dark:border-red-500/20 dark:bg-red-500/10">
                    <h3 className="text-xl font-semibold text-red-600 dark:text-red-400">
                        Failed to load posts
                    </h3>
                    <p className="mt-2 text-sm text-red-500">
                        Please refresh the page and try again.
                    </p>
                </div>
            )}
        </>
    )
}

const BlogSkeleton = ({ dark }) => {
    return (
        <div
            className={`overflow-hidden rounded-3xl border transition-all duration-300 animate-pulse ${dark
                ? "bg-[#111] border-white/10"
                : "bg-white border-black/5 shadow-sm"
                }`}
        >
            {/* Thumbnail Skeleton */}
            <div className={`h-52 w-full ${dark ? "bg-white/5" : "bg-black/5"}`} />

            {/* Content Container */}
            <div className="p-6">
                {/* Meta Info: Date and Read Time */}
                <div className="mb-4 flex items-center justify-between">
                    <div className={`h-3 w-16 rounded-full ${dark ? "bg-white/10" : "bg-black/5"}`} />
                    <div className={`h-3 w-12 rounded-full ${dark ? "bg-white/10" : "bg-black/5"}`} />
                </div>

                {/* Title Lines */}
                <div className="space-y-2">
                    <div className={`h-5 w-5/6 rounded-lg ${dark ? "bg-white/10" : "bg-black/10"}`} />
                    <div className={`h-5 w-2/3 rounded-lg ${dark ? "bg-white/10" : "bg-black/10"}`} />
                </div>

                {/* Description Lines */}
                <div className="mt-4 space-y-2">
                    <div className={`h-3.5 w-full rounded-md ${dark ? "bg-white/5" : "bg-black/5"}`} />
                    <div className={`h-3.5 w-full rounded-md ${dark ? "bg-white/5" : "bg-black/5"}`} />
                    <div className={`h-3.5 w-3/4 rounded-md ${dark ? "bg-white/5" : "bg-black/5"}`} />
                </div>

                {/* Read Article Link Indicator */}
                <div className="mt-6">
                    <div className={`h-4 w-24 rounded-md ${dark ? "bg-white/10" : "bg-black/10"}`} />
                </div>
            </div>
        </div>
    );
};