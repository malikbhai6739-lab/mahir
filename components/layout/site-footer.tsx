import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { StoreBadges } from "@/components/ui/store-badges";

const mainServiceLinks = [
  { label: "Home Services", href: "/services?category=home-maintenance#all-services" },
  { label: "Cleaning Services", href: "/services?category=cleaning#all-services" },
  { label: "Maintained by Mahir", href: "/#maintenance-heading" },
  { label: "All Services", href: "/services" },
] as const;

const quickLinks = [
  { label: "About Us", href: "/#why-mahir" },
  { label: "Contact Us", href: "#footer" },
  { label: "FAQs", href: "/#faq" },
  { label: "Blogs", href: "/#guides" },
] as const;

const socialLinks = [
  { label: "X/Twitter", href: "https://x.com/mahircompany", Icon: FaXTwitter },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/mahircompany", Icon: FaLinkedinIn },
  { label: "Pinterest", href: "https://www.pinterest.com/mahircompany", Icon: FaPinterestP },
  { label: "YouTube", href: "https://www.youtube.com/@mahircompany", Icon: FaYoutube },
  { label: "Instagram", href: "https://www.instagram.com/mahircompany", Icon: FaInstagram },
  { label: "Facebook", href: "https://www.facebook.com/mahircompany", Icon: FaFacebookF },
  { label: "TikTok", href: "https://www.tiktok.com/@mahircompany", Icon: FaTiktok },
] as const;

export function SiteFooter() {
  return (
    <footer id="footer" className="bg-[#071b2f] text-white">
      <div className="site-container py-14 sm:py-16">
        <div className="grid gap-8 border-b border-white/12 pb-12 min-[768px]:max-[1200px]:grid-cols-2 min-[768px]:max-[1200px]:gap-x-10 min-[768px]:max-[1200px]:gap-y-12 min-[1200px]:grid-cols-[1.55fr_0.72fr_0.72fr_1.05fr_1.35fr] min-[1200px]:gap-12">
          <section aria-labelledby="footer-about-heading" className="min-w-0">
            <h2 id="footer-about-heading" className="text-sm font-semibold text-white">About us</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-[#b9c9da]">
              Previously known as Mr. Mahir, Mahir Company is your go-to and
              on-demand expert for all your Home &amp; Personal Care needs. We are
              serving you 24/7 since 2019. Now as Mahir Company, we are offering
              more accessible, reliable, fast, safe, and pocket-friendly
              services to you.
            </p>
          </section>

          <nav aria-labelledby="footer-services-heading" className="min-w-0">
            <h2 id="footer-services-heading" className="text-sm font-semibold text-white">Main Services</h2>
            <ul className="mt-5 space-y-3">
              {mainServiceLinks.map((link) => (
                <li key={link.label}><Link href={link.href} className="inline-flex min-h-8 items-center text-sm leading-6 text-[#aebfd0] transition-colors hover:text-white">{link.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-quick-links-heading" className="min-w-0">
            <h2 id="footer-quick-links-heading" className="text-sm font-semibold text-white">Quick Links</h2>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}><Link href={link.href} className="inline-flex min-h-8 items-center text-sm leading-6 text-[#aebfd0] transition-colors hover:text-white">{link.label}</Link></li>
              ))}
            </ul>
          </nav>

          <section aria-labelledby="footer-connect-heading" className="min-w-0">
            <h2 id="footer-connect-heading" className="text-sm font-semibold text-white">Connect with us</h2>
            <a href="https://wa.me/923096661919" target="_blank" rel="noreferrer" className="mt-5 inline-flex flex-col gap-1 text-sm text-white transition-colors hover:text-[#8dc3ff]">
              <span className="font-semibold">Chat on WhatsApp</span>
              <span className="text-[#b9c9da]">0309 6661919</span>
            </a>
            <p className="mt-5 text-sm font-semibold text-white">Follow Mahir</p>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Social links">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <Link href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} className="grid size-9 place-items-center rounded-lg border border-white/15 text-[#d7e2ed] transition-colors hover:border-white/35 hover:text-white">
                    <social.Icon aria-hidden="true" size={16} />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="footer-newsletter-heading" className="min-w-0">
            <h2 id="footer-newsletter-heading" className="text-sm font-semibold text-white">News Letter</h2>
            <p className="mt-5 text-sm leading-6 text-[#b9c9da]">Get service updates, offers, and home care tips.</p>
            <form action="#footer" className="mt-4 w-full">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <div className="flex w-full min-w-0 items-center rounded-xl border border-white/15 bg-white/5 p-1 focus-within:border-[#8dc3ff]/70">
                <input id="footer-email" name="email" type="email" required autoComplete="email" placeholder="Email address" className="min-h-10 min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-[#91a6ba]" />
                <button type="submit" aria-label="Subscribe to the Mahir newsletter" className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand font-semibold text-white transition-colors hover:bg-[#126fdc]">→</button>
              </div>
            </form>
            <StoreBadges className="mt-5 max-w-full flex-row items-center justify-start gap-3 min-[768px]:flex-nowrap" />
          </section>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pt-7 text-xs text-[#91a6ba]">
          <p>© 2026 Mahir Company. All rights reserved.</p>
          <nav aria-label="Legal links" className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="#footer" className="transition-colors hover:text-white">Terms &amp; Conditions</Link>
            <Link href="#footer" className="transition-colors hover:text-white">Privacy Policy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
