import React, { useState, useCallback } from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  const [hue, setHue] = useState(0);

  const handleClick = useCallback(() => {
    setHue(Math.floor(Math.random() * 360));
  }, []);

  return (
    <img 
      src="https://foauuciychrtgigargva.supabase.co/storage/v1/object/sign/Images/Color%20Snatch.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvQ29sb3IgU25hdGNoLnN2ZyIsImlhdCI6MTczMjk4MDQ4OCwiZXhwIjoxNzY0NTE2NDg4fQ.M9wHdOZJYIAQ8ycKAas4-9rD92hjCPVMqw1DvxVpe_8&t=2024-11-30T15%3A28%3A08.959Z"
      alt="Color Snatch"
      className={`${className} w-auto cursor-pointer transition-all duration-500 hover:scale-105`}
      onClick={handleClick}
      style={{
        filter: `hue-rotate(${hue}deg)`,
      }}
    />
  );
};