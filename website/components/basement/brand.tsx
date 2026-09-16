/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a verified Vinext production RSC router failure. */
export function Threshold({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <path d="M4 44V4H44V14H14V44H4Z" fill="currentColor" />
      <path d="M20 44V20H44V30H30V44H20Z" fill="currentColor" />
      <path d="M36 36H44V44H36V36Z" fill="#4D7CFF" />
    </svg>
  );
}
export function Wordmark() {
  return (
    <a
      className="wordmark threshold-wordmark"
      href="/"
      aria-label="Basement Protocol home"
    >
      <Threshold />
      <span className="wordmark-label">
        BASEMENT
        <br />
        PROTOCOL
      </span>
    </a>
  );
}
