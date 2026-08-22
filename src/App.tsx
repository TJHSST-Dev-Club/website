import { ArrowUpRight, ChevronDown } from 'lucide-react'
import confetti from 'canvas-confetti'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import HeroAscii from '@/components/HeroAscii'
import Officers from '@/components/Officers'
import './App.css'

const SHOW_OFFICERS = false

const ION_URL = 'https://ion.tjhsst.edu/eighth/activity/12'
const DISCORD_URL = 'https://discord.gg/sP3WVQRQPC'
const GITHUB_URL = 'https://github.com/TJHSST-Dev-Club'
const ODIN_URL = 'https://www.theodinproject.com/'
const HACK_CLUB_URL = 'https://hackclub.com/'

// the club's three verbs, set as dictionary entries — same format as the hero's "builder"
const lexicon = [
  {
    word: 'learn',
    ipa: '/ˈlərn/',
    definition: (
      <>
        to pick up a new skill at one's own pace, as from an officer or{' '}
        <a
          href={ODIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-fog underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-white/60"
        >
          The Odin Project
        </a>
        .
      </>
    ),
    usage: '"finally learned how to center a div."',
  },
  {
    word: 'build',
    ipa: '/ˈbɪld/',
    definition:
      'to turn new knowledge into a working project, with help never far away.',
    usage: '"we built the site you\'re reading right now."',
  },
  {
    word: 'ship',
    ipa: '/ˈʃɪp/',
    definition:
      'to release a finished project into the world; to deploy, demo, or share it.',
    usage: '"shipped it before the bell rang."',
  },
]

const faqs = [
  {
    q: 'What will I actually do?',
    a: (
      <>
        Build, mostly. Outside of meeting time, we have <em>lots</em> of projects via{' '}
        <a
          href={HACK_CLUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-fog underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-white/60"
        >
          Hack Club
          <ArrowUpRight className="ml-0.5 inline size-3.5 align-[-2px] opacity-60" />
        </a>
        , plus hackathons, and honestly, fun. Who knows!
      </>
    ),
  },
  {
    q: 'When and where does the club meet?',
    a: 'Wednesdays during 8B. Check Ion for the room.',
  },
  {
    q: 'Do I need prior experience?',
    a: 'No. Start from the beginning and learn at your own pace.',
  },
  {
    q: 'I already know web development. Why would I come?',
    a: 'Treat it as protected build time to ship your own projects. And if you want to compete for the fun of it, we have prizes!',
  },
  {
    q: 'Do you give lectures?',
    a: 'Not usually. We may start with a short talk, but most of the meeting is time to build.',
  },
  {
    q: 'What will I learn?',
    a: 'HTML, CSS, JavaScript, React, Node.js, databases, and deployment.',
  },
  {
    q: 'How do I sign up?',
    a: 'Sign up for Wednesday 8B on Ion, then join our Discord.',
  },
]

function celebrate() {
  confetti({
    particleCount: 140,
    spread: 80,
    origin: { y: 0.85 },
    colors: ['#5ac1ea', '#7779dc', '#eaecf4'],
    disableForReducedMotion: true,
  })
}

function App() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-ink/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-3">
            <img src="/logo.svg" alt="" className="h-10 w-auto" />
            <span className="text-[19px] font-semibold tracking-tight">TJ Dev Club</span>
          </a>
          <nav className="flex items-center gap-1 text-[15px]">
            <a href="#about" className="hidden rounded-full px-3.5 py-2 text-mist transition-colors hover:text-fog sm:block">
              How it works
            </a>
            <a href="#faq" className="hidden rounded-full px-3.5 py-2 text-mist transition-colors hover:text-fog sm:block">
              FAQ
            </a>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full px-3.5 py-2 text-mist transition-colors hover:text-fog sm:block"
            >
              Discord
            </a>
            <a
              href={ION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 rounded-full bg-fog px-5 py-2 font-medium text-ink transition-colors hover:bg-white"
            >
              Sign up
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden">
          <HeroAscii />
          {/* extra bottom padding recenters the content on the full viewport, not the below-header area */}
          <div className="relative mx-auto flex min-h-[calc(100svh-4.5rem)] max-w-3xl flex-col items-center justify-center px-6 pt-24 pb-[10.5rem] text-center">
            <h1 className="font-display bg-clip-text text-5xl font-semibold tracking-[-0.03em] text-balance text-transparent [background-image:linear-gradient(to_bottom,#fff_62%,rgba(234,236,244,0.62))] md:text-7xl">
              Become a{' '}
              <span
                tabIndex={0}
                className="group/def relative inline-block cursor-help underline decoration-brand/40 decoration-wavy decoration-[0.045em] underline-offset-[0.16em] transition-colors duration-300 hover:decoration-brand/80 focus:decoration-brand/80 focus:outline-none"
              >
                {/* solid color, no gradient clip: Safari doesn't paint the h1's clipped gradient inside this inline-block (invisible text), and a clip applied here bleeds the gradient into the underline (double squiggle) */}
                <span className="text-white">
                  {'build · er'}
                </span>
                <span
                  role="tooltip"
                  className="pointer-events-none absolute top-full left-1/2 z-20 mt-5 w-[19.5rem] -translate-x-1/2 translate-y-1 rounded-xl border border-border bg-panel/95 p-5 text-left font-sans text-[15px] font-normal tracking-normal opacity-0 shadow-xl shadow-black/40 backdrop-blur-md transition-all duration-200 group-hover/def:translate-y-0 group-hover/def:opacity-100 group-focus/def:translate-y-0 group-focus/def:opacity-100"
                >
                  <span className="flex items-baseline gap-2.5">
                    <span className="font-semibold text-fog">build·er</span>
                    <span className="text-mist">/ˈbɪl·dər/</span>
                  </span>
                  <span className="mt-2.5 block space-y-1.5">
                    <span className="flex gap-2 leading-relaxed text-mist">
                      <span className="w-4 shrink-0 text-mist/60 tabular-nums">1.</span>
                      <span>a person who learns by taking an idea and making it alive.</span>
                    </span>
                    <span className="flex gap-2 leading-relaxed text-mist">
                      <span className="w-4 shrink-0 text-mist/60 tabular-nums">2.</span>
                      <span>the ones who show up anyway.</span>
                    </span>
                    <span className="flex gap-2 leading-relaxed text-mist">
                      <span className="w-4 shrink-0 text-mist/60 tabular-nums">3.</span>
                      <span className="italic">us.</span>
                    </span>
                  </span>
                </span>
              </span>
              .
            </h1>
            <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-mist">
              TJ Dev Club is where we learn, build, and ship together.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <a
                href={ION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-fog px-6 py-2.5 font-medium text-ink transition-colors hover:bg-white"
              >
                Sign up on Ion
                <ArrowUpRight className="size-4 opacity-60" />
              </a>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-6 py-2.5 font-medium text-fog backdrop-blur-[1.5px] transition-colors hover:border-white/25 hover:bg-white/[0.03]"
              >
                Join the Discord
                <ArrowUpRight className="size-4 opacity-60" />
              </a>
            </div>
          </div>
          <a
            href="#about"
            aria-label="Scroll to how the club works"
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-mist/50 transition-colors hover:text-fog"
          >
            <ChevronDown className="size-5" />
          </a>
        </section>

        <section id="about" className="border-t border-border">
          <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="font-display bg-clip-text text-3xl font-semibold tracking-tight text-transparent [background-image:linear-gradient(to_bottom,#fff_62%,rgba(234,236,244,0.62))] md:text-4xl">
                The whole club, in three words.
              </h2>
            </div>
            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {lexicon.map((entry) => (
                <div
                  key={entry.word}
                  className="group flex flex-col rounded-2xl border border-border bg-white/[0.02] p-6 transition-colors duration-300 hover:border-white/20"
                >
                  <div className="flex items-baseline gap-2.5">
                    <h3 className="font-display text-2xl font-semibold tracking-tight underline decoration-brand/30 decoration-wavy decoration-2 underline-offset-[6px] transition-colors duration-300 group-hover:decoration-brand/80">
                      {entry.word}
                    </h3>
                    <span className="font-mono text-[13px] text-mist/70">{entry.ipa}</span>
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-mist">{entry.definition}</p>
                  <p className="mt-auto pt-3 text-[13.5px] text-mist/55 italic">{entry.usage}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border">
          <div className="mx-auto flex min-h-[calc(100svh-4.5rem)] w-full max-w-5xl flex-col items-center justify-center px-6 py-24">
            <div className="max-w-xl text-center">
              <h2 className="font-display bg-clip-text text-3xl font-semibold tracking-tight text-transparent underline decoration-brand/30 decoration-wavy decoration-2 underline-offset-[8px] [background-image:linear-gradient(to_bottom,#fff_62%,rgba(234,236,244,0.62))] md:text-4xl">
                {'com · mu · ni · ty'}
              </h2>
              <p className="mt-4 font-mono text-[13px] text-mist/70">/kəˈmjuː·nə·di/</p>
              <p className="mt-5 text-[15px] leading-relaxed text-mist">
                <span className="text-mist/60 tabular-nums">1.</span> the people you learn, build,
                and ship with.{' '}
                {/* own line on mobile so "2." can't strand at the end of the previous line */}
                <span className="block sm:inline">
                  <span className="text-mist/60 tabular-nums">2.</span>{' '}
                  <span className="relative whitespace-nowrap">
                    pictured below.
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 48 72"
                    className="absolute top-0.5 left-full ml-1.5 h-16 w-auto text-brand"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {/* two slightly offset wobbly strokes read as a pencil line */}
                    <path
                      strokeWidth="1.75"
                      d="M4 9c8-1.5 16 1 22 6 5 4.5 8 11 8 18 0 10-3 19-7 29"
                    />
                    <path
                      strokeWidth="1"
                      className="opacity-40"
                      d="M5 10.5c7-1 15 1.5 20.5 6.5 5 4.5 7.5 10 7.5 16.5 0 10-3 19.5-6.8 28.5"
                    />
                    <path strokeWidth="1.75" d="M20 55l7.5 8.5" />
                    <path strokeWidth="1.75" d="M36.5 57.5l-9.5 6.5" />
                  </svg>
                  </span>
                </span>
              </p>
            </div>

            <div className="mt-12">
              <img
                src="/club.jpg"
                alt="TJ Dev Club members gathered in the club room"
                loading="lazy"
                className="mx-auto max-h-[calc(100svh-22rem)] w-auto max-w-full rounded-2xl"
              />
            </div>
          </div>
        </section>

        {SHOW_OFFICERS ? <Officers /> : null}

        <section id="faq" className="border-t border-border">
          <div className="mx-auto max-w-2xl px-6 py-24 md:py-32">
            <h2 className="font-display bg-clip-text text-center text-3xl font-semibold tracking-tight text-transparent [background-image:linear-gradient(to_bottom,#fff_62%,rgba(234,236,244,0.62))] md:text-4xl">
              FAQ
            </h2>
            <Accordion type="single" collapsible className="mt-12">
              {faqs.map((faq, i) => (
                <AccordionItem key={faq.q} value={`item-${i}`}>
                  <AccordionTrigger className="py-5 text-fog hover:no-underline hover:text-white">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="leading-relaxed text-mist">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <footer className="overflow-hidden border-t border-border">
        <div className="mx-auto max-w-5xl px-6 pt-16">
          <div className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                Learn. Build.
                <br />
                Ship.
              </p>
              <a
                href={ION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block rounded-full bg-fog px-6 py-2.5 font-medium text-ink transition-colors hover:bg-white"
              >
                Sign up on Ion
              </a>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <ul className="space-y-2.5 text-[15px]">
                  <li><a href="#about" className="text-mist transition-colors hover:text-fog">How it works</a></li>
                  <li><a href="#faq" className="text-mist transition-colors hover:text-fog">FAQ</a></li>
                  <li><a href={ODIN_URL} target="_blank" rel="noopener noreferrer" className="text-mist transition-colors hover:text-fog">The Odin Project</a></li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2.5 text-[15px]">
                  <li><a href={ION_URL} target="_blank" rel="noopener noreferrer" className="text-mist transition-colors hover:text-fog">Sign up on Ion</a></li>
                  <li><a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="text-mist transition-colors hover:text-fog">Discord</a></li>
                  <li><a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-mist transition-colors hover:text-fog">GitHub</a></li>
                  <li><a href="mailto:hello@tjdev.club" className="text-mist transition-colors hover:text-fog">hello@tjdev.club</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* the giant wordmark — click it */}
        <div
          aria-hidden="true"
          onClick={celebrate}
          className="mt-10 flex cursor-default justify-center overflow-hidden select-none"
        >
          <span className="font-display translate-y-[0.15em] bg-gradient-to-b from-fog/[0.25] via-fog/[0.07] to-fog/0 bg-clip-text text-[24vw] leading-none font-semibold tracking-[-0.04em] whitespace-nowrap text-transparent">
            Dev Club
          </span>
        </div>
      </footer>
    </div>
  )
}

export default App
