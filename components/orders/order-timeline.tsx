import type { OrderTimelineItem } from "@/data/orders";

export function OrderTimeline({ items }: { items: OrderTimelineItem[] }) {
  return <ol className="space-y-5">{items.map((item, index) => <li key={item.label} className="relative flex gap-4">{index < items.length - 1 ? <span aria-hidden="true" className="absolute left-[0.7rem] top-7 h-[calc(100%+0.25rem)] w-px bg-line" /> : null}<span className={`relative z-10 grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold ${item.completed ? "bg-brand text-white" : "border border-line bg-white text-muted"}`}>{item.completed ? "✓" : index + 1}</span><div className="pt-0.5"><p className={`text-sm font-semibold ${item.current ? "text-brand" : "text-foreground"}`}>{item.label}</p>{item.current ? <p className="mt-1 text-sm text-muted">Your professional is preparing for the visit.</p> : null}</div></li>)}</ol>;
}
