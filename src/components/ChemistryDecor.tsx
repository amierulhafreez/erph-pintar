import React from 'react';

/**
 * Subtle vector illustrations for scientific identity without visual clutter.
 */

export const BiologyDnaWatermark: React.FC<{ className?: string }> = ({
  className = 'w-48 h-48 text-white/10',
}) => (
  <svg
    viewBox="0 0 200 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
    aria-hidden="true"
  >
    {/* DNA Double Helix Structure */}
    <path
      d="M50 30 C 90 70, 110 90, 150 130 C 110 170, 90 190, 50 230"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M150 30 C 110 70, 90 90, 50 130 C 90 170, 110 190, 150 230"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
    {/* Base Pairs / Rungs */}
    <line x1="62" y1="45" x2="138" y2="45" stroke="currentColor" strokeWidth="3" strokeDasharray="2 3" />
    <circle cx="62" cy="45" r="4" fill="currentColor" />
    <circle cx="138" cy="45" r="4" fill="currentColor" />

    <line x1="75" y1="75" x2="125" y2="75" stroke="currentColor" strokeWidth="3" />
    <circle cx="75" cy="75" r="4" fill="currentColor" />
    <circle cx="125" cy="75" r="4" fill="currentColor" />

    <circle cx="100" cy="130" r="6" fill="currentColor" />

    <line x1="75" y1="185" x2="125" y2="185" stroke="currentColor" strokeWidth="3" />
    <circle cx="75" cy="185" r="4" fill="currentColor" />
    <circle cx="125" cy="185" r="4" fill="currentColor" />

    <line x1="62" y1="215" x2="138" y2="215" stroke="currentColor" strokeWidth="3" strokeDasharray="2 3" />
    <circle cx="62" cy="215" r="4" fill="currentColor" />
    <circle cx="138" cy="215" r="4" fill="currentColor" />
  </svg>
);

export const PhysicsAtomWatermark: React.FC<{ className?: string }> = ({
  className = 'w-48 h-48 text-white/10',
}) => (
  <svg
    viewBox="0 0 240 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
    aria-hidden="true"
  >
    {/* Central Atomic Nucleus */}
    <circle cx="120" cy="120" r="14" fill="currentColor" opacity="0.8" />
    <circle cx="114" cy="115" r="5" fill="#ffffff" opacity="0.6" />
    {/* Orbit 1: Horizontal Ellipse */}
    <ellipse cx="120" cy="120" rx="90" ry="32" stroke="currentColor" strokeWidth="3.5" />
    <circle cx="210" cy="120" r="5" fill="currentColor" />
    {/* Orbit 2: Rotated 60deg */}
    <g transform="rotate(60 120 120)">
      <ellipse cx="120" cy="120" rx="90" ry="32" stroke="currentColor" strokeWidth="3.5" />
      <circle cx="210" cy="120" r="5" fill="currentColor" />
    </g>
    {/* Orbit 3: Rotated 120deg */}
    <g transform="rotate(120 120 120)">
      <ellipse cx="120" cy="120" rx="90" ry="32" stroke="currentColor" strokeWidth="3.5" />
      <circle cx="210" cy="120" r="5" fill="currentColor" />
    </g>
  </svg>
);

export const MoleculeWatermark: React.FC<{ className?: string }> = ({
  className = 'w-48 h-48 text-white/10',
}) => (
  <svg
    viewBox="0 0 240 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
    aria-hidden="true"
  >
    {/* Benzene Ring 1 */}
    <polygon
      points="70,35 105,55 105,95 70,115 35,95 35,55"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    <circle
      cx="70"
      cy="75"
      r="22"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeDasharray="6 4"
    />
    {/* Bond to Benzene Ring 2 / Side Chain */}
    <line x1="105" y1="55" x2="145" y2="35" stroke="currentColor" strokeWidth="3.5" />
    <line x1="145" y1="35" x2="185" y2="55" stroke="currentColor" strokeWidth="3.5" />
    <line x1="185" y1="55" x2="185" y2="95" stroke="currentColor" strokeWidth="3.5" />
    <line x1="105" y1="95" x2="145" y2="115" stroke="currentColor" strokeWidth="3.5" />
    <line x1="145" y1="115" x2="185" y2="95" stroke="currentColor" strokeWidth="3.5" />
    {/* Double bonds */}
    <line x1="146" y1="43" x2="178" y2="59" stroke="currentColor" strokeWidth="2.5" />
    <line x1="146" y1="107" x2="112" y2="90" stroke="currentColor" strokeWidth="2.5" />
    {/* Substituent atoms */}
    <line x1="185" y1="55" x2="218" y2="36" stroke="currentColor" strokeWidth="3.5" />
    <circle cx="222" cy="33" r="8" fill="currentColor" />
    <line x1="70" y1="115" x2="70" y2="152" stroke="currentColor" strokeWidth="3.5" />
    <circle cx="70" cy="158" r="9" fill="currentColor" />
    <line x1="35" y1="55" x2="12" y2="40" stroke="currentColor" strokeWidth="3.5" />
    <circle cx="10" cy="38" r="6" fill="currentColor" />
    {/* Nodes */}
    <circle cx="70" cy="35" r="5" fill="currentColor" />
    <circle cx="105" cy="55" r="5" fill="currentColor" />
    <circle cx="105" cy="95" r="5" fill="currentColor" />
    <circle cx="145" cy="115" r="5" fill="currentColor" />
    <circle cx="185" cy="95" r="5" fill="currentColor" />
  </svg>
);

