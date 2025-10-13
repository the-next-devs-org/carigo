"use client"

import { Search, Bell, ChevronDown } from "lucide-react"

export default function Topbar() {
  return (
    <header className="rounded-2xl bg-card/60 p-3 backdrop-blur-md ring-1 ring-border">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-medium text-foreground/70">AutoRent Pro</h1>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="relative w-full max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground/40" />
            <input
              aria-label="Search"
              placeholder="Search"
              className="w-full rounded-xl bg-muted/60 py-2 pl-10 pr-4 text-sm outline-none ring-1 ring-input placeholder:text-foreground/40"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative rounded-xl bg-card/80 p-2 ring-1 ring-border">
            <Bell className="size-5 text-foreground/80" />
            <span className="absolute right-1 top-1 block size-2 rounded-full bg-[color:var(--color-chart-4)]" />
          </button>
          <div className="flex items-center gap-2 rounded-xl bg-card/80 px-2 py-1 ring-1 ring-border">
            <img src="/images/profile.png" alt="Current user" className="size-6 rounded-full object-cover" />
            <span className="hidden text-sm md:inline">Maria Anderson</span>
            <ChevronDown className="size-4 text-foreground/60" />
          </div>
        </div>
      </div>
    </header>
  )
}
