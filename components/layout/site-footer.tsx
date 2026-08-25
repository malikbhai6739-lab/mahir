import Link from "next/link";
import { footerGroups } from "@/data/homepage";
import { BrandLogo } from "@/components/ui/brand-logo";

export function SiteFooter() {
  return (
    <footer id="footer" className="bg-[#071b2f] text-white">
      <div className="site-container py-14 sm:py-16">
        <div className="grid gap-12 border-b border-white/12 pb-12 lg:grid-cols-[1.15fr_2fr] lg:gap-16">
          <div>
            <BrandLogo inverted />
            <p className="mt-5 max-w-sm text-sm leading-7 text-[#b9c9da]">
              Professional home services made easier, safer, and more dependable
              for homes and businesses across Pakistan.
            </p>
            <div className="mt-6 flex flex-wrap gap-2" aria-label="Social links">
              {["Facebook", "Instagram", "LinkedIn", "X"].map((platform) => (
                <Link
                  key={platform}
                  href="#footer"
                  aria-label={`${platform} placeholder link`}
                  className="rounded-lg border border-white/15 px-3 py-2 text-xs font-medium text-[#d7e2ed] transition-colors hover:border-white/35 hover:text-white"
                >
                  {platform}
                </Link>
              ))}
            </div>
          </div>

          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-xs font-semibold uppercase tracking-[0.1em] text-white">
                  {group.title}
                </h2>
                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm leading-6 text-[#aebfd0] transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-5 pt-7 text-xs text-[#91a6ba] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Mahir Company. All rights reserved.</p>
          <nav aria-label="Legal navigation">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {["Terms of Use", "Privacy Policy", "Cookie Policy"].map((item) => (
                <li key={item}>
                  <Link href="#footer" className="transition-colors hover:text-white">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
