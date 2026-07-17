import { useParams, Link } from 'react-router-dom'
import { useTheme } from '../context/Themecontext.jsx'
import { Skeleton } from '../components/Elements.jsx'

/* Demo post content used when API isn't connected */


function PostSkeleton({ dark }) {
  return (
    <div className="space-y-4 mt-10">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-3 w-32" />
      <div className="mt-8 space-y-3">
        {Array(6).fill(null).map((_, i) => (
          <Skeleton key={i} className={`h-3 ${i % 3 === 2 ? 'w-2/3' : 'w-full'}`} />
        ))}
      </div>
    </div>
  )
}

export default function BlogDetail() {
  const { slug } = useParams()
  const { dark } = useTheme()

  if (loading && !post) return (
    <main className="pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-5">
        <PostSkeleton dark={dark} />
      </div>
    </main>
  )

  if (!post) return null

  return (
    <main className="pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-5">
        <Link
          to="/blogs"
          className={`text-xs font-mono mb-8 inline-block ${dark ? 'text-white/40 hover:text-white' : 'text-black/40 hover:text-black'} transition-colors`}
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          ← Back to blog
        </Link>

        <article>
          <div className="flex items-center gap-3 mb-4">
            <time className={`text-xs font-mono ${dark ? 'text-white/30' : 'text-black/30'}`}
              style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              {post.date}
            </time>
            {post.readTime && (
              <span className={`text-xs ${dark ? 'text-white/30' : 'text-black/30'}`}>· {post.readTime} read</span>
            )}
          </div>

          <h1
            className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-6"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {post.title}
          </h1>

          {(post.tags || []).length > 0 && (
            <div className="flex gap-2 mb-10 flex-wrap">
              {post.tags.map(t => (
                <span
                  key={t}
                  className="text-xs font-mono text-accent border border-accent/20 px-2 py-0.5"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Render markdown-ish content as plain paragraphs */}
          <div className={`prose-custom text-sm leading-8 space-y-5 ${dark ? 'text-white/70' : 'text-black/70'}`}>
            {post.content.split('\n\n').map((para, i) => {
              if (para.startsWith('## ')) {
                return (
                  <h2
                    key={i}
                    className={`text-lg font-bold mt-8 mb-2 ${dark ? 'text-white' : 'text-black'}`}
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {para.replace('## ', '')}
                  </h2>
                )
              }
              return <p key={i}>{para}</p>
            })}
          </div>
        </article>

        {error && (
          <p className="text-xs font-mono text-[#888] mt-8" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            // Showing demo post — connect API to load real content
          </p>
        )}
      </div>
    </main>
  )
}