import React from 'react';

const SaplingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M50 90 V 40" stroke="#4B5320" strokeWidth="6" fill="none" strokeLinecap="round"/>
        <path d="M50 60 C 35 55, 35 45, 50 40" stroke="#8A9A5B" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M50 60 C 65 55, 65 45, 50 40" stroke="#8A9A5B" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M50 75 C 40 70, 40 60, 50 55" stroke="#8A9A5B" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M50 75 C 60 70, 60 60, 50 55" stroke="#8A9A5B" strokeWidth="5" fill="none" strokeLinecap="round"/>
    </svg>
);

export default SaplingIcon;
