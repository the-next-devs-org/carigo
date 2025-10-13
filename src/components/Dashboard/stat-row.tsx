"use client"

import { TrendingUp, CreditCard, CalendarDays, Plus } from "lucide-react"

const cards = [
  {
    title: "Intäkter denna månad",
    value: "198.130 kr",
    delta: "+10%",
    sub: "405 leads",
    icon: TrendingUp,
  },
  {
    title: "Nya bokningar (vecka)",
    value: "89",
    delta: "+3",
    sub: "i jämf. vecka",
    icon: CalendarDays,
  },
  {
    title: "Kommande inlämningar (vecka)",
    value: "31",
    delta: "-3",
    sub: "förra veckan",
    icon: CreditCard,
  },
]

export default function StatRow() {
  return (
    <section aria-label="Key stats" className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
      {cards.map(({ title, value, delta, sub, icon: Icon }) => (
        <article key={title} className="relative rounded-2xl bg-card/70 p-4 backdrop-blur-md ring-1 ring-border">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-xs text-foreground/60">{title}</span>
              <div className="text-2xl font-semibold">{value}</div>
              <div className="text-xs text-foreground/60">
                <span className="rounded-lg bg-[color:var(--color-chart-5)]/15 px-2 py-0.5 text-[color:var(--color-chart-5)]">
                  {delta}
                </span>{" "}
                <span>{sub}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button className="rounded-full bg-primary/10 p-2 text-primary ring-1 ring-border">
                <Icon className="size-4" />
              </button>
              <button className="rounded-full bg-muted p-1 ring-1 ring-border">
                <Plus className="size-4 text-foreground/70" />
              </button>
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}
