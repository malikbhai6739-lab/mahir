import Image from "next/image";
import Link from "next/link";

type StoreBadgesProps = {
  id?: string;
  className?: string;
  compact?: boolean;
  variant?: "default" | "app-promo";
};

export function StoreBadges({
  id,
  className = "",
  compact = false,
  variant = "default",
}: StoreBadgesProps) {
  const appleLinkSize = compact ? "h-8" : "h-8";
  const appleImageSize = variant === "app-promo" ? "h-9" : "h-8";
  const googleLinkSize = compact ? "h-10" : "h-12";
  const googleImageSize = compact ? "h-10" : "h-12";

  return (
    <div
      id={id}
      className={`flex flex-wrap items-center gap-3 ${className}`}
    >
      <Link
        href="/#app-downloads"
        aria-label="Download Mahir on the App Store (coming soon)"
        className={`inline-flex max-w-full shrink-0 rounded-md ${appleLinkSize}`}
      >
        <Image
          src="/badges/download-on-the-app-store.svg"
          alt="Download on the App Store"
          width={120}
          height={40}
          unoptimized
          className={`${appleImageSize} w-auto object-contain`}
        />
      </Link>
      <Link
        href="/#app-downloads"
        aria-label="Get Mahir on Google Play (coming soon)"
        className={`inline-flex max-w-full shrink-0 rounded-md ${googleLinkSize}`}
      >
        <Image
          src="/badges/get-it-on-google-play.png"
          alt="Get it on Google Play"
          width={646}
          height={250}
          className={`${googleImageSize} w-auto object-contain`}
        />
      </Link>
    </div>
  );
}
