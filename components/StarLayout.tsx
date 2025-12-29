import React from 'react';
import { DISTRICT_NAMES } from '../constants'; // Changed import from DISTRICT_LOGOS to DISTRICT_NAMES

const StarLayout: React.FC = () => {
  const numPoints = DISTRICT_NAMES.length; // Should be 12
  const outerRadiusPercent = 45; // Percentage of container's radius for outer points
  const innerRadiusPercent = 25; // Percentage of container's radius for inner points

  return (
    <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] relative">
      {DISTRICT_NAMES.map((districtName, index) => { // Map districtName instead of logoUrl
        // Calculate the base angle for each point, starting at the top (-90 degrees offset)
        const angle = (index / numPoints) * 360 - 90;
        const angleRad = (angle * Math.PI) / 180;

        // Alternate radius for star shape: outer for even indices, inner for odd
        const currentRadius = (index % 2 === 0) ? outerRadiusPercent : innerRadiusPercent;

        const style: React.CSSProperties = {
          position: 'absolute',
          // Position calculation based on currentRadius and angle
          top: `calc(50% + ${currentRadius * Math.sin(angleRad)}%)`,
          left: `calc(50% + ${currentRadius * Math.cos(angleRad)}%)`,
          transform: 'translate(-50%, -50%)', // Center the text container
          textAlign: 'center', // Center the text within its container
        };

        return (
          <div key={index} style={style} className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center p-1">
            <div
              className="text-lg sm:text-xl md:text-2xl font-bold text-fire-glow transition-all duration-300 ease-in-out hover:scale-110 leading-tight"
            >
              {districtName}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StarLayout;