
import React from 'react';

const BearIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 11.5c-2 0-3.5-2-3.5-4C8.5 4 10 2 12 2s3.5 2 3.5 4c0 2-1.5 4.5-3.5 4.5z"/>
    <path d="M14.5 11.5c1 1 1.5 3 0 5s-3 3-4.5 3-3.5-1-4.5-3 0-4 0-5"/>
    <path d="M12 20.5c-4 0-7-2-7-5.5 0-2.5 1-4.5 3-5.5"/>
    <path d="M12 20.5c4 0 7-2 7-5.5 0-2.5-1-4.5-3-5.5"/>
  </svg>
);

export default BearIcon;
