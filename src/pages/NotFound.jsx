import { Link } from 'react-router-dom'
import { useTheme } from '../context/Themecontext.jsx'

export default function NotFound() {
  const { dark } = useTheme()

  return (
    <main className="min-h-screen flex items-center justify-center pt-16">
      <div className="text-center px-5">
        <p
          className="text-[8rem] md:text-[12rem] font-bold leading-none text-accent select-none"
          style={{ fontFamily: 'Space Grotesk, sans-serif', opacity: 0.15 }}
        >
          404
        </p>
        <div className="-mt-8 relative z-10">
          <p
            className="text-xs font-mono text-[#888] mb-4"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            // page not found
          </p>
          <h1
            className="text-2xl font-bold mb-3"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Nothing here.
          </h1>
          <p className={`text-sm mb-8 ${dark ? 'text-white/40' : 'text-black/40'}`}>
            The page you're looking for doesn't exist or was moved.
          </p>
          <Link
            to="/"
            className="inline-block bg-accent text-black font-semibold text-sm px-6 py-3 hover:opacity-90 transition-opacity"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            ← Back home
          </Link>
        </div>
      </div>
    </main>
  )
}