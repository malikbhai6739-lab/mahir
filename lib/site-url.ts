export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://mahir-gold.vercel.app"
).replace(/\/+$/, "");

export function getAbsoluteUrl(path: string = ""): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}

export function safeJsonLdReplacer(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
