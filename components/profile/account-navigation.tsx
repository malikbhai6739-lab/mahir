import Link from "next/link";

const links = [
  { label: "My Orders", text: "Track your service bookings.", href: "/orders" },
  { label: "Saved Addresses", text: "Manage service locations.", href: "/addresses" },
  { label: "Personal Information", text: "Update your account details.", href: "#personal-information" },
  { label: "Help & Support", text: "Get help with a booking.", href: "#support" },
];

export function AccountNavigation() {
  return <nav aria-label="Account options" className="grid gap-3 sm:grid-cols-2">{links.map((link) => <Link key={link.label} href={link.href} className="rounded-2xl border border-line bg-white p-4 transition-colors hover:border-brand hover:bg-brand-soft"><span className="font-semibold text-foreground">{link.label}</span><span className="mt-1 block text-sm leading-6 text-muted">{link.text}</span></Link>)}<button type="button" className="rounded-2xl border border-line bg-white p-4 text-left transition-colors hover:border-red-200 hover:text-red-700"><span className="font-semibold">Logout</span><span className="mt-1 block text-sm leading-6 text-muted">Sign out of this device.</span></button></nav>;
}
