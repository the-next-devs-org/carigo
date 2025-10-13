"use client"

import type React from "react"

import { Plus, MoreVertical } from "lucide-react"

function PanelShell({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl bg-card/70 p-4 backdrop-blur-md ring-1 ring-border">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground/70">{title}</h3>
        <div className="flex items-center gap-2">
          <button className="rounded-full bg-muted p-1 ring-1 ring-border">
            <Plus className="size-4 text-foreground/70" />
          </button>
          <button className="rounded-full bg-muted p-1 ring-1 ring-border">
            <MoreVertical className="size-4 text-foreground/70" />
          </button>
        </div>
      </div>
      {children}
    </section>
  )
}

export default function ActivitiesGrid() {
  return (
    <div className="grid gap-4 md:gap-6">
      <PanelShell title="Aktivitets & Uppföljning">
        <ul className="grid grid-cols-2 gap-3 text-sm">
          {["Företagsrese", "Fortsättningar", "Service & Betalning", "Dokument"].map((t) => (
            <li
              key={t}
              className="flex items-center justify-between rounded-xl bg-muted/60 px-3 py-2 ring-1 ring-border"
            >
              <span>{t}</span>
              <span className="rounded-lg bg-primary/10 px-2 py-0.5 text-xs text-primary">+3</span>
            </li>
          ))}
        </ul>
      </PanelShell>

      <PanelShell title="Aktivitets & Upprevsit">
        <ul className="grid grid-cols-3 gap-3 text-sm">
          {Array.from({ length: 6 }).map((_, i) => (
            <li
              key={i}
              className="flex items-center justify-between rounded-xl bg-muted/60 px-3 py-6 text-center ring-1 ring-border"
            >
              <span className="text-foreground/60">Widget {i + 1}</span>
            </li>
          ))}
        </ul>
      </PanelShell>
    </div>
  )
}
