"use client"

import { Home, BarChart3, Users, CarFront, FileText, Settings } from "lucide-react"

const items = [
  { icon: Home, label: "Home" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Users, label: "Customers" },
  { icon: CarFront, label: "Fleet" },
  { icon: FileText, label: "Docs" },
  { icon: Settings, label: "Settings" },
]

export default function Sidebar() {
  return (
    <aside
      aria-label="Primary"
      className="sticky top-4 h-[calc(100dvh-2rem)] rounded-2xl bg-card/60 p-2 backdrop-blur-md ring-1 ring-border"
    >
      <nav className="flex h-full flex-col items-center justify-between py-3">
        <div className="flex flex-col items-center gap-2">
          <div className="size-9 rounded-xl bg-primary/10" />
          <div className="h-px w-10 bg-border/80 my-2" />
          <ul className="flex flex-col items-center gap-2">
            {items.map(({ icon: Icon, label }, i) => (
              <li key={label}>
                <button
                  aria-label={label}
                  className={`group flex size-12 items-center justify-center rounded-xl ring-1 ring-border transition
                    ${i === 0 ? "bg-primary text-primary-foreground ring-transparent" : "bg-card/70 text-foreground/70 hover:text-foreground"}`}
                  title={label}
                >
                  <Icon className="size-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="size-10 overflow-hidden rounded-full ring-1 ring-border">
            <img src="/images/profile.png" alt="Profile" className="size-full object-cover" />
          </div>
        </div>
      </nav>
    </aside>
  )
}
