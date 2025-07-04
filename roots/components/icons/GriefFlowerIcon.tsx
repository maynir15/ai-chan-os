import React from 'react';

// Weeping willow / drooping flower for Grief
const GriefFlowerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M50 20 C 40 40, 40 60, 50 90" stroke="#4B5320" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M50 40 C 30 50, 30 70, 45 85" stroke="#87CEEB" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M50 40 C 70 50, 70 70, 55 85" stroke="#87CEEB" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M50 50 C 40 60, 40 75, 48 88" stroke="#87CEEB" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M50 50 C 60 60, 60 75, 52 88" stroke="#87CEEB" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
);

export default GriefFlowerIcon;
