import React from 'react';

const SproutIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M50 85 C 40 75, 40 65, 50 55" stroke="#8A9A5B" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <path d="M50 55 C 60 65, 60 75, 50 85" stroke="#8A9A5B" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <path d="M50 85 V 55" stroke="#8A9A5B" strokeWidth="5" fill="none" strokeLinecap="round"/>
    </svg>
);

export default SproutIcon;
