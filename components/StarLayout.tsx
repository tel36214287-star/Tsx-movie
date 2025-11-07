import React from 'react';
import { DISTRICT_LOGOS } from '../constants';

const StarLayout: React.FC = () => {
  return (
    <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] relative">
      {DISTRICT_LOGOS.map((logoUrl, index) => {
        const angle = (index / DISTRICT_LOGOS.length) * 360 - 90; // -90 to start at the top
        const angleRad = (angle * Math.PI) / 180;
        const radius = 45; // Percentage of the container's radius

        const style: React.CSSProperties = {
          position: 'absolute',
          top: `calc(50% + ${radius * Math.sin(angleRad)}%)`,
          left: `calc(50% + ${radius * Math.cos(angleRad)}%)`,
          transform: 'translate(-50%, -50%)',
        };

        return (
          <div key={index} style={style} className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
            <img
              src={logoUrl}
              alt={`District ${index + 1} Logo`}
              className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 ease-in-out hover:scale-125"
            />
          </div>
        );
      })}
    </div>
  );
};

export default StarLayout;
