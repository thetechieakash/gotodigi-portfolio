import { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/Themecontext.jsx';
import {
    Sun, Moon, House, User, Briefcase, FileText,
    MessageSquareQuote, CircleHelp, Mail, Menu, X
} from 'lucide-react';

const links = [
    { to: '/', label: 'Home', icon: House },
    { to: '/about', label: 'About', icon: User },
    { to: '/portfolio', label: 'Portfolio', icon: Briefcase },
    { to: '/blogs', label: 'Blogs', icon: FileText },
    { to: '/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
    { to: '/faq', label: 'FAQ', icon: CircleHelp },
    { to: '/contact', label: 'Contact', icon: Mail },
];

export default function Navbar() {
    const { dark, toggle } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, []);

    // Close popover when clicking outside
    useEffect(() => {
        if (!menuOpen) return;
        const clickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', clickOutside);
        return () => document.removeEventListener('mousedown', clickOutside);
    }, [menuOpen]);

    const base = 'text-sm font-medium tracking-wide rounded-full px-4 py-2 transition-all duration-200';
    const inactive = dark ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black';

    // Mobile Layout Splitting (Top 3 core slots, remaining go into popover)
    const primaryMobileLinks = links.slice(0, 3);
    const secondaryMobileLinks = links.slice(3);

    // Check if any sub-link inside the popover menu is currently active
    const isSecondaryActive = (currentPath) => {
        return secondaryMobileLinks.some(link => link.to === currentPath);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50">

            {/* ── Desktop Navigation ────────────────────────────────────── */}
            <nav className="hidden md:flex h-20 max-w-7xl mx-auto items-center justify-center px-6 lg:px-8">
                <div className={`flex items-center gap-2 rounded-full border px-4 py-2 transition-all duration-300 ${dark ? 'border-white/10 bg-white/5 backdrop-blur-lg shadow-[0_8px_32px_rgba(0,0,0,0.4)]' : 'border-white/50 bg-white/60 backdrop-blur-lg shadow-[0_8px_32px_rgba(0,0,0,0.08)]'} ${scrolled ? 'translate-y-2' : 'translate-y-4'}`}>
                    {links.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/'}
                            className={({ isActive }) => `${base} ${isActive ? (dark ? 'bg-white text-black' : 'bg-black text-white') : inactive}`}
                        >
                            {label}
                        </NavLink>
                    ))}

                    <button
                        onClick={toggle}
                        className={`ml-2 flex h-10 w-10 items-center justify-center rounded-full ${dark ? 'border border-dark-border bg-black text-white' : 'bg-black text-white'}`}
                    >
                        {dark ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                </div>
            </nav>

            {/* ── Mobile Balanced Dock Navigation ───────────────────────── */}
            <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 md:hidden" ref={menuRef}>

                {/* Apple-style Blur Popover for Extra Items */}
                {menuOpen && (
                    <div
                        className={`absolute bottom-16 right-0 w-48 mb-2 rounded-2xl border p-2 shadow-xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-200 ${dark ? 'border-neutral-800 bg-neutral-900/95 text-white' : 'border-neutral-200 bg-white/95 text-neutral-900'
                            }`}
                    >
                        <div className="flex flex-col gap-1">
                            {secondaryMobileLinks.map(({ to, label, icon: Icon }) => (
                                <NavLink
                                    key={to}
                                    to={to}
                                    onClick={() => setMenuOpen(false)}
                                    className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive
                                        ? (dark ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-black')
                                        : (dark ? 'text-neutral-400 hover:bg-neutral-800/50' : 'text-neutral-600 hover:bg-neutral-100/70')
                                        }`}
                                >
                                    <Icon size={16} className="opacity-80" />
                                    <span>{label}</span>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                )}

                {/* The 5-Slot Native Dock */}
                <div className={`flex items-center gap-2 rounded-full border px-4 py-2 transition-all duration-300 ${dark ? 'border-white/10 bg-white/5 backdrop-blur-lg shadow-[0_8px_32px_rgba(0,0,0,0.4)]' : 'border-white/50 bg-white/60 backdrop-blur-lg shadow-[0_8px_32px_rgba(0,0,0,0.08)]'} ${scrolled ? 'translate-y-2' : 'translate-y-4'}`}>

                    {/* Slots 1-3: Primary App Targets */}
                    {primaryMobileLinks.map(({ to, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/'}
                            className={({ isActive }) => `flex h-11 w-11 items-center justify-center rounded-full transition-all ${isActive
                                ? (dark ? 'bg-white text-black' : 'bg-black text-white')
                                : (dark ? 'text-neutral-400 hover:bg-neutral-900' : 'text-neutral-500 hover:bg-neutral-100')
                                }`}
                        >
                            <Icon size={18} strokeWidth={2.2} />
                        </NavLink>
                    ))}

                    {/* Slot 4: Pure Theme Utility */}
                    <button
                        onClick={toggle}
                        className={`flex h-11 w-11 items-center justify-center rounded-full transition-all ${dark ? 'text-neutral-400 hover:bg-neutral-900' : 'text-neutral-500 hover:bg-neutral-100'
                            }`}
                    >
                        {dark ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    {/* Slot 5: The "More Menu" Toggle */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className={`flex h-11 w-11 items-center justify-center rounded-full transition-all ${menuOpen
                            ? (dark ? 'bg-neutral-800 text-white' : 'bg-neutral-200 text-black')
                            : (dark ? 'text-neutral-400 hover:bg-neutral-900' : 'text-neutral-500 hover:bg-neutral-100')
                            }`}
                    >
                        {menuOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>

                </div>
            </div>

        </header>
    );
}