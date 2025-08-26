import { Github, UserCheck, Code2, MessageSquare, Calendar, ExternalLink, FileText } from 'lucide-react';
import { useEffect, useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const officers = [
  {
    name: 'Eric Guo',
    role: 'Team Lead',
    imageUrl: 'officers/eric.jpg',
    githubUrl: 'https://github.com/BaconErie',
  },
  {
    name: 'Aarush Chaurasis',
    role: 'Frontend Lead',
    imageUrl: 'officers/aarush.jpg',
    githubUrl: 'https://github.com/aarushtools',
  },
  {
    name: 'Bryce Conrad',
    role: 'Backend Lead',
    imageUrl: 'officers/bryce.jpg',
    githubUrl: 'https://github.com/' + 'makors',
  },
  {
    name: 'Sroshsafa Shirzay',
    role: 'Standalone Apps Lead',
    imageUrl: 'officers/srosh.jpg',
    githubUrl: 'https://github.com/sroshc',
  },
  {
    name: 'Hridhaan Banerjee',
    role: 'Treasurer and Event Coordinator',
    imageUrl: 'officers/hridhaan.jpg',
    githubUrl: 'https://github.com/HridhaanB',
  },
  {
    name: 'Shaun Saladi',
    role: 'Low-Level Programming Specialist',
    imageUrl: 'https://avatars.githubusercontent.com/u/1024025',
    githubUrl: 'https://github.com/shaun208',
  },
]

type Lecture = {
  filename: string;
  date: string
  title: string
  description?: string
  links: { label: string; href: string; kind?: 'slides' | 'code' | 'signup' | 'other' }[]
}

function App() {
  const [fetchedLectures, setFetchedLectures] = useState<null | { upcoming: Lecture[]; previous: Lecture[] }>(null)
  const languageExamples = [
    {
      id: 'js',
      label: 'JavaScript',
      fileName: 'welcome.js',
      run: '$ node welcome.js',
      code: `function joinDevClub() {\n  console.log(welcomeMessage);\n  surprise();\n}`,
    },
    {
      id: 'ts',
      label: 'TypeScript',
      fileName: 'welcome.ts',
      run: '$ ts-node welcome.ts',
      code: `function joinDevClub(): void {\n  console.log(welcomeMessage);\n  surprise();\n}`,
    },
    {
      id: 'py',
      label: 'Python',
      fileName: 'welcome.py',
      run: '$ python welcome.py',
      code: `def join_dev_club():\n    print(welcome_message)\n    surprise()`,
    },
    {
      id: 'java',
      label: 'Java',
      fileName: 'Welcome.java',
      run: '$ javac Welcome.java && java Welcome',
      code: `static void joinDevClub() {\n  System.out.println(welcomeMessage);\n  surprise();\n}`,
    },
    {
      id: 'cpp',
      label: 'C++',
      fileName: 'welcome.cpp',
      run: '$ g++ welcome.cpp -o welcome && ./welcome',
      code: `void joinDevClub() {\n  std::cout << welcomeMessage << std::endl;\n  surprise();\n}`,
    },
    {
      id: 'go',
      label: 'Go',
      fileName: 'welcome.go',
      run: '$ go run welcome.go',
      code: `func joinDevClub() {\n  fmt.Println(welcomeMessage)\n  surprise()\n}`,
    },
    {
      id: 'rs',
      label: 'Rust',
      fileName: 'welcome.rs',
      run: '$ cargo run',
      code: `fn join_dev_club() {\n  println!("{}", welcome_message);\n  surprise();\n}`,
    },
    {
      id: 'sh',
      label: 'Bash',
      fileName: 'welcome.sh',
      run: '$ bash welcome.sh',
      code: `join_dev_club() {\n  echo "$welcome_message"\n  surprise\n}`,
    },
  ] as const
  const [currentLangIndex, setCurrentLangIndex] = useState(0)
  const [showWelcome, setShowWelcome] = useState(false)

  // still static
  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const res = await fetch('/lectures.json', { headers: { 'Accept': 'application/json' } })
        if (!res.ok) return
        const data = await res.json()
        if (!cancelled && data && (Array.isArray(data.upcoming) || Array.isArray(data.previous))) {
          setFetchedLectures({
            upcoming: Array.isArray(data.upcoming) ? data.upcoming.sort((a: Lecture, b: Lecture) => {
              // Extract the M-D part
              const [monthA, dayA] = a.filename.match(/^(\d+)-(\d+)-/)?.slice(1, 3).map(Number) || [];
              const [monthB, dayB] = b.filename.match(/^(\d+)-(\d+)-/)?.slice(1, 3).map(Number) || [];

              // Convert to a comparable number (or Date)
              return new Date(2000, monthA - 1, dayA).getTime() - new Date(2000, monthB - 1, dayB).getTime();
            }) : [],
            previous: Array.isArray(data.previous) ? data.previous : [],
          })
        }
      } catch (_) {
        // ignore and keep placeholders
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentLangIndex((prev) => (prev + 1) % languageExamples.length)
    }, 3500)
    return () => clearInterval(intervalId)
  }, [])

  const currentExample = languageExamples[currentLangIndex]

  const handleRun = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    })
    setShowWelcome(true)
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white font-['Inter']" id="root">
      <header className="z-50 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <img src="logo.svg" alt="logo" className="h-12 w-auto transition-transform hover:scale-105" />
            <h1 className="text-2xl font-bold pl-2">TJHSST Dev Club</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#faq"
              className="relative text-white/80 hover:text-white transition-colors duration-200 font-medium group"
            >
              FAQ
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white/60 group-hover:w-full transition-all duration-200 ease-out"></span>
            </a>
            <a
              href="https://discord.gg/sP3WVQRQPC"
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-white/80 hover:text-white transition-colors duration-200 font-medium group flex items-center gap-1"
            >
              Discord
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white/60 group-hover:w-full transition-all duration-200 ease-out"></span>
            </a>
            <a
              href="https://ion.tjhsst.edu/eighth/activity/12"
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-white hover:text-white transition-colors duration-200 font-bold group flex items-center gap-1"
            >
              Sign up
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white/60 group-hover:w-full transition-all duration-200 ease-out"></span>
            </a>
          </nav>
        </div>
      </header>
      <main>
        {/* hero content */}
        <div className="flex items-center min-h-[calc(100svh-80px)] max-w-screen-xl mx-auto px-8 gap-x-12 mb-0">
          <div className="flex-1">
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Code. Create. Collaborate.
              </h1>
              <p className="text-xl text-white/70 max-w-lg">
                Join TJHSST's premier web development community where students learn, build, and innovate together.
              </p>
              <div>
                <a
                  href="https://ion.tjhsst.edu/eighth/activity/12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg border border-white/20 hover:border-white/30 transition-all duration-200 backdrop-blur-sm"
                >
                  Join Us
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-transparent hover:bg-white/10 text-white/80 hover:text-white font-medium rounded-lg border border-white/20 hover:border-white/30 transition-all duration-200 backdrop-blur-sm ml-4"
                >
                  Learn More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* right side of hero content, the interactive console */}
          <div className="flex-1 hidden lg:flex justify-end items-center">
            <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg shadow-2xl border border-white/10 w-96 max-w-full">
              <div className="flex items-center justify-between px-4 py-3 bg-gray-800/50 rounded-t-lg border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-white/60 text-sm font-medium">{currentExample.fileName}</div>
                <div className="w-12 text-right text-[10px] text-white/40">{currentExample.label}</div>
              </div>

              <div className="p-4 font-mono text-sm">
                <pre className="text-white/80 whitespace-pre leading-6">{currentExample.code}</pre>
              </div>

              {/* interactive console, which really should only be available on computer */}
              <div className="p-4 font-mono text-sm bg-black/30">
                <div className="text-green-400 mb-2">{currentExample.run}</div>
                <div className="text-white/80 mb-1">Dev Club Interactive Console v1.0.0</div>
                <hr className="mb-3 border-white/10" />
                {showWelcome ? (
                  <div className="text-white/80 mb-3">
                    <div className="font-semibold">Welcome to Dev Club! 🎉</div>
                    <div>
                      - <a href="https://discord.gg/sP3WVQRQPC" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">Join the Discord!</a>
                    </div>
                    <div>
                      - <a href="https://ion.tjhsst.edu/eighth/activity/12" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">Sign up on Wednesday 8B!</a>
                    </div>
                  </div>
                ) : null}
                <button
                  type="button"
                  onClick={handleRun}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-md border border-white/20 hover:border-white/30 transition-all duration-200"
                >
                  Run joinDevClub()
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* about content */}
        <div id="about" className="py-12 md:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-blue-400">What We Do</h2>
              <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Mentoring, Projects, Community
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                TJ Dev Club meets Wednesdays 8B. Developers of all skill levels are welcome to learn, build, and plug into a supportive developer community.
              </p>
            </div>
            <div className="mx-auto mt-12 max-w-2xl">
              <ol className="space-y-8">
                <li className="relative flex gap-4">
                  <div className="shrink-0">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/10 ring-1 ring-white/15">
                      <UserCheck className="h-4 w-4 text-blue-300" />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Mentoring</h3>
                    <p className="mt-1 text-base leading-7 text-gray-400">Collaborate with fellow students and club officers through small groups, guided tutorials, and lectures from experts. Mentor others to help them succeed and earn service hours.</p>
                  </div>
                </li>
                <li className="relative flex gap-4">
                  <div className="shrink-0">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/10 ring-1 ring-white/15">
                      <Code2 className="h-4 w-4 text-blue-300" />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Projects</h3>
                    <p className="mt-1 text-base leading-7 text-gray-400">Build for competitions or for yourself. Ship at least one project this year. We'll help you win HackTJ.</p>
                  </div>
                </li>
                <li className="relative flex gap-4">
                  <div className="shrink-0">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/10 ring-1 ring-white/15">
                      <MessageSquare className="h-4 w-4 text-blue-300" />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Community</h3>
                    <p className="mt-1 text-base leading-7 text-gray-400">Share your work at frequent competitions, make friends, and stay connected on Discord. Our strong community is like no other.</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* lectures content */}
        <div id="lectures" className="py-12 md:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-blue-400">Lectures</h2>
              <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">Upcoming & Previous</p>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                See what's coming up and catch up on recent sessions.
              </p>
            </div>
            <div className="mx-auto mt-12 max-w-6xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Upcoming lectures */}
                {fetchedLectures?.upcoming.map((lecture) => (
                  <div
                    key={`upcoming-${lecture.date}-${lecture.title}`}
                    className="rounded-xl bg-white/10 backdrop-blur-xl border border-white/15 p-5 shadow-lg transition-all hover:bg-white/15 hover:shadow-xl hover:-translate-y-0.5 relative"
                  >
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-500/20 border border-green-400/30 px-2 py-0.5 text-xs text-green-300 font-medium">
                        <Calendar className="h-3 w-3" />
                        Upcoming
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-1 rounded-full bg-white/10 border border-white/15 px-2 py-0.5 text-xs text-white/70">
                      {lecture.date}
                    </div>
                    <div className="mt-2 text-base md:text-lg font-semibold text-white pr-20">{lecture.title}</div>
                    {lecture.description ? (
                      <p className="mt-1 text-sm text-white/70">{lecture.description}</p>
                    ) : null}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {lecture.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target={link.href.startsWith('http') ? '_blank' : undefined}
                          rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="inline-flex items-center gap-1.5 rounded-md bg-white/10 border border-white/15 px-2.5 py-1.5 text-sm text-white/90 hover:bg-white/20"
                        >
                          {link.kind === 'slides' ? <FileText className="h-4 w-4" /> : null}
                          {link.kind === 'code' ? <Github className="h-4 w-4" /> : null}
                          {link.kind !== 'slides' && link.kind !== 'code' ? <ExternalLink className="h-4 w-4" /> : null}
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
                {/* Previous lectures */}
                {fetchedLectures?.previous.map((lecture) => (
                  <div
                    key={`previous-${lecture.date}-${lecture.title}`}
                    className="rounded-xl bg-white/10 backdrop-blur-xl border border-white/15 p-5 shadow-lg transition-all hover:bg-white/15 hover:shadow-xl hover:-translate-y-0.5 relative"
                  >
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-500/20 border border-gray-400/30 px-2 py-0.5 text-xs text-gray-300 font-medium">
                        <Calendar className="h-3 w-3" />
                        Previous
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-1 rounded-full bg-white/10 border border-white/15 px-2 py-0.5 text-xs text-white/70">
                      {lecture.date}
                    </div>
                    <div className="mt-2 text-base md:text-lg font-semibold text-white pr-20">{lecture.title}</div>
                    {lecture.description ? (
                      <p className="mt-1 text-sm text-white/70">{lecture.description}</p>
                    ) : null}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {lecture.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target={link.href.startsWith('http') ? '_blank' : undefined}
                          rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="inline-flex items-center gap-1.5 rounded-md bg-white/10 border border-white/15 px-2.5 py-1.5 text-sm text-white/90 hover:bg-white/20"
                        >
                          {link.kind === 'slides' ? <FileText className="h-4 w-4" /> : null}
                          {link.kind === 'code' ? <Github className="h-4 w-4" /> : null}
                          {link.kind !== 'slides' && link.kind !== 'code' ? <ExternalLink className="h-4 w-4" /> : null}
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* officers content */}
        <div id="officers" className="py-12 md:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-blue-400">Our Team</h2>
              <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">Meet The Officers</p>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Dev Club is led by a dedicated team of student developers who are passionate about sharing their knowledge and fostering a vibrant community.
              </p>
            </div>
            <ul
              role="list"
              className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
            >
              {officers.map((officer) => (
                <li key={officer.name} className="flex flex-col items-center text-center">
                  <img className="size-40 rounded-lg object-cover" src={officer.imageUrl} alt={`Profile of ${officer.name}`} />
                  <h3 className="mt-4 text-lg font-semibold leading-7 tracking-tight text-white">
                    {officer.name}
                  </h3>
                  <p className="text-sm leading-6 text-blue-400">{officer.role}</p>
                  <a
                    href={officer.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-4 inline-flex items-center gap-x-2 text-sm font-medium text-gray-400 hover:text-white"
                  >
                    <Github className="h-5 w-5 text-gray-500 group-hover:text-white" />
                    GitHub
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* FAQ content */}
        <div id="faq" className="py-12 md:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-blue-400">FAQ</h2>
              <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">Frequently Asked Questions</p>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Everything you need to know about TJ Dev Club.
              </p>
            </div>
            <div className="mx-auto mt-12 max-w-2xl lg:max-w-3xl">
              <Accordion type="single" collapsible className="divide-y divide-white/10">
                <AccordionItem value="item-1" className="border-white/10">
                  <AccordionTrigger className="text-white">
                    When and where does the club meet?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    We meet on Wednesdays during 8B. Be sure to check Ion for the latest 8th period information.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-white/10">
                  <AccordionTrigger className="text-white">
                    Do I need prior experience to join?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Not at all! We welcome beginners and experienced developers alike with lectures, projects, and competitions for all levels.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-white/10">
                  <AccordionTrigger className="text-white">
                    I know basically everything about web development. Can I still join?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Absolutely! We offer a mentorship program for experienced developers to help other club members succeed, with the possibility of service hours in the future.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="border-white/10">
                  <AccordionTrigger className="text-white">
                    What technologies will I learn?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    We start with the fundamentals: HTML, CSS, and JavaScript for beginners. Advanced members can dive into React, TypeScript, Node.js, APIs, deployment, UI/UX, and more. We also host mini-competitions with prizes that aren't just food.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5" className="border-white/10">
                  <AccordionTrigger className="text-white">
                    How can I get updates and additional resources?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Join our Discord, follow the GitHub organization, and check the website. We post slides, code, and announcements there.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6" className="border-white/10">
                  <AccordionTrigger className="text-white">
                    How do I sign up for sessions?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Use Ion to sign up for our Wednesday 8B sessions. You can also use the “Sign up” buttons on this page for quick access.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gray-900/40 border-t border-white/10">
        <div className="max-w-screen-xl mx-auto px-6 py-8 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <img src="logo.svg" alt="TJHSST Dev Club" className="h-10 w-auto" />
                <span className="ml-3 text-xl font-semibold text-white">TJHSST Dev Club</span>
              </div>
              <p className="text-sm text-gray-400">
                TJHSST's premier web development community where students learn, build, and innovate together.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-base font-semibold leading-6 text-white">Navigate</h3>
                  <ul role="list" className="mt-3 space-y-2">
                    <li>
                      <a href="#about" className="text-sm leading-6 text-gray-300 hover:text-white">
                        About
                      </a>
                    </li>
                    <li>
                      <a href="#lectures" className="text-sm leading-6 text-gray-300 hover:text-white">
                        Lectures
                      </a>
                    </li>
                    <li>
                      <a href="#officers" className="text-sm leading-6 text-gray-300 hover:text-white">
                        Officers
                      </a>
                    </li>
                    <li>
                      <a href="#faq" className="text-sm leading-6 text-gray-300 hover:text-white">
                        FAQ
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-base font-semibold leading-6 text-white">Get Involved</h3>
                  <ul role="list" className="mt-3 space-y-2">
                    <li>
                      <a href="https://ion.tjhsst.edu/eighth/activity/12" target="_blank" rel="noopener noreferrer" className="text-sm leading-6 text-gray-300 hover:text-white">
                        Sign up
                      </a>
                    </li>
                    <li>
                      <a href="https://discord.gg/sP3WVQRQPC" target="_blank" rel="noopener noreferrer" className="text-sm leading-6 text-gray-300 hover:text-white">
                        Discord
                      </a>
                    </li>
                    <li>
                      <a href="mailto:hello@tjdev.club" className="text-sm leading-6 text-gray-300 hover:text-white">
                        Email: hello@tjdev.club
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-1 md:gap-8">
                <div>
                  <h3 className="text-base font-semibold leading-6 text-white">Resources</h3>
                  <ul role="list" className="mt-3 space-y-2">
                    <li>
                      <a href="https://github.com/TJHSST-Dev-Club" target="_blank" rel="noopener noreferrer" className="text-sm leading-6 text-gray-300 hover:text-white">
                        GitHub
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-white/10 pt-8 sm:mt-16">
            <p className="text-sm leading-5 text-gray-400">&copy; {new Date().getFullYear()} TJHSST Dev Club. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
