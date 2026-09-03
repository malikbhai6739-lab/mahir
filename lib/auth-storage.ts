/**
 * Single storage key for the customer authentication token.
 *
 * NOTE: localStorage is used here as temporary bearer-token storage for this phase
 * and should later be upgraded if the auth architecture changes (e.g. to HTTP-only secure cookies).
 */
export const MAHIR_AUTH_TOKEN_KEY = "mahir_auth_token";

/**
 * Retrieve the current stored auth bearer token.
 * Returns null if not in browser context or if no token is stored.
 */
export function getAuthToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage.getItem(MAHIR_AUTH_TOKEN_KEY);
  } catch {
    return null;
  }
}

/**
 * Store the opaque auth bearer token.
 * Does not print or log the token.
 */
export function setAuthToken(token: string): void {
  if (typeof window === "undefined" || !token) {
    return;
  }

  try {
    window.localStorage.setItem(MAHIR_AUTH_TOKEN_KEY, token);
  } catch {
    // Gracefully handle storage quota or disabled storage.
  }
}

/**
 * Remove the stored auth token (used for logout or expired session cleanup).
 */
export function clearAuthToken(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(MAHIR_AUTH_TOKEN_KEY);
  } catch {
    // Gracefully handle storage errors.
  }
}

