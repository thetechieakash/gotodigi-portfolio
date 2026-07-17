import { useState, useEffect } from "react";
import {
    Mail,
    Search,
    Trash2,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    X
} from "lucide-react";
import contactService from "../../appwrite/contactService";


export default function Messages() {
    const PER_PAGE = 10;

    const [messages, setMessages] = useState([]);
    const [selected, setSelected] = useState(null);

    const [filter, setFilter] = useState("all");

    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const [loading, setLoading] = useState(false);

    const loadMessages = async () => {
        try {
            setLoading(true);

            const result = await contactService.getMessages({
                status:
                    filter === "all"
                        ? null
                        : filter === "read",
                limit: PER_PAGE,
                offset: (page - 1) * PER_PAGE,
            });

            setMessages(result.documents);
            setTotal(result.total);

            if (result.documents.length) {
                setSelected((prev) => {
                    // First msg select initially
                    // if (!prev) return result.documents[0];

                    // return (
                    //     result.documents.find((i) => i.$id === prev.$id) ??
                    //     result.documents[0]
                    // );

                    // No msg select initially
                    if (!prev) return null;

                    return (
                        result.documents.find((item) => item.$id === prev.$id) || null
                    );
                });
            } else {
                setSelected(null);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const totalPages = Math.ceil(total / PER_PAGE);

    const handleRead = async () => {
        if (!selected || selected.contact_status) return;

        try {
            await contactService.updateMessageStatus(selected.$id, true);

            setMessages(prev =>
                prev.map(msg =>
                    msg.$id === selected.$id
                        ? { ...msg, contact_status: true }
                        : msg
                )
            );

            setSelected(prev => ({
                ...prev,
                contact_status: true,
            }));
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async () => {
        if (!selected) return;

        try {
            await contactService.deleteMessage(selected.$id);

            const remaining = messages.filter(
                item => item.$id !== selected.$id
            );

            setMessages(remaining);
            setSelected(remaining[0] || null);

            setTotal(prev => prev - 1);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        loadMessages();
    }, [page, filter]);

    return (
        <main className="space-y-8">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-4xl font-bold">
                        Messages
                    </h1>

                    <p className="mt-2 text-black/60 dark:text-white/60">
                        Manage contact requests from visitors.
                    </p>

                </div>

                <div className="rounded-full bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                    {messages.filter((m) => !m.contact_status).length} Unread
                </div>

            </div>

            {/* Layout */}

            <div className="grid gap-6 xl:grid-cols-[380px_1fr]">

                {/* Sidebar */}

                <aside className={`overflow-hidden rounded-3xl border border-black/10 bg-white dark:border-white/10 dark:bg-dark-card ${selected ? "hidden xl:block" : "block"}`}>

                    {/* Search */}

                    <div className="border-b border-black/10 p-5 dark:border-white/10">
                        <div className="mt-2 flex gap-2">

                            {["all", "unread", "read"].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => setFilter(item)}
                                    className={`rounded-full px-4 py-2 text-sm transition ${filter === item
                                        ? "bg-black text-white dark:bg-white dark:text-black"
                                        : "border border-black/10 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
                                        }`}
                                >
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                </button>
                            ))}

                        </div>

                    </div>

                    {/* List */}

                    <div className="max-h-175 overflow-y-auto">

                        {loading
                            ? Array.from({ length: 8 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="animate-pulse border-b p-5"
                                >
                                    <div className="h-4 w-32 rounded bg-black/10 dark:bg-white/10" />
                                    <div className="mt-3 h-3 w-40 rounded bg-black/10 dark:bg-white/10" />
                                    <div className="mt-2 h-3 w-full rounded bg-black/10 dark:bg-white/10" />
                                </div>
                            )) : messages.length ? (
                                messages.map((item) => (
                                    <button
                                        key={item.$id}
                                        onClick={() => setSelected(item)}
                                        className={`w-full border-b border-black/5 p-5 text-left transition dark:border-white/5 ${selected?.$id === item.$id
                                            ? "bg-black/5 dark:bg-white/5"
                                            : "hover:bg-black/5 dark:hover:bg-white/5"
                                            }`}
                                    >

                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold">
                                                {item.guest_name}
                                            </h3>
                                            <span className="text-xs text-black dark:text-white">
                                                {new Date(item.$createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-sm font-medium">
                                            {item.message_subject}
                                        </p>
                                        <p className="mt-2 line-clamp-2 text-sm text-black/60 dark:text-white/60">
                                            {item.message_content}
                                        </p>
                                        {!item.contact_status && (
                                            <div className="mt-3 flex items-center gap-2">
                                                <span className="h-2 w-2 rounded-full bg-blue-500" />
                                                <span className="text-xs text-blue-500">
                                                    Unread
                                                </span>
                                            </div>
                                        )}
                                    </button>
                                ))
                            ) : (
                                <div className="py-20 text-center">

                                    <Mail
                                        size={42}
                                        className="mx-auto text-black/20 dark:text-white/20"
                                    />

                                    <p className="mt-4 text-black/50 dark:text-white/50">
                                        No messages found.
                                    </p>

                                </div>
                            )}

                    </div>

                </aside>

                {/* Preview */}

                <section className={`overflow-hidden rounded-3xl border border-black/10 bg-white dark:border-white/10 dark:bg-dark-card ${selected ? "block" : "hidden xl:block"}`}>
                    {selected ? (
                        <div className="flex h-full flex-col">

                            {/* Header */}

                            <div className="border-b border-black/10 p-8 dark:border-white/10">

                                <div className="flex items-start justify-between gap-5">
                                    <div>
                                        <h2 className="text-3xl font-bold">
                                            {selected.message_subject}
                                        </h2>
                                        <p className="mt-3 text-black/60 dark:text-white/60">
                                            {selected.guest_name}
                                        </p>
                                        <a
                                            href={`mailto:${selected.guest_email}`}
                                            className="text-sm text-blue-500 hover:underline"
                                        >
                                            {selected.guest_email}
                                        </a>
                                    </div>

                                    <div className="mb-6">
                                        <button
                                            onClick={() => setSelected(null)}
                                            className="rounded-full p-2 border border-black/10 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>



                                </div>
                                <div className="flex justify-end mt-2 gap-3">
                                    <button
                                        onClick={handleRead}
                                        disabled={selected.contact_status}
                                        className="flex items-center gap-2 rounded-2xl border border-black/10 px-5 py-3 transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5">
                                        <CheckCircle2 size={18} />
                                        {selected.contact_status ? "Read" : "Mark Read"}
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="flex items-center gap-2 rounded-2xl bg-red-500 px-5 py-3 text-white transition hover:opacity-90">
                                        <Trash2 size={18} />
                                        Delete
                                    </button>

                                </div>
                            </div>

                            {/* Message */}

                            <div className="flex-1 p-8">

                                <p className="leading-8 text-black/70 dark:text-white/70">
                                    {selected.message_content}
                                </p>

                            </div>

                            {/* Footer */}

                            <div className="flex items-center justify-between border-t border-black/10 p-6 dark:border-white/10">

                                <p className="text-sm text-black/50 dark:text-white/50">
                                    Page {page} of {totalPages}
                                </p>

                                <div className="flex gap-2">

                                    <button
                                        disabled={page === 1}
                                        onClick={() => setPage(p => p - 1)}
                                        className="rounded-xl border p-3 disabled:opacity-40"
                                    >
                                        <ChevronLeft size={18} />
                                    </button>

                                    <button
                                        disabled={page === totalPages}
                                        onClick={() => setPage(p => p + 1)}
                                        className="rounded-xl border p-3 disabled:opacity-40"
                                    >
                                        <ChevronRight size={18} />
                                    </button>

                                </div>

                            </div>

                        </div>
                    ) : (
                        <div className="flex h-full min-h-175 flex-col items-center justify-center">

                            <Mail
                                size={70}
                                className="text-black/20 dark:text-white/20"
                            />

                            <h3 className="mt-6 text-2xl font-semibold">
                                No Message Selected
                            </h3>

                            <p className="mt-2 text-black/50 dark:text-white/50">
                                Select a message from the left panel.
                            </p>

                        </div>
                    )}

                </section>

            </div>


        </main>
    );
}