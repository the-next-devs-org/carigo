"use client"

import type React from "react"

import { Phone, Mail, AlertCircle } from "lucide-react"

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl bg-card/70 p-4 backdrop-blur-md ring-1 ring-border">{children}</div>
}

export default function ProfileColumn() {
  return (
    <aside className="sticky top-4 flex h-[calc(100dvh-2rem)] flex-col gap-4 md:gap-6">
      <Card>
        <div className="flex items-center gap-3">
          <img src="/images/profile.png" alt="User" className="size-16 rounded-2xl object-cover ring-1 ring-border" />
          <div>
            <div className="text-base font-semibold">Maria Anderson</div>
            <div className="text-xs text-foreground/60">CEO at Andersson Mobility</div>
            <div className="mt-1 text-xs text-foreground/60">4.9 rating • 5 år</div>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="mb-3 text-sm font-medium text-foreground/70">Kund i fokus</h3>
        <ul className="grid gap-2 text-sm">
          <li className="flex items-center gap-3">
            <Phone className="size-4 text-foreground/60" />
            <a href="tel:+46702334567" className="hover:underline">
              +46 70 233 45 67
            </a>
          </li>
          <li className="flex items-center gap-3">
            <Mail className="size-4 text-foreground/60" />
            <a href="mailto:maria@example.com" className="hover:underline">
              maria@example.com
            </a>
          </li>
        </ul>
      </Card>

      <Card>
        <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground/70">
          <AlertCircle className="size-4 text-[color:var(--color-chart-5)]" />
          Viktig notis
        </h3>
        <p className="text-sm text-foreground/70">
          Påminnelse: Obetald faktura från
          <span className="ml-1 font-medium text-[color:var(--color-chart-5)]">Ben Bilfirma AB</span> — 12 690 kr
        </p>
      </Card>
    </aside>
  )
}
