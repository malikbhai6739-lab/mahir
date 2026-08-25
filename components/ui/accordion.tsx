type AccordionItemData = {
  question: string;
  answer: string;
};

type AccordionProps = {
  items: AccordionItemData[];
};

export function Accordion({ items }: AccordionProps) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 py-5 text-left text-lg font-semibold leading-snug text-foreground transition-colors hover:text-brand sm:text-xl [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <span
              aria-hidden="true"
              className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-soft text-2xl font-light leading-none text-brand transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="max-w-3xl pb-6 pr-12 text-base leading-7 text-muted sm:text-lg sm:leading-8">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
