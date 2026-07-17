import { Link } from "react-router-dom";
import {
    FileText,
    FolderKanban,
    Mail,
    Eye,
    Plus,
    ArrowRight,
} from "lucide-react";

function Dashboard() {
    const stats = [
        {
            title: "Articles",
            value: 12,
            icon: FileText,
        },
        {
            title: "Projects",
            value: 8,
            icon: FolderKanban,
        },
        {
            title: "Messages",
            value: 23,
            icon: Mail,
        },
        {
            title: "Views",
            value: "18.4K",
            icon: Eye,
        },
    ];

    const posts = [
        {
            title: "Building a SaaS with React",
            status: "Published",
            date: "2 days ago",
        },
        {
            title: "Portfolio Design Process",
            status: "Draft",
            date: "5 days ago",
        },
        {
            title: "Appwrite Authentication",
            status: "Published",
            date: "1 week ago",
        },
    ];

    const messages = [
        {
            name: "John Doe",
            subject: "Need a Business Website",
        },
        {
            name: "Sarah Wilson",
            subject: "React Developer Required",
        },
        {
            name: "David Smith",
            subject: "SaaS Dashboard Project",
        },
    ];

    return (
        <main className="space-y-8">

            {/* Header */}

            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-bold">
                    Dashboard
                </h1>

                <p className="text-black/60 dark:text-white/60">
                    Welcome back, Akash 👋
                </p>
            </div>

            {/* Stats */}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {stats.map(({ title, value, icon: Icon }) => (
                    <div
                        key={title}
                        className="rounded-3xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-dark-card "
                    >
                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm text-black/60 dark:text-white/60">
                                    {title}
                                </p>

                                <h2 className="mt-2 text-4xl font-bold">
                                    {value}
                                </h2>
                            </div>

                            <div className="rounded-2xl bg-black p-3 text-white dark:bg-white dark:text-black">
                                <Icon size={22} />
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {/* Content */}

            <div className="grid gap-6 lg:grid-cols-3">

                {/* Posts */}

                <div className="rounded-3xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-dark-card lg:col-span-2">

                    <div className="mb-6 flex items-center justify-between">

                        <h2 className="text-xl font-semibold">
                            Recent Articles
                        </h2>

                        <Link
                            to="/admin/posts"
                            className="flex items-center gap-2 text-sm"
                        >
                            View All
                            <ArrowRight size={16} />
                        </Link>

                    </div>

                    <div className="space-y-4">
                        {posts.map((post) => (
                            <div
                                key={post.title}
                                className="flex items-center justify-between rounded-2xl bg-white p-5 dark:bg-black"
                            >
                                <div>
                                    <h3 className="font-medium">
                                        {post.title}
                                    </h3>

                                    <p className="mt-1 text-sm text-black/60 dark:text-white/60">
                                        {post.date}
                                    </p>
                                </div>

                                <span className="rounded-full bg-green-500/10 px-4 py-2 text-sm font-medium text-green-600">
                                    {post.status}
                                </span>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Right */}

                <div className="space-y-6">

                    {/* Quick Action */}

                    <div className="rounded-3xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-dark-card">

                        <h2 className="mb-5 text-xl font-semibold">
                            Quick Actions
                        </h2>

                        <Link
                            to="/admin/posts/create"
                            className="flex items-center justify-center gap-3 rounded-2xl bg-black px-5 py-4 font-medium text-white transition hover:opacity-90 dark:bg-white dark:text-black"
                        >
                            <Plus size={18} />
                            New Article
                        </Link>

                    </div>

                    {/* Messages */}

                    <div className="rounded-3xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-dark-card">

                        <h2 className="mb-5 text-xl font-semibold">
                            Recent Messages
                        </h2>

                        <div className="space-y-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg.name}
                                    className="rounded-2xl bg-white p-4 dark:bg-black"
                                >
                                    <h4 className="font-medium">
                                        {msg.name}
                                    </h4>

                                    <p className="mt-1 text-sm text-black/60 dark:text-white/60">
                                        {msg.subject}
                                    </p>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>

            </div>

        </main>
    );

}

export default Dashboard