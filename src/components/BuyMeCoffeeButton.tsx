import React from 'react';

export const BuyMeCoffeeButton: React.FC = () => {
  return (
    <a 
      href="https://www.buymeacoffee.com/guessacolor" 
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF5F5F] hover:bg-[#FF4F4F] 
                 text-white font-medium rounded-lg transition-all duration-200 
                 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
    >
      <img 
        src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" 
        alt="Buy me a coffee"
        className="h-4 w-4"
      />
      <span className="font-['Poppins']">Buy me a coffee</span>
    </a>
  );
};