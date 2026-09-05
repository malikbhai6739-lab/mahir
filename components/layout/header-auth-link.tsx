"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { getAuthToken, subscribeAuthState } from "@/lib/auth-storage";

type HeaderAuthLinkProps = {
  className: string;
  onNavigate?: () => void;
  showArrow?: boolean;
};

function getAuthSnapshot() {
  return Boolean(getAuthToken());
}

function getServerAuthSnapshot() {
  return false;
}

export function HeaderAuthLink({
  className,
  onNavigate,
  showArrow = false,
}: HeaderAuthLinkProps) {
  const isAuthenticated = useSyncExternalStore(
    subscribeAuthState,
    getAuthSnapshot,
    getServerAuthSnapshot,
  );

  return (
    <Link
      href={isAuthenticated ? "/profile" : "/login"}
      onClick={onNavigate}
      className={className}
    >
      {isAuthenticated ? "My Profile" : "Login"}
      {showArrow ? (
        <span aria-hidden="true" className="text-brand">
          &rarr;
        </span>
      ) : null}
    </Link>
  );
}
