import { useState } from 'react';
import { useTheme } from '../context/Themecontext.jsx';
import { SectionHeader, Skeleton } from '../components/Elements.jsx';

const DEVELOPER_FAQS = [
  {
    q: "What types of architectural systems do you specialize in?",
    a: "I specialize in building full-stack web applications, scalable RESTful & GraphQL APIs, and custom enterprise dashboards. My primary ecosystem centers around React, Next.js, Laravel, and Node.js ecosystems. I operate comfortable across both quick-turnaround production builds and multi-quarter development contracts."
  },
  {
    q: "How do you handle project execution and communication?",
    a: "Transparency drives my velocity. I establish clear timelines using asynchronous tooling like Slack or email with structured weekly progress reviews. All code shifts via GitHub pull requests for explicit version tracking, while tasks live inside organized Notion documentation pipelines."
  },
  {
    q: "Are you comfortable optimizing legacy or fragmented codebases?",
    a: "Yes. A significant portion of my engineering work involves assessing, refactoring, and improving legacy platforms—including older monolithic PHP configurations or outdated React structures—minimizing performance degradation while upgrading stability."
  },
  {
    q: "How are project rates calculated?",
    a: "Engagements are scoped individually based on project complexity, target release schedules, and system resource requirements. Following our introductory discovery call, I provide a comprehensive technical brief along with a transparent flat-fee estimate or retainer structure."
  },
  {
    q: "Can you manage UI/UX engineering alongside core development?",
    a: "While I collaborate exceptionally well with dedicated product designers, I maintain intermediate proficiency inside Figma. I can easily convert high-fidelity layouts or independently construct functional, aesthetically balanced user interfaces adhering to strict accessibility principles."
  },
  {
    q: "Are you open to full-time engineering placements?",
    a: "I am generally open to remote-first, long-term technical configurations provided there is solid alignment between company trajectory and my current engineering focus. Feel free to initiate contact directly through my submission channel."
  },
]

function AccordionItem({ item, dark }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`border-b ${dark ? 'border-neutral-800' : 'border-neutral-200'} transition-colors duration-300`}>
      <button
        onClick={() => setOpen(p => !p)}
        className={`w-full flex justify-between items-start py-7 text-left gap-6 transition-colors group cursor-pointer`}
      >
        <span
          className={`text-lg md:text-xl font-medium tracking-tight ${dark ? 'text-neutral-200 group-hover:text-white' : 'text-neutral-800 group-hover:text-black'
            } transition-colors duration-200`}
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
        >
          {item.q}
        </span>

        {/* Apple-style subtle chevron indicator */}
        <span className={`pt-1 text-neutral-400 dark:text-neutral-500 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </button>

      {/* Dynamic hardware-accelerated height transition container */}
      <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <p
            className={`pb-7 pr-12 text-[15px] md:text-base leading-relaxed font-normal tracking-wide ${dark ? 'text-neutral-400' : 'text-neutral-500'
              }`}
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
          >
            {item.a}
          </p>
        </div>
      </div>
    </div>
  )
}

function FaqSkeleton({ dark }) {
  return (
    <div className={`py-7 border-b ${dark ? 'border-neutral-800' : 'border-neutral-200'}`}>
      <Skeleton className="h-6 w-3/4 mb-3 rounded-md" />
      <Skeleton className="h-4 w-full rounded-md" />
    </div>
  )
}

export default function Qa() {
  const { dark } = useTheme();
  const [loading] = useState(false);
  const [error] = useState(null);

  return (
    <>
      {/* Minimalist Apple Typography Header Section */}
      <div className="mb-14 text-center md:text-left">

        <SectionHeader
          eyebrow="// FAQ"
          title="Frequently asked questions"
          subtitle="Most frequently asked questions about our service and the answers to these questions."
        />
        <h1
          className="text-4xl md:text-5xl font-bold tracking-tight dark:text-white text-neutral-900"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}
        >
          Common questions.
        </h1>
      </div>

      {/* Content Render Grid */}
      <div className="space-y-1">
        {loading
          ? Array(6).fill(null).map((_, i) => <FaqSkeleton key={i} dark={dark} />)
          : DEVELOPER_FAQS.map((item, i) => (
            <AccordionItem key={i} item={item} dark={dark} />
          ))
        }
      </div>

      {error && (
        <p className="text-xs font-mono text-neutral-400 dark:text-neutral-600 mt-12 text-center md:text-left">
            // Fallback content active — verification pipeline isolated.
        </p>
      )}
    </>
  )
}