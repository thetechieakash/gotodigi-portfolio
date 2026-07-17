import { useTheme } from '../context/Themecontext.jsx'
import { SectionHeader, Skeleton } from '../components/UI'
import { useState } from 'react'

const DETAILED_TESTIMONIALS = [
  { name: 'Sarah K.', role: 'Product Manager, TechCo', text: 'Delivered a complex enterprise CRM ahead of schedule. Clean modular code, stellar performance optimization, and absolutely zero surprises along the pipeline. Will definitely partner with them again.', initial: 'S' },
  { name: 'Marcus R.', role: 'Founder, Appify', text: 'Built our cross-platform React Native app entirely from the ground up. Communicated exceptionally well across asynchronous environments and proactively structured solutions for complex edge cases we hadn\'t considered.', initial: 'M' },
  { name: 'Priya N.', role: 'CTO, Finflow', text: 'An exceptional full-stack developer. Refactored our legacy system architecture and successfully reduced core API response times by 60% without any platform downtime.', initial: 'P' },
  { name: 'Tom W.', role: 'Design Lead, Agencia', text: 'Pixel-perfect UI implementation. Possesses a deep understanding of user experience dynamics, knows exactly when to push back on impractical designs, and does so constructively.', initial: 'T' },
  { name: 'Aisha M.', role: 'Startup Founder', text: 'Transformed our concept from a basic sketch into a high-fidelity functional MVP within a 6-week window. Thoroughly professional, scalable methodology, and genuinely engaging to collaborate with.', initial: 'A' },
  { name: 'James L.', role: 'Dev Manager, BrandCo', text: 'Integrated seamlessly with our established engineering crew. Brought top-tier communication practices, robust version management, and consistently delivered comprehensive, testable features every single sprint cycle.', initial: 'J' },
]

function CardSkeleton({ dark }) {
  return (
    <div className={`p-8 rounded-3xl border ${dark ? 'border-neutral-800 bg-[#0d0d0d]' : 'border-neutral-100 bg-neutral-50'} space-y-4`}>
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-5/6 rounded-md" />
      <Skeleton className="h-4 w-2/3 rounded-md" />
      <div className="flex items-center gap-4 pt-4">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-24 rounded-md" />
          <Skeleton className="h-3 w-36 rounded-md" />
        </div>
      </div>
    </div>
  )
}

export default function Testimonial() {
  const { dark } = useTheme()
  const [loading] = useState(false)
  const [error] = useState(null)

  return (
    <>
      {/* Apple-styled Typography Header */}
      <SectionHeader
        eyebrow="// TESTIMONIALS"
        title="What clients say."
        subtitle="Honest perspectives from people and engineering teams I've partnered with."
      />
      {/* Dynamic Multi-Column Flow Layout (Masonry-like Columns) */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:balance]">
        {loading
          ? Array(6).fill(null).map((_, i) => <CardSkeleton key={i} dark={dark} />)
          : DETAILED_TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className={`break-inside-avoid inline-block w-full p-8 rounded-3xl border transition-all duration-300 transform hover:scale-[1.015] ${dark
                ? 'border-neutral-800 bg-[#0c0c0e] hover:bg-[#121214] shadow-[0_8px_30px_rgb(0,0,0,0.5)]'
                : 'border-neutral-200 bg-white hover:bg-neutral-50/50 shadow-[0_8px_30px_rgb(0,0,0,0.02)]'
                }`}
            >
              <p
                className={`text-[15px] md:text-base leading-relaxed mb-6 tracking-wide font-normal ${dark ? 'text-neutral-300' : 'text-neutral-600'
                  }`}
                style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
              >
                “{t.text}”
              </p>

              <div className="flex items-center gap-3.5">
                {/* Minimalist structural avatar placeholder instead of colorful emojis */}
                <div
                  className={`w-10 h-10 flex items-center justify-center text-xs font-semibold rounded-full select-none shrink-0 ${dark ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-100 text-neutral-600'
                    }`}
                  style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
                >
                  {t.initial}
                </div>

                <div className="overflow-hidden">
                  <p
                    className={`text-sm font-semibold tracking-tight truncate ${dark ? 'text-neutral-200' : 'text-neutral-800'}`}
                    style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    {t.name}
                  </p>
                  <p
                    className={`text-xs truncate tracking-wide ${dark ? 'text-neutral-500' : 'text-neutral-400'}`}
                    style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))
        }
      </div>

      {error && (
        <p className="text-xs font-mono text-neutral-400 dark:text-neutral-600 mt-12 text-center md:text-left">
            // Fallback content pipeline active.
        </p>
      )}
    </>
  )
}