"use client"

import { Pie, PieChart, Cell, ResponsiveContainer, Legend } from "recharts"

const data = [
  { name: "Triologik", value: 40, color: "var(--color-chart-1)" },
  { name: "Sved", value: 30, color: "var(--color-chart-2)" },
  { name: "Service", value: 20, color: "var(--color-chart-4)" },
  { name: "Övrigt", value: 10, color: "var(--color-chart-5)" },
]

export default function DonutPanel() {
  return (
    <section className="rounded-2xl bg-card/70 p-4 backdrop-blur-md ring-1 ring-border">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground/70">Analys</h3>
        <div className="rounded-lg bg-muted px-2 py-1 text-xs ring-1 ring-border">140</div>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={85}
              stroke="var(--color-card)"
              strokeWidth={4}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`var(--color-chart-${index + 1})`} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        {data.map((d, i) => (
          <div key={d.name} className="flex items-center gap-2">
            <span className="size-2 rounded-full" style={{ background: `var(--color-chart-${i + 1})` }} />
            <span className="text-foreground/70">{d.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
