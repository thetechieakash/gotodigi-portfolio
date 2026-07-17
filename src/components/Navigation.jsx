import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/Themecontext.jsx';
import { Sun, Moon, House, User, Briefcase, FileText, MessageSquareQuote, CircleHelp, Mail } from 'lucide-react';

const links = [
    { to: '/', label: 'Home', icon: House },
    { to: '/about', label: 'About', icon: User },
    { to: '/portfolio', label: 'Portfolio', icon: Briefcase },
    { to: '/blogs', label: 'Blog', icon: FileText },
    { to: '/testimonial', label: 'Testimonials', icon: MessageSquareQuote },
    { to: '/faq', label: 'FAQ', icon: CircleHelp },
    { to: '/contact', label: 'Contact', icon: Mail },
];

export default function Navbar() {
    const { dark, toggle } = useTheme();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, []);

    const base = 'text-sm font-medium tracking-wide rounded-full px-4 py-2 transition-all duration-200';
    const inactive = dark ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black';

    return (
        <header className="fixed top-0 left-0 right-0 z-50">

            {/* Desktop Navigation */}
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

            {/* Mobile Navigation */}
            <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 md:hidden">
                <div className={`flex items-center gap-2 rounded-full border px-3 py-3 backdrop-blur-2xl shadow-xl ${dark ? 'border-white/10 bg-white/10' : 'border-white/50 bg-white/70'}`}>
                    {links.map(({ to, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/'}
                            className={({ isActive }) => `flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 ${isActive ? (dark ? 'scale-105 bg-white text-black' : 'scale-105 bg-black text-white') : (dark ? 'text-white/70 hover:bg-white/10' : 'text-black/60 hover:bg-black/5')}`}
                        >
                            <Icon size={20} strokeWidth={2} />
                        </NavLink>
                    ))}

                    <button
                        onClick={toggle}
                        className={`ml-1 flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 ${dark ? 'border border-white/10 bg-black text-white' : 'bg-black text-white'}`}
                    >
                        {dark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>
            </div>

        </header>
    );
}