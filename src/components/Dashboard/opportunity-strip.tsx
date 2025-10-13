"use client"

import { Plus } from "lucide-react"

const items = [
  { date: "Okt 6", title: "Svensson Väst AB", amount: "3.250$", tone: "var(--color-chart-3)" },
  { date: "Okt 6", title: "OrebroUAB Sotenäs i Göteborg", amount: "3.805$", tone: "var(--color-chart-5)" },
  { date: "Okt 6", title: "Audi A4", amount: "—", tone: "var(--color-chart-2)" },
  { date: "Okt 6", title: "Visma: avsatt", amount: "—", tone: "var(--color-chart-4)" },
  { date: "Okt 6", title: "Speroni sedan", amount: "22.300$", tone: "var(--color-chart-1)" },
]

export default function OpportunityStrip() {
  return (
    <section aria-label="Företagscases & Affärsmöjligheter" className="flex flex-col gap-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-sm font-medium text-foreground/70">Företagscases & Affärsmöjligheter</h2>
        <button className="inline-flex items-center gap-1 rounded-xl bg-card/70 px-3 py-1 text-xs ring-1 ring-border">
          <Plus className="size-4" />
          Ny
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
        {items.map((it, idx) => (
          <article
            key={idx}
            className="rounded-2xl p-4 ring-1 ring-border"
            style={{
              backgroundColor: "color-mix(in oklab, var(--color-card) 65%, transparent)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/60">{it.date}</span>
              <span className="size-2 rounded-full" style={{ background: `var(${it.tone})` }} aria-hidden />
            </div>
            <div className="mt-2 text-pretty font-medium">{it.title}</div>
            <div className="mt-3 text-sm text-foreground/70">{it.amount}</div>
            <div className="mt-3 flex -space-x-2">
              {[0, 1, 2].map((i) => (
                <img
                  key={i}
                  src="/images/profile.png"
                  alt="Avatar"
                  className="size-6 rounded-full ring-2 ring-card object-cover"
                />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