export const LabApparatusWatermark: React.FC<{ className?: string }> = ({
  className = 'w-44 h-44 text-white/10',
}) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
    aria-hidden="true"
  >
    {/* Erlenmeyer Conical Flask */}
    <path
      d="M65 30 H95 M72 30 V68 L38 142 C34 150 40 160 50 160 H110 C120 160 126 150 122 142 L88 68 V30"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Liquid wave inside conical flask */}
    <path
      d="M50 120 Q65 114 80 120 T110 120 L120 144 C122 150 118 155 110 155 H50 C42 155 38 150 40 144 Z"
      fill="currentColor"
      fillOpacity="0.35"
    />
    {/* Bubbles */}
    <circle cx="72" cy="105" r="4" fill="currentColor" />
    <circle cx="85" cy="92" r="3" fill="currentColor" />
    <circle cx="78" cy="78" r="2.5" fill="currentColor" />

    {/* Test Tube & Stand Accent on Right */}
    <rect
      x="142"
      y="42"
      width="22"
      height="95"
      rx="11"
      stroke="currentColor"
      strokeWidth="3.5"
    />
    <line x1="137" y1="42" x2="169" y2="42" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <path
      d="M145 95 H161 V125 C161 130 157 134 153 134 C149 134 145 130 145 125 Z"
      fill="currentColor"
      fillOpacity="0.35"
    />
    {/* Graduation marks */}
    <line x1="147" y1="62" x2="154" y2="62" stroke="currentColor" strokeWidth="2" />
    <line x1="147" y1="75" x2="157" y2="75" stroke="currentColor" strokeWidth="2" />
    <line x1="147" y1="88" x2="154" y2="88" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const ChemistryBadgeIcons: React.FC = () => (
  <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-emerald-50/80 border border-emerald-200/70 text-emerald-800 text-[11px] font-medium">
    {/* Mini Atom SVG */}
    <svg className="w-4 h-4 text-emerald-600 flex-shrink-0" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4.2"
        transform="rotate(30 12 12)"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4.2"
        transform="rotate(-30 12 12)"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <ellipse cx="12" cy="12" rx="4.2" ry="10" stroke="currentColor" strokeWidth="1.6" />
    </svg>
    <span>Molekul • Stoikiometri • Amali KSSM</span>
  </div>
);

