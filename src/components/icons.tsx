
import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z" />
      <path d="M21.056 14.158A9.001 9.001 0 0 1 12 21a9 9 0 0 1-9.056-6.842" />
      <path d="M2.944 9.842A9.001 9.001 0 0 1 12 3a9 9 0 0 1 9.056 6.842" />
    </svg>
  );
}
