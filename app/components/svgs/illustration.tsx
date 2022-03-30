export const IllustrationSvg = ({ width = 807, height = 555 }) => (
  <svg
    className="illustration"
    width={width}
    height={height}
    viewBox="0 0 807 555"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse
      className="illustration__shadow"
      cx="403.5"
      cy="483"
      rx="403.5"
      ry="72"
      fill="black"
      fillOpacity="0.15"
    />
    <rect
      className="illustration__chair"
      x="362"
      y="139"
      width="282"
      height="331"
      rx="39"
      fill="#171717"
    />
    <rect
      className="illustration__person-body"
      x="321"
      width="255"
      height="411"
      rx="127.5"
      fill="url(#gradient-person)"
    />
    <rect
      className="illustration__person-right-eye"
      x="439"
      y="121"
      width="20"
      height="37"
      transform-origin="449 150"
      rx="10"
      fill="black"
    />
    <rect
      className="illustration__person-left-eye"
      x="368"
      y="121"
      width="20"
      height="37"
      transform-origin="378 150"
      rx="10"
      fill="black"
    />
    <path
      className="illustration__furniture"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M80 326C80 304.461 97.4609 287 119 287H590C611.539 287 629 304.461 629 326V424H713.5C736.42 424 755 442.58 755 465.5C755 488.42 736.42 507 713.5 507H574.5C558.228 507 544.143 497.635 537.341 484H119H80V445.764H80.0073C80.0025 445.51 80 445.255 80 445V326Z"
      fill="url(#gradient-desk)"
    />
    <path
      className="illustration__laptop-body"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M197 154C189.82 154 184 159.82 184 167V280.4V281C184 288.18 189.82 294 197 294H349H378C385.18 294 391 288.18 391 281V280.4C391 280.266 390.998 280.133 390.994 280H362V167C362 159.82 356.18 154 349 154H197Z"
      fill="#171717"
    />
    <circle
      className="illustration__laptop-logo"
      cx="271"
      cy="226"
      r="13"
      fill="white"
      fillOpacity="0.15"
    />
    <rect
      className="illustration__pot"
      x="118"
      y="245"
      width="52"
      height="49"
      rx="13"
      fill="#f07178"
    />
    <path
      className="illustration__plant"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M123 195C123 187.82 128.82 182 136 182H145C152.18 182 158 187.82 158 195V196.755C159.37 195.657 161.108 195 163 195C167.418 195 171 198.582 171 203V221C171 225.418 167.418 229 163 229C161.108 229 159.37 228.343 158 227.245V243C158 250.18 152.18 256 145 256H136C128.82 256 123 250.18 123 243V241H122.5C118.358 241 115 237.642 115 233.5C115 229.358 118.358 226 122.5 226H123V195Z"
      fill="#98c379"
    />
    <path
      className="illustration__pet-body"
      d="M560 418C560 391.49 581.49 370 608 370H675C701.51 370 723 391.49 723 418C723 444.51 701.51 466 675 466H608C581.49 466 560 444.51 560 418Z"
      fill="url(#gradient-pet)"
      transform-origin="640 408"
    />
    <rect
      className="illustration__pet-right-eye"
      x="616"
      y="435"
      width="21"
      height="8"
      rx="4"
      fill="black"
    />
    <rect
      className="illustration__pet-left-eye"
      x="581"
      y="435"
      width="21"
      height="8"
      rx="4"
      fill="black"
    />
    <circle
      className="illustration__pet-toy"
      cx="503"
      cy="487"
      r="21"
      fill="#f07178"
    />

    <defs>
      <linearGradient
        id="gradient-person"
        x1="448.5"
        y1="0"
        x2="448.5"
        y2="411"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#ffda9b" />
        <stop offset="1" stopColor="#cf8a16" />
      </linearGradient>

      <linearGradient
        id="gradient-desk"
        x1="417.5"
        y1="287"
        x2="417.5"
        y2="507"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#61aeef" />
        <stop offset="1" stopColor="#005aa6" />
      </linearGradient>

      <linearGradient
        id="gradient-pet"
        x1="647.5"
        y1="370"
        x2="647.5"
        y2="466"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#ffda9b" />
        <stop offset="1" stopColor="#dca343" />
      </linearGradient>
    </defs>
  </svg>
)
