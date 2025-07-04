import React from 'react';

// Sunflower-like icon for Joy
const JoyFlowerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="50" cy="50" r="15" fill="#A52A2A"/>
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(angle => (
            <path key={angle} d="M50 15 L 60 40 L 40 40 Z" fill="#FFD700" transform={`rotate(${angle} 50 50)`}/>
        ))}
    </svg>
);

export default JoyFlowerIcon;
