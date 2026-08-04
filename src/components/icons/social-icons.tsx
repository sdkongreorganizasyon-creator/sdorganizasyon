import type { SVGProps } from "react";

type SocialIconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

function iconSize(size: number | undefined) {
  return size ?? 24;
}

export function InstagramIcon({
  size,
  ...props
}: SocialIconProps) {
  const resolvedSize = iconSize(size);

  return (
    <svg
      viewBox="0 0 24 24"
      width={resolvedSize}
      height={resolvedSize}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedInIcon({
  size,
  ...props
}: SocialIconProps) {
  const resolvedSize = iconSize(size);

  return (
    <svg
      viewBox="0 0 24 24"
      width={resolvedSize}
      height={resolvedSize}
      fill="currentColor"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="2.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="8" cy="8" r="1.25" />
      <rect x="6.75" y="10" width="2.5" height="7" rx="0.4" />
      <path d="M11 10h2.4v1c.8-.9 1.8-1.35 3-1.35 2.2 0 3.6 1.45 3.6 4.2V17h-2.55v-2.8c0-1.45-.5-2.25-1.65-2.25-1.25 0-1.95.85-1.95 2.45V17H11z" />
    </svg>
  );
}

export function YouTubeIcon({
  size,
  ...props
}: SocialIconProps) {
  const resolvedSize = iconSize(size);

  return (
    <svg
      viewBox="0 0 24 24"
      width={resolvedSize}
      height={resolvedSize}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 8.2a3 3 0 0 0-2.1-2.1C17.1 5.6 14.7 5.5 12 5.5s-5.1.1-6.9.6A3 3 0 0 0 3 8.2 15.8 15.8 0 0 0 2.5 12c0 1.4.1 2.7.5 3.8a3 3 0 0 0 2.1 2.1c1.8.5 4.2.6 6.9.6s5.1-.1 6.9-.6a3 3 0 0 0 2.1-2.1c.4-1.1.5-2.4.5-3.8s-.1-2.7-.5-3.8Z" />
      <path d="m10 9 5 3-5 3Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
