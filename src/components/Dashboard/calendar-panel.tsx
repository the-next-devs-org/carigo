"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

export default function CalendarPanel() {
  return (
    <section className="rounded-2xl bg-card/70 p-4 backdrop-blur-md ring-1 ring-border">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground/70">Aktivitets & Översyn</h3>
        <div className="flex items-center gap-1">
          <button className="rounded-lg bg-muted p-1 ring-1 ring-border">
            <ChevronLeft className="size-4 text-foreground/70" />
          </button>
          <button className="rounded-lg bg-muted p-1 ring-1 ring-border">
            <ChevronRight className="size-4 text-foreground/70" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-xs">
        {["M", "T", "O", "T", "F", "L", "S"].map((d) => (
          <div key={d} className="py-1 text-foreground/60">
            {d}
          </div>
        ))}
        {Array.from({ length: 35 }).map((_, i) => (
          <div
            key={i}
            className={`rounded-lg py-3 ring-1 ring-border ${i === 16 ? "bg-primary/10 text-primary" : "bg-muted/40"}`}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </section>
  )
}
