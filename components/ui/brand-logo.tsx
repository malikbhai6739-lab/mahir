import Link from "next/link";

type BrandLogoProps = {
  inverted?: boolean;
};

export function BrandLogo({ inverted = false }: BrandLogoProps) {
  return (
    <Link
      href="/"
      aria-label="Mahir Company home"
      className="inline-flex shrink-0 items-center gap-2.5 rounded-lg"
    >
      <span
        aria-hidden="true"
        className="grid size-9 place-items-center rounded-[0.7rem] bg-brand text-lg font-black tracking-[-0.08em] text-white shadow-[0_7px_18px_rgba(11,99,206,0.2)]"
      >
        M
      </span>
      <span
        className={`text-[1.35rem] font-bold tracking-[-0.035em] ${
          inverted ? "text-white" : "text-foreground"
        }`}
      >
        mahir<span className="text-brand">.</span>
      </span>
    </Link>
  );
}
