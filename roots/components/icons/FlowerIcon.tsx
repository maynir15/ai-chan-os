import React from 'react';

const FlowerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="50" cy="50" r="10" fill="#FDFD96"/>
        <path d="M50,40 A20,20 0,0,1 50,20 A20,20 0,0,1 50,40" fill="#E6A8A8"/>
        <path d="M60,50 A20,20 0,0,1 80,50 A20,20 0,0,1 60,50" transform="rotate(60 50 50)" fill="#E6A8A8"/>
        <path d="M60,50 A20,20 0,0,1 80,50 A20,20 0,0,1 60,50" transform="rotate(120 50 50)" fill="#E6A8A8"/>
        <path d="M50,60 A20,20 0,0,1 50,80 A20,20 0,0,1 50,60" fill="#E6A8A8"/>
        <path d="M40,50 A20,20 0,0,1 20,50 A20,20 0,0,1 40,50" transform="rotate(-60 50 50)" fill="#E6A8A8"/>
        <path d="M40,50 A20,20 0,0,1 20,50 A20,20 0,0,1 40,50" transform="rotate(-120 50 50)" fill="#E6A8A8"/>
    </svg>
);

export default FlowerIcon;
