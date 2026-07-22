import { Link } from 'react-router-dom';
import { useTheme } from '../context/Themecontext.jsx';
import { Compass } from 'lucide-react';

export default function NotFound() {
  const { dark } = useTheme();

  return (
    <>
      <div className='text-center w-full'>
        {/* Apple-styled Structural Indicator Icon */}
        <div
          className={`w-14 h-14 mx-auto mb-8 rounded-2xl flex items-center justify-center border transition-all ${dark
            ? 'bg-[#0c0c0e] border-neutral-800 text-neutral-400 shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
            : 'bg-white border-neutral-200 text-neutral-500 shadow-[0_8px_30px_rgba(0,0,0,0.02)]'
            }`}
        >
          <Compass size={24} strokeWidth={1.8} className="animate-pulse" />
        </div>

        {/* Typographic Label Matrix */}
        <span
          className="text-xs font-semibold tracking-widest uppercase text-neutral-400 dark:text-neutral-500 block mb-3"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
        >
          404 ERROR
        </span>

        <h1
          className="text-3xl font-bold tracking-tight mb-3"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}
        >
          Lost in space.
        </h1>

        <p
          className={`text-sm leading-relaxed mb-8 max-w-xs mx-auto ${dark ? 'text-neutral-400' : 'text-neutral-500'
            }`}
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
        >
          The page you are looking for doesn't exist, has been permanently removed, or was shifted to another index URL.
        </p>

        {/* Clean Pill Action Link */}
        <Link
          to="/"
          className={`inline-flex items-center text-sm font-medium px-6 py-2.5 rounded-full transition-all tracking-wide border ${dark
            ? 'bg-white text-black border-white hover:bg-neutral-200'
            : 'bg-black text-white border-black hover:bg-neutral-800'
            }`}
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
        >
          Return to home page
        </Link>
      </div>
    </>
  );
}