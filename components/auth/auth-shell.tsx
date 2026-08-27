import type { ReactNode } from "react";
import { BrandLogo } from "@/components/ui/brand-logo";

export function AuthShell({ children, asideTitle, asideText }: { children: ReactNode; asideTitle: string; asideText: string }) {
  return (
    <main className="min-h-[calc(100vh-4.75rem)] bg-background">
      <div className="site-container grid min-h-[calc(100vh-4.75rem)] items-center gap-10 py-10 lg:grid-cols-[1fr_0.78fr] lg:py-16">
        <div className="hidden rounded-[1.75rem] bg-brand p-10 text-white lg:block xl:p-14">
          <BrandLogo inverted />
          <p className="mt-20 text-xs font-semibold uppercase tracking-[0.13em] text-white/75">Mahir at your service</p>
          <h2 className="mt-4 max-w-lg text-4xl font-bold leading-tight tracking-[-0.02em]">{asideTitle}</h2>
          <p className="mt-5 max-w-md text-base leading-7 text-white/85">{asideText}</p>
        </div>
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 lg:hidden"><BrandLogo /></div>
          {children}
        </div>
      </div>
    </main>
  );
}
