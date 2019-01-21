import React from 'react';

export const VectorLamp = () => (
  <svg width="116" height="137" viewBox="0 0 116 137" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.867923" filter="url(#filter0_i)">
      <path fillRule="evenodd" clipRule="evenodd" d="M47.4837 68.1432H68.2485L74.6849 137H41.0473L47.4837 68.1432Z" fill="#E8E8E8"/>
    </g>
    <g filter="url(#filter1_di)">
      <path fillRule="evenodd" clipRule="evenodd" d="M29.499 28H86.4371L87.9361 76.2276H28L29.499 28Z" fill="#FFDCA3"/>
    </g>
    <defs>
      <filter id="filter0_i" x="41.0473" y="68.1432" width="33.6376" height="68.8568" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="-7.24808"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
      </filter>
      <filter id="filter1_di" x="0.122761" y="0.680306" width="115.691" height="103.982" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
        <feOffset dy="0.557545"/>
        <feGaussianBlur stdDeviation="13.9386"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.942411 0 0 0 0 0.848623 0 0 0 0.5 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="-3.90281"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
        <feBlend mode="normal" in2="shape" result="effect2_innerShadow"/>
      </filter>
    </defs>
  </svg>
);
