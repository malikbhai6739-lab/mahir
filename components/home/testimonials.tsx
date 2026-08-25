import { testimonials } from "@/data/homepage";
import { SectionHeading } from "@/components/ui/section-heading";

export function Testimonials() {
  return (
    <section
      aria-labelledby="reviews-heading"
      className="bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="site-container">
        <SectionHeading
          eyebrow="Customer reviews"
          title="Trusted in homes like yours"
          description="Thoughtful service, clear communication, and professionals who respect your time and space."
          id="reviews-heading"
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex min-h-80 flex-col rounded-[1.5rem] border border-line bg-background p-6 sm:p-8"
            >
              <div>
                <span className="sr-only">5 out of 5 stars</span>
                <span
                  aria-hidden="true"
                  className="text-[0.95rem] tracking-[0.18em] text-[#e6a72e]"
                >
                  ★★★★★
                </span>
              </div>
              <blockquote className="mt-7 flex-1 text-lg font-normal leading-8 tracking-[-0.01em] text-foreground">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3 border-t border-line pt-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-soft text-sm font-bold text-brand">
                  {testimonial.initials}
                </span>
                <span>
                  <span className="block font-semibold text-foreground">
                    {testimonial.name}
                  </span>
                  <span className="mt-0.5 block text-sm text-muted">
                    {testimonial.service} · {testimonial.city}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
