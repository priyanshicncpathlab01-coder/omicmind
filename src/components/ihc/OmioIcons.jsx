import React from 'react';

/* ------------------------------------------------------------------
   Disease icon set for the OmicMind Oncology Solutions cards.

   Same conventions as IhcIcon in IhcArt.jsx: a fixed 32x32 viewBox,
   1.7px gradient stroke, round caps and joins, and a gradient id
   namespaced per instance so the same icon can render more than once
   on a page without the defs colliding.
------------------------------------------------------------------ */

const BRAND = {
  violet: '#7C3AED',
  fuchsia: '#D946EF',
  pink: '#EC4899',
};

export function OmioIcon({ name, uid = '', className = '' }) {
  const id = `omi-o-${name}${uid}`;
  const common = {
    stroke: `url(#${id}-brand)`,
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: 'none',
  };

  const shapes = {
    /* Breast — profile with areola and converging ductal tree */
    breast: (
      <>
        <path
          d="M4 25.5 C 4 14, 10.5 6.5, 18 6.5 C 25 6.5, 28 12, 28 18 C 28 23, 24.5 25.5, 20 25.5 Z"
          {...common}
        />
        <circle cx="21.5" cy="17" r="3.2" {...common} strokeOpacity="0.7" />
        <path d="M18.3 17 C 14 16.4, 11 20, 8 21" {...common} strokeOpacity="0.5" />
        <path d="M19 14.5 C 15 11.6, 12 11.8, 9 13" {...common} strokeOpacity="0.5" />
      </>
    ),
    /* Lung — trachea, carina and two lobes */
    lung: (
      <>
        <path d="M13 5.5 L19 5.5 M16 5.5 L16 12" {...common} />
        <path
          d="M15 12 C 11 12.2, 7.2 16, 6.6 21 C 6.2 25, 8.2 27, 10.6 27 C 13.4 27, 15 24.6, 15 21 Z"
          {...common}
        />
        <path
          d="M17 12 C 21 12.2, 24.8 16, 25.4 21 C 25.8 25, 23.8 27, 21.4 27 C 18.6 27, 17 24.6, 17 21 Z"
          {...common}
        />
        <path d="M16 12 L15 13.5 M16 12 L17 13.5" {...common} strokeOpacity="0.55" />
      </>
    ),
    /* Colorectal — colon frame with crypt detail */
    colorectal: (
      <>
        <path
          d="M8 27 L8 12 C 8 8.4, 10.6 6, 14 6 C 17.4 6, 19.6 8.4, 19.6 11.6 L19.6 20 C 19.6 22.6, 21.4 24.2, 23.4 24.2 C 25.4 24.2, 26.6 22.6, 26.6 20.8 L26.6 10.5"
          {...common}
        />
        <path d="M11.4 10 L11.4 13 M11.4 17 L11.4 20 M23 12.5 L23 15.5" {...common} strokeOpacity="0.45" />
        <circle cx="15.6" cy="15.5" r="1.5" {...common} strokeOpacity="0.55" />
      </>
    ),
    /* Endometrium — uterine body with tubes and the endometrial cavity */
    endometrium: (
      <>
        <path d="M11 13 C 11 21, 13 25.4, 16 26.6 C 19 25.4, 21 21, 21 13 Z" {...common} />
        <path d="M11 13 C 9.2 10, 7 8.8, 5.6 10.4 C 4.4 11.8, 5.2 13.8, 6.8 14.4" {...common} />
        <path d="M21 13 C 22.8 10, 25 8.8, 26.4 10.4 C 27.6 11.8, 26.8 13.8, 25.2 14.4" {...common} />
        <path d="M13.4 14 L16 20.4 L18.6 14" {...common} strokeOpacity="0.55" />
      </>
    ),
    /* Prostate — lobed gland with the urethral channel */
    prostate: (
      <>
        <path
          d="M16 6.5 C 22 6.5, 26.5 11, 26.5 16.8 C 26.5 22.6, 21.8 26.5, 16 26.5 C 10.2 26.5, 5.5 22.6, 5.5 16.8 C 5.5 11, 10 6.5, 16 6.5 Z"
          {...common}
        />
        <path d="M16 7 C 13.4 12, 13.4 20.4, 16 26" {...common} strokeOpacity="0.5" />
        <circle cx="20.6" cy="14" r="1.7" {...common} strokeOpacity="0.55" />
        <circle cx="21" cy="20" r="1.4" {...common} strokeOpacity="0.45" />
      </>
    ),
    /* Ovarian — ovary with follicles */
    ovarian: (
      <>
        <ellipse cx="17" cy="17" rx="10" ry="7.8" transform="rotate(-20 17 17)" {...common} />
        <circle cx="13.6" cy="15.4" r="2.5" {...common} strokeOpacity="0.65" />
        <circle cx="20.2" cy="19" r="2" {...common} strokeOpacity="0.55" />
        <circle cx="19.6" cy="13.6" r="1.3" {...common} strokeOpacity="0.45" />
        <path d="M7.6 21.6 C 6 23.4, 5 25, 4.6 26.6" {...common} strokeOpacity="0.45" />
      </>
    ),
    /* Pancreas — head-to-tail body with the main duct */
    pancreas: (
      <>
        <path
          d="M5 14 C 8 9.8, 13.2 10, 17.2 12.8 C 20.4 15.2, 23.4 16.6, 26.2 16.2 C 28.2 15.9, 28.6 19, 26.6 20.6 C 23 23.4, 17.8 22.2, 13.8 19.6 C 11 17.8, 8 17.4, 5.6 18.4 C 4 19, 3.4 15.6, 5 14 Z"
          {...common}
        />
        <path d="M7.4 15.8 C 11 15.2, 15 17.2, 19 18.8 C 22 20, 24.6 19.9, 26 19.2" {...common} strokeOpacity="0.5" />
      </>
    ),
    /* Melanoma — asymmetric pigmented lesion with irregular border */
    melanoma: (
      <>
        <path
          d="M15.6 5.8 C 20.4 5, 25 8.4, 25.8 13.2 C 26.6 18.4, 22.8 23.4, 17.4 24 C 12 24.6, 7.4 21.2, 6.6 16.4 C 5.9 11.6, 10.4 6.6, 15.6 5.8 Z"
          {...common}
        />
        <path d="M15.2 6.6 C 13.4 12, 18 17.6, 16.6 23.8" {...common} strokeDasharray="3 3" strokeOpacity="0.5" />
        <circle cx="12.4" cy="14.6" r="1.6" {...common} strokeOpacity="0.55" />
        <circle cx="19.4" cy="17" r="1.3" {...common} strokeOpacity="0.45" />
        <path d="M6 27.4 L26 27.4" {...common} strokeOpacity="0.35" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-brand`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={BRAND.violet} />
          <stop offset="52%" stopColor={BRAND.fuchsia} />
          <stop offset="100%" stopColor={BRAND.pink} />
        </linearGradient>
      </defs>
      {shapes[name] || null}
    </svg>
  );
}

export default OmioIcon;
