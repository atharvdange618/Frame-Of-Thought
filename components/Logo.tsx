import React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export function Logo({ size = 28, className = "", ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={`select-none transition-transform duration-300 hover:scale-105 ${className}`}
      {...props}
    >
      <defs>
        {/* Glow and color gradient for the philosophical/amber highlights */}
        <linearGradient id="brand-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" /> {/* amber-500 */}
          <stop offset="50%" stopColor="#d97706" /> {/* amber-600 */}
          <stop offset="100%" stopColor="#b45309" /> {/* amber-700 */}
        </linearGradient>
      </defs>

      {/* Viewfinder Crop Marks (Representing 'Frame') */}
      {/* Top Left */}
      <path
        d="M 5,9 V 5 H 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-stone-400 dark:text-stone-700"
      />
      {/* Top Right */}
      <path
        d="M 27,9 V 5 H 23"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-stone-400 dark:text-stone-700"
      />
      {/* Bottom Left */}
      <path
        d="M 5,23 V 27 H 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-stone-400 dark:text-stone-700"
      />
      {/* Bottom Right */}
      <path
        d="M 27,23 V 27 H 23"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-stone-400 dark:text-stone-700"
      />

      {/* Outer Circle of the Lens / Film Reel (Subtle Background) */}
      <circle
        cx="16"
        cy="16"
        r="9"
        stroke="currentColor"
        strokeWidth="1"
        className="text-stone-200/80 dark:text-stone-850/80"
        strokeDasharray="2 2"
      />

      {/* Left Hemisphere (Winding Brain/Thought Paths) */}
      <path
        d="M 16,7 
           C 12,7 8.5,10 8.5,14.5 
           C 8.5,16.5 9.5,18 11,19 
           C 9.5,20.5 9.5,22 11,23.5 
           C 12.5,25 16,25 16,25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-stone-700 dark:text-stone-300"
      />
      {/* Left Hemisphere Inner Brain Fold */}
      <path
        d="M 16,11 
           C 13.5,11 11.5,12.5 11.5,14.5 
           C 11.5,15.5 12.5,16.5 13.5,16.5 
           C 12.5,17.5 12.5,19 13.5,20 
           C 14.5,21 16,21 16,21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-stone-400/80 dark:text-stone-600"
      />

      {/* Right Hemisphere (Film Strip representing Cinema) */}
      {/* Smooth curve matching the left hemisphere's outer bounds, but ending with a film reel tail */}
      <path
        d="M 16,7 
           C 20,7 23.5,10 23.5,14.5 
           C 23.5,16.5 22.5,18 21,19 
           C 22.5,20.5 22.5,22 21,23.5 
           C 19.5,25 16,25 16,25"
        stroke="url(#brand-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right Hemisphere Inner Film Strip Loop */}
      <path
        d="M 16,11 
           C 18.5,11 20.5,12.5 20.5,14.5 
           C 20.5,15.5 19.5,16.5 18.5,16.5 
           C 19.5,17.5 19.5,19 18.5,20 
           C 17.5,21 16,21 16,21"
        stroke="url(#brand-gradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />

      {/* Film Sprocket Holes along the Right Film Strip Curve */}
      {/* Dot 1 */}
      <circle cx="21" cy="9.5" r="0.75" fill="currentColor" className="text-stone-100 dark:text-stone-900" />
      {/* Dot 2 */}
      <circle cx="23.2" cy="14" r="0.75" fill="currentColor" className="text-stone-100 dark:text-stone-900" />
      {/* Dot 3 */}
      <circle cx="21.5" cy="18.5" r="0.75" fill="currentColor" className="text-stone-100 dark:text-stone-900" />
      {/* Dot 4 */}
      <circle cx="18" cy="22.5" r="0.75" fill="currentColor" className="text-stone-100 dark:text-stone-900" />

      {/* Spark of Thought / Ideation node in the center */}
      <circle cx="16" cy="16" r="1.5" fill="url(#brand-gradient)" />
      
      {/* Small philosophical rays linking thoughts */}
      <line
        x1="16"
        y1="16"
        x2="16"
        y2="2"
        stroke="url(#brand-gradient)"
        strokeWidth="1"
        strokeDasharray="1 2"
      />
      <circle cx="16" cy="2" r="1" fill="url(#brand-gradient)" />
    </svg>
  );
}