export const BackgroundHexPattern: React.FC<{ theme?: string }> = ({
  theme = 'emerald',
}) => {
  const isPortal = theme === 'portal';
  const isPink = theme === 'pink';
  const isAmber = theme === 'amber';
  const isTurquoise = theme === 'teal';
  const isCyan = theme === 'cyan';
  const isIndigo = theme === 'indigo';
  const isCharcoal = theme === 'charcoal';

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden print:hidden"
      aria-hidden="true"
    >
      {/* Apple Liquid Glass Ambient Luminous Light Orbs */}
      {isPortal ? (
        <>
          {/* Chromatic Apple Spectrum Liquid Orbs for Landing Portal */}
          <div className="absolute -top-32 -left-20 w-[620px] h-[620px] bg-gradient-to-br from-emerald-400/22 via-teal-300/18 to-transparent rounded-full blur-[110px] animate-pulse [animation-duration:14s]" />
          <div className="absolute -top-28 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-pink-400/22 via-rose-300/18 to-transparent rounded-full blur-[115px] animate-pulse [animation-duration:16s]" />
          <div className="absolute top-[32%] -left-28 w-[580px] h-[580px] bg-gradient-to-tr from-amber-400/20 via-orange-300/15 to-transparent rounded-full blur-[120px] animate-pulse [animation-duration:18s]" />
          <div className="absolute top-[38%] right-[5%] w-[640px] h-[640px] bg-gradient-to-bl from-teal-400/22 via-cyan-300/18 to-transparent rounded-full blur-[110px] animate-pulse [animation-duration:15s]" />
          <div className="absolute -bottom-36 left-1/4 w-[720px] h-[720px] bg-gradient-to-tr from-indigo-400/18 via-purple-300/14 to-transparent rounded-full blur-[130px]" />
        </>
      ) : isPink ? (
        <>
          <div className="absolute -top-24 -left-24 w-[520px] h-[520px] bg-gradient-to-br from-pink-200/20 via-rose-100/15 to-transparent rounded-full blur-3xl animate-pulse [animation-duration:14s]" />
          <div className="absolute top-12 -right-20 w-[480px] h-[480px] bg-gradient-to-bl from-rose-200/18 via-pink-100/12 to-transparent rounded-full blur-3xl animate-pulse [animation-duration:16s]" />
          <div className="absolute top-[42%] left-[25%] w-[650px] h-[650px] bg-gradient-to-r from-pink-100/15 via-rose-50/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-24 right-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-rose-100/15 via-pink-50/10 to-transparent rounded-full blur-3xl" />
        </>
      ) : isAmber ? (
        <>
          <div className="absolute -top-24 -left-24 w-[520px] h-[520px] bg-gradient-to-br from-amber-300/18 via-orange-200/12 to-transparent rounded-full blur-3xl animate-pulse [animation-duration:14s]" />
          <div className="absolute top-12 -right-20 w-[480px] h-[480px] bg-gradient-to-bl from-orange-200/15 via-amber-100/10 to-transparent rounded-full blur-3xl animate-pulse [animation-duration:16s]" />
          <div className="absolute top-[42%] left-[25%] w-[650px] h-[650px] bg-gradient-to-r from-amber-200/12 via-orange-100/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-24 right-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-orange-100/15 via-amber-50/10 to-transparent rounded-full blur-3xl" />
        </>
      ) : isTurquoise ? (
        <>
          <div className="absolute -top-24 -left-24 w-[520px] h-[520px] bg-gradient-to-br from-sky-400/20 via-cyan-300/15 to-transparent rounded-full blur-3xl animate-pulse [animation-duration:14s]" />
          <div className="absolute top-12 -right-20 w-[480px] h-[480px] bg-gradient-to-bl from-cyan-300/18 via-sky-200/12 to-transparent rounded-full blur-3xl animate-pulse [animation-duration:16s]" />
          <div className="absolute top-[42%] left-[25%] w-[650px] h-[650px] bg-gradient-to-r from-sky-200/15 via-cyan-100/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-24 right-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-200/15 via-sky-100/10 to-transparent rounded-full blur-3xl" />
        </>
      ) : isCyan ? (
        <>
          <div className="absolute -top-24 -left-24 w-[520px] h-[520px] bg-gradient-to-br from-cyan-400/20 via-blue-300/15 to-transparent rounded-full blur-3xl animate-pulse [animation-duration:12s]" />
          <div className="absolute top-12 -right-20 w-[480px] h-[480px] bg-gradient-to-bl from-sky-400/18 via-cyan-200/12 to-transparent rounded-full blur-3xl" />
        </>
      ) : isIndigo ? (
        <>
          <div className="absolute -top-24 -left-24 w-[520px] h-[520px] bg-gradient-to-br from-indigo-500/20 via-purple-400/15 to-transparent rounded-full blur-3xl animate-pulse [animation-duration:14s]" />
          <div className="absolute top-12 -right-20 w-[480px] h-[480px] bg-gradient-to-bl from-purple-400/18 via-indigo-300/12 to-transparent rounded-full blur-3xl animate-pulse [animation-duration:16s]" />
          <div className="absolute top-[42%] left-[25%] w-[650px] h-[650px] bg-gradient-to-r from-indigo-300/15 via-purple-200/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-24 right-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-purple-300/15 via-indigo-200/10 to-transparent rounded-full blur-3xl" />
        </>
      ) : isCharcoal ? (
        <>
          <div className="absolute -top-24 -left-24 w-[520px] h-[520px] bg-gradient-to-br from-slate-400/18 via-zinc-300/12 to-transparent rounded-full blur-3xl animate-pulse [animation-duration:14s]" />
          <div className="absolute top-12 -right-20 w-[480px] h-[480px] bg-gradient-to-bl from-zinc-400/16 via-slate-300/12 to-transparent rounded-full blur-3xl animate-pulse [animation-duration:16s]" />
          <div className="absolute top-[42%] left-[25%] w-[650px] h-[650px] bg-gradient-to-r from-slate-300/12 via-zinc-200/8 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-24 right-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-slate-400/14 via-zinc-300/10 to-transparent rounded-full blur-3xl" />
        </>
      ) : (
        <>
          <div className="absolute -top-24 -left-24 w-[520px] h-[520px] bg-gradient-to-br from-emerald-400/18 via-teal-300/12 to-transparent rounded-full blur-3xl animate-pulse [animation-duration:12s]" />
          <div className="absolute top-12 -right-20 w-[480px] h-[480px] bg-gradient-to-bl from-sky-400/16 via-cyan-300/12 to-transparent rounded-full blur-3xl animate-pulse [animation-duration:15s]" />
          <div className="absolute top-[42%] left-[25%] w-[650px] h-[650px] bg-gradient-to-r from-indigo-300/10 via-purple-300/8 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-24 right-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-teal-300/14 via-emerald-200/10 to-transparent rounded-full blur-3xl" />
        </>
      )}

      {/* Subtle scientific vector watermark */}
      <div className="opacity-[0.04]">
        {isPortal ? (
          <svg className="absolute -top-12 -left-12 w-96 h-96 text-slate-800" viewBox="0 0 240 240" fill="none">
            <circle cx="120" cy="120" r="80" stroke="currentColor" strokeWidth="2" strokeDasharray="4 6" />
            <circle cx="120" cy="120" r="40" stroke="currentColor" strokeWidth="2" />
            <path d="M120 40 L120 200 M40 120 L200 120" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>
        ) : isPink ? (
          <svg className="absolute -top-12 -left-12 w-96 h-96 text-pink-700" viewBox="0 0 200 240" fill="none">
            <path d="M50 30 C 90 70, 110 90, 150 130 C 110 170, 90 190, 50 230" stroke="currentColor" strokeWidth="4" />
            <path d="M150 30 C 110 70, 90 90, 50 130 C 90 170, 110 190, 150 230" stroke="currentColor" strokeWidth="4" />
            <circle cx="100" cy="130" r="10" fill="currentColor" />
          </svg>
        ) : isAmber ? (
          <svg className="absolute -top-12 -left-12 w-96 h-96 text-amber-900" viewBox="0 0 240 240" fill="none">
            <circle cx="120" cy="120" r="14" fill="currentColor" opacity="0.8" />
            <ellipse cx="120" cy="120" rx="90" ry="32" stroke="currentColor" strokeWidth="3.5" />
            <g transform="rotate(60 120 120)">
              <ellipse cx="120" cy="120" rx="90" ry="32" stroke="currentColor" strokeWidth="3.5" />
            </g>
            <g transform="rotate(120 120 120)">
              <ellipse cx="120" cy="120" rx="90" ry="32" stroke="currentColor" strokeWidth="3.5" />
            </g>
          </svg>
        ) : isTurquoise ? (
          <svg className="absolute -top-12 -left-12 w-96 h-96 text-sky-800" viewBox="0 0 240 240" fill="none">
            <path d="M120 20 L135 85 L200 100 L135 115 L120 180 L105 115 L40 100 L105 85 Z" stroke="currentColor" strokeWidth="3" />
            <circle cx="180" cy="50" r="15" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="60" cy="170" r="20" stroke="currentColor" strokeWidth="2.5" />
          </svg>
        ) : isIndigo ? (
          <svg className="absolute -top-12 -left-12 w-96 h-96 text-indigo-900" viewBox="0 0 240 240" fill="none">
            <circle cx="120" cy="120" r="70" stroke="currentColor" strokeWidth="2.5" />
            <polygon points="120,50 180,155 60,155" stroke="currentColor" strokeWidth="2.5" />
            <path d="M50 120 L190 120 M120 50 L120 190" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="120" cy="120" r="4" fill="currentColor" />
          </svg>
        ) : isCharcoal ? (
          <svg className="absolute -top-12 -left-12 w-96 h-96 text-slate-800" viewBox="0 0 240 240" fill="none">
            <line x1="30" y1="180" x2="210" y2="180" stroke="currentColor" strokeWidth="2" />
            <line x1="60" y1="30" x2="60" y2="210" stroke="currentColor" strokeWidth="2" />
            <path d="M50 170 Q 120 40 190 170" stroke="currentColor" strokeWidth="3" />
            <line x1="80" y1="60" x2="160" y2="140" stroke="currentColor" strokeWidth="1.8" strokeDasharray="4 4" />
            <path d="M190 50 C 185 40 175 42 175 52 L 175 110 C 175 120 165 122 160 112" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        ) : (
          <svg className={`absolute -top-12 -left-12 w-96 h-96 ${isCyan ? 'text-cyan-900' : 'text-emerald-900'}`} viewBox="0 0 240 200" fill="none">
            <polygon
              points="70,35 105,55 105,95 70,115 35,95 35,55"
              stroke="currentColor"
              strokeWidth="3"
            />
            <circle cx="70" cy="75" r="20" stroke="currentColor" strokeWidth="2" />
            <polygon
              points="140,35 175,55 175,95 140,115 105,95 105,55"
              stroke="currentColor"
              strokeWidth="3"
            />
            <polygon
              points="105,95 140,115 140,155 105,175 70,155 70,115"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>
        )}
      </div>
    </div>
  );
};
