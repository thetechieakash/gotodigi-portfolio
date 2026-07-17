import { useEffect, useMemo, useState } from "react";
import { Search, Plus, Pencil, Trash2, ChevronLeft, ChevronRight, } from "lucide-react";
import { Link } from "react-router-dom";
import blogService from "../../appwrite/blogService.js";
import { toast } from "sonner";

export default function Posts() {
    const perPage = 10;

    const [posts, setPosts] = useState([]);
    const [total, setTotal] = useState(0);

    const [search, setSearch] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const [sort, setSort] = useState("newest");
    const [status, setStatus] = useState("all");
    const [page, setPage] = useState(1);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchTerm(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        setPage(1);
    }, [search, sort, status]);

    const loadPosts = async () => {
        try {
            const result = await blogService.getPosts({
                status:
                    status === "all"
                        ? null
                        : status === "published",
                search: searchTerm,
                sort,
                limit: perPage,
                offset: (page - 1) * perPage,
            });

            setPosts(result.documents);
            setTotal(result.total);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load posts.");
        }
    };

    const handleDelete = async (post) => {
        try {
            if (post.article_thumbnail) {
                await blogService.deleteFile(post.article_thumbnail);
            }
            await blogService.deletePost(post.$id);
            
            toast.error("Post deleted successfully!");
            await loadPosts();
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete post.");
        }
    };

    useEffect(() => {
        loadPosts();
    }, [page, status, sort, searchTerm]);

    const totalPages = Math.ceil(total / perPage);


    return (
        <main className="space-y-8">

            {/* Header */}

            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                <div>
                    <h1 className="text-4xl font-bold">
                        Articles
                    </h1>

                    <p className="mt-2 text-black/60 dark:text-white/60">
                        Manage blog articles.
                    </p>
                </div>

                <Link
                    to="/admin/post/create"
                    className="flex items-center gap-2 rounded-2xl bg-black px-5 py-3 text-white transition hover:opacity-90 dark:bg-white dark:text-black"
                >
                    <Plus size={18} />
                    New Article
                </Link>

            </div>

            {/* Filters */}

            <div className="flex flex-col gap-4 rounded-3xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-dark-card lg:flex-row">

                <div className="relative flex-1">

                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40"
                    />

                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search articles..."
                        className="w-full rounded-2xl border border-black/10 bg-transparent py-3 pl-11 pr-4 outline-none dark:border-white/10"
                    />

                </div>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="rounded-2xl border border-black/10 px-5 dark:border-white/10"
                >
                    <option value="newest">Newest</option>
                    <option value="az">A-Z</option>
                    <option value="za">Z-A</option>
                </select>

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="rounded-2xl border border-black/10 px-5 dark:border-white/10"
                >
                    <option value="all">All</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                </select>

            </div>

            {/* Table */}

            <div className="overflow-hidden rounded-3xl border border-black/10 bg-white dark:border-white/10 dark:bg-dark-card">

                <table className="w-full">

                    <thead className="border-b border-black/10 dark:border-white/10">

                        <tr className="text-left">

                            <th className="px-6 py-5">Title</th>
                            <th>Slug</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th className="text-right pr-6">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {posts.length ? (
                            posts.map((post) => (
                                <tr
                                    key={post.$id}
                                    className="border-b border-black/5 transition hover:bg-black/2 dark:border-white/5 dark:hover:bg-white/2"
                                >
                                    <td className="px-6 py-5 font-medium">
                                        {post.article_title}
                                    </td>

                                    <td className="text-black/60 dark:text-white/60">
                                        {post.article_slug}
                                    </td>

                                    <td>
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs ${post.status
                                                ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300"
                                                }`}
                                        >
                                            {post.status
                                                ? "Published"
                                                : "Draft"}
                                        </span>
                                    </td>

                                    <td>{new Date(post.$createdAt).toLocaleDateString()}</td>

                                    <td>

                                        <div className="flex justify-end gap-2 pr-6">

                                            <Link className="rounded-xl p-2 hover:bg-black/5 dark:hover:bg-white/5" to={`/admin/post/update/${post.$id}`}>
                                                <Pencil size={18} />
                                            </Link>

                                            <button className="rounded-xl p-2 text-red-500 hover:bg-red-500/10"
                                                onClick={() => { handleDelete(post) }}
                                            >
                                                <Trash2 size={18} />
                                            </button>

                                        </div>

                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="py-20 text-center text-black/50 dark:text-white/50"
                                >
                                    No articles found.
                                </td>
                            </tr>
                        )}

                    </tbody>

                </table>

            </div>

            {/* Pagination */}

            <div className="flex items-center justify-between">

                <p className="text-sm text-black/50 dark:text-white/50">
                    Showing {total === 0 ? 0 : (page - 1) * perPage + 1}
                    -
                    {Math.min(page * perPage, total)}
                    of {total}
                </p>

                <div className="flex gap-2">

                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="rounded-xl border border-black p-3 disabled:opacity-40 dark:border-white"
                    >
                        <ChevronLeft size={18} />
                    </button>

                    <button
                        disabled={page >= totalPages}
                        onClick={() => setPage(page + 1)}
                        className="rounded-xl border border-black p-3 disabled:opacity-40 dark:border-white"
                    >
                        <ChevronRight size={18} />
                    </button>

                </div>

            </div>

        </main>
    );
}