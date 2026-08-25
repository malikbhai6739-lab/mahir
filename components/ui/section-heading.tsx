import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  id: string;
  align?: "left" | "center";
  action?: ReactNode;
  inverted?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  align = "left",
  action,
  inverted = false,
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div
      className={`flex gap-6 ${
        isCentered
          ? "mx-auto max-w-3xl flex-col items-center text-center"
          : "items-end justify-between"
      }`}
    >
      <div className={isCentered ? "" : "max-w-3xl"}>
        <p
          className={`text-xs font-semibold uppercase tracking-[0.13em] ${
            inverted ? "text-white" : "text-brand"
          }`}
        >
          {eyebrow}
        </p>
        <h2
          id={id}
          className={`mt-3 text-balance text-[clamp(1.95rem,3.7vw,3rem)] font-bold leading-[1.12] tracking-[-0.01em] ${
            inverted ? "text-white" : "text-foreground"
          }`}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={`mt-5 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8 ${
              inverted ? "text-white/90" : "text-muted"
            }`}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="hidden shrink-0 sm:block">{action}</div> : null}
    </div>
  );
}
