/**
 * Utility functions for generating and handling public signing links
 */

/**
 * Generate a regular signing link for logged-in users
 * @param agreementId - The agreement ID
 * @returns URL for regular signing
 */
export const generateRegularSigningLink = (
  agreementId: string | number
): string => {
  return `/sign-agreement/${agreementId}`;
};

/**
 * Generate a public signing link with token and expiry
 * @param agreementId - The agreement ID
 * @param token - Access token for the agreement
 * @param expiryHours - Hours until link expires (default: 1 hour)
 * @returns Full URL for public signing
 */
export const generatePublicSigningLink = (
  agreementId: string | number,
  token: string,
  expiryHours: number = 1
): string => {
  const baseUrl = window.location.origin;
  const expiryTimestamp = Math.floor(Date.now() / 1000) + expiryHours * 3600;

  return `${baseUrl}/agreement-sign/${agreementId}?token=${token}&expires=${expiryTimestamp}`;
};

/**
 * Generate signing link based on context (public or regular)
 * @param agreementId - The agreement ID
 * @param options - Options for link generation
 * @returns Appropriate signing link
 */
export const generateSigningLink = (
  agreementId: string | number,
  options?: {
    isPublic?: boolean;
    token?: string;
    expiryHours?: number;
  }
): string => {
  if (options?.isPublic && options?.token) {
    return generatePublicSigningLink(
      agreementId,
      options.token,
      options.expiryHours
    );
  }
  return generateRegularSigningLink(agreementId);
};

/**
 * Check if a public signing link is expired
 * @param expiryTimestamp - Unix timestamp when link expires
 * @returns boolean indicating if link is expired
 */
export const isLinkExpired = (expiryTimestamp: string | number): boolean => {
  const expiry =
    typeof expiryTimestamp === "string"
      ? parseInt(expiryTimestamp)
      : expiryTimestamp;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  return currentTimestamp > expiry;
};

/**
 * Get remaining time until link expires
 * @param expiryTimestamp - Unix timestamp when link expires
 * @returns Object with hours, minutes, and seconds remaining
 */
export const getRemainingTime = (expiryTimestamp: string | number) => {
  const expiry =
    typeof expiryTimestamp === "string"
      ? parseInt(expiryTimestamp)
      : expiryTimestamp;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const remainingSeconds = expiry - currentTimestamp;

  if (remainingSeconds <= 0) {
    return { hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;

  return { hours, minutes, seconds, expired: false };
};

/**
 * Format remaining time as a readable string
 * @param expiryTimestamp - Unix timestamp when link expires
 * @returns Formatted time string (e.g., "45 minutes remaining")
 */
export const formatRemainingTime = (
  expiryTimestamp: string | number
): string => {
  const { hours, minutes, seconds, expired } =
    getRemainingTime(expiryTimestamp);

  if (expired) {
    return "Link expired";
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m remaining`;
  } else if (minutes > 0) {
    return `${minutes} minutes remaining`;
  } else {
    return `${seconds} seconds remaining`;
  }
};
