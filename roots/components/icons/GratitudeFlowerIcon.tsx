import React from 'react';

// Lotus-like flower for Gratitude
const GratitudeFlowerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M50 90 C 30 70, 30 50, 50 30 C 70 50, 70 70, 50 90 Z" fill="#E6A8A8" />
        <path d="M50 90 C 40 70, 45 50, 65 40" stroke="#C8A2C8" strokeWidth="4" fill="none" transform="rotate(20 50 50)" />
        <path d="M50 90 C 60 70, 55 50, 35 40" stroke="#C8A2C8" strokeWidth="4" fill="none" transform="rotate(-20 50 50)" />
        <path d="M50 80 C 45 65, 45 55, 50 45 C 55 55, 55 65, 50 80 Z" fill="#FDFD96" />
    </svg>
);

export default GratitudeFlowerIcon;
