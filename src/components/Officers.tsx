type Officer = {
  name: string
  role: string
  /**
   * Filename of a photo inside public/officers/, e.g. "jane-doe.jpg".
   * Drop the image in that folder and it deploys with the site.
   * Square images (~400x400) look best. Omit to show initials instead.
   */
  photo?: string
}

// Currently hidden — flip SHOW_OFFICERS in App.tsx and fill this in to bring the section back.
const officers: Officer[] = [
  { name: 'TBD', role: 'Team Lead' },
  { name: 'TBD', role: 'Frontend Lead' },
  { name: 'TBD', role: 'Backend Lead' },
  { name: 'TBD', role: 'Standalone Apps Lead' },
  { name: 'TBD', role: 'Treasurer & Event Coordinator' },
  { name: 'TBD', role: 'Low-Level Programming Specialist' },
]

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0] ?? '')
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function Officers() {
  return (
    <section id="officers" className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display bg-clip-text text-3xl font-semibold tracking-tight text-transparent [background-image:linear-gradient(to_bottom,#fff_62%,rgba(234,236,244,0.62))] md:text-4xl">
            The team
          </h2>
          <p className="mt-4 text-mist">Dev Club is run by students. Say hi at any meeting.</p>
        </div>
        <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
          {officers.map((officer) => (
            <li key={officer.role} className="flex flex-col items-center text-center">
              {officer.photo ? (
                <img
                  src={`/officers/${officer.photo}`}
                  alt={officer.name}
                  loading="lazy"
                  className="size-20 rounded-full object-cover ring-1 ring-border"
                />
              ) : (
                <div className="flex size-20 items-center justify-center rounded-full bg-panel text-xl font-semibold text-iris ring-1 ring-border">
                  {initials(officer.name)}
                </div>
              )}
              <p className="mt-4 font-medium text-fog">{officer.name}</p>
              <p className="mt-1 text-sm text-mist">{officer.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
