import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Sun, Moon, Menu, X, LayoutDashboard, FileText, PlusSquare, FolderKanban, MessageSquare, Mail, Settings, UserCircle2, } from "lucide-react";
import LogoutBtn from "./LogoutBtn";
import { useTheme } from "../../context/Themecontext";
import blogService from "../../appwrite/blogService";


export default function Sidebar() {
    const [open, setOpen] = useState(false);
    const authStatus = useSelector((state) => state.auth.status);
    const { dark, toggle } = useTheme();
    const [badgeCounts, setBadgeCounts] = useState({
        articles: 0,
        projects: 0,
        messages: 0,
        questions: 0
    });
    useEffect(() => {
        const loadCounts = async () => {
            try {
                const { all } = await blogService.getBlogCounts();

                setBadgeCounts((prev) => ({
                    ...prev,
                    articles: all,
                }));
            } catch (error) {
                console.error(error);
            }
        };

        loadCounts();
    }, [])
    // console.log(badgeCounts);

    const links = [
        { title: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard, },
        { title: "Articles", path: "/admin/posts", icon: FileText, badge: badgeCounts.articles },
        { title: "Projects", path: "/admin/projects", icon: FolderKanban, },
        { title: "Messages", path: "/admin/messages", icon: Mail, },
        { title: "Testimonials", path: "/admin/testimonials", icon: MessageSquare, },
        { title: "Settings", path: "/admin/settings", icon: Settings, },
    ];
    return (
        <>
            {/* Mobile Topbar */}
            <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-black/10 bg-white px-5 dark:border-white/10 dark:bg-black lg:hidden">
                <h1 className="text-xl font-bold">Akash.</h1>

                <button
                    onClick={() => setOpen(true)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-black/5 dark:hover:bg-white/10"
                >
                    <Menu size={22} />
                </button>
            </header>

            {/* Overlay */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-black/10 bg-white transition-transform duration-300 dark:border-white/10 dark:bg-black ${open ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0`}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-black/10 px-8 py-8 dark:border-white/10">
                    <div>
                        <h2 className="text-2xl font-bold">Akash.</h2>
                        <p className="mt-1 text-sm text-black/50 dark:text-white/50">
                            Portfolio CMS
                        </p>
                    </div>
                    <button
                        onClick={toggle}
                        className={`ml-1 flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 ${dark ? 'border border-white/10 bg-black text-white' : 'bg-black text-white'}`}
                    >
                        {dark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <button
                        onClick={() => setOpen(false)}
                        className="rounded-xl p-2 hover:bg-black/5 dark:hover:bg-white/10 lg:hidden"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-2 overflow-y-auto p-5">
                    {authStatus &&
                        links.map(({ title, path, icon: Icon, badge }) => (
                            <NavLink
                                key={path}
                                to={path}
                                end={path === "/admin/posts" || path === "/admin/posts/create"}
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-4 rounded-2xl px-5 py-3 text-sm font-medium transition-all ${isActive
                                        ? "bg-black text-white dark:bg-white dark:text-black"
                                        : "text-black/70 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/5"
                                    }`
                                }
                            >
                                <Icon size={20} />
                                <span>{title}</span>
                                {badge > 0 && badge !== undefined && (
                                    <span className="ml-auto rounded-full bg-gray-200 px-2 py-0.5 text-xs text-dark dark:bg-gray-700">
                                        {badge}
                                    </span>
                                )}
                            </NavLink>
                        ))
                    }
                </nav>

                {/* User */}
                {authStatus && (
                    <div className="border-t border-black/10 p-5 dark:border-white/10">
                        <div className="mb-4 flex items-center gap-3 rounded-2xl bg-black/5 p-3 dark:bg-white/5">
                            <UserCircle2 size={42} />

                            <div>
                                <h4 className="font-semibold">Akash</h4>
                                <p className="text-xs text-black/50 dark:text-white/50">
                                    Administrator
                                </p>
                            </div>
                        </div>

                        <LogoutBtn />
                    </div>
                )}
            </aside>
        </>
    );
}