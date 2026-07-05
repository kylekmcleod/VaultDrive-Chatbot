function MuteIcon({ muted }) {
  if (muted) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M11 5L6 9H2v6h4l5 4V5z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 9l4 4M20 9l-4 4"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M11 5L6 9H2v6h4l5 4V5z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.54 8.46a5 5 0 010 7.07M19.07 4.93a9 9 0 010 14.14"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default MuteIcon
