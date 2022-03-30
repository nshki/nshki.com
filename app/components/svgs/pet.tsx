export const Pet = ({ width = 146, height = 67 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 292 134"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <rect
      x="52"
      y="58"
      width="240"
      height="75"
      rx="37.5"
      fill="url(#pet-gradient-bed)"
    />
    <path
      d="M95 48C95 21.4903 116.49 0 143 0H210C236.51 0 258 21.4903 258 48V48C258 74.5097 236.51 96 210 96H143C116.49 96 95 74.5097 95 48V48Z"
      fill="url(#pet-gradient-body)"
    />
    <rect x="151" y="65" width="21" height="8" rx="4" fill="black" />
    <rect x="116" y="65" width="21" height="8" rx="4" fill="black" />
    <circle cx="21" cy="113" r="21" fill="#f07178" />

    <defs>
      <linearGradient
        id="pet-gradient-bed"
        x1="172"
        y1="58"
        x2="172"
        y2="133"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#61aeef"/>
        <stop offset="1" stopColor="#005aa6"/>
      </linearGradient>

      <linearGradient
        id="pet-gradient-body"
        x1="176.5"
        y1="0"
        x2="176.5"
        y2="96"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#ffda9b"/>
        <stop offset="1" stopColor="#dca343"/>
      </linearGradient>
    </defs>
  </svg>
)
