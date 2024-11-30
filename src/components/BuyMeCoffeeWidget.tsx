import React, { useEffect } from 'react';

declare global {
  interface Window {
    BMC?: {
      init: (data: any) => void;
    };
  }
}

export const BuyMeCoffeeWidget: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js';
    script.setAttribute('data-name', 'BMC-Widget');
    script.setAttribute('data-cfasync', 'false');
    script.setAttribute('data-id', 'guessacolor');
    script.setAttribute('data-description', 'Support me on Buy me a coffee!');
    script.setAttribute('data-message', 'Thank you for visiting. If you liked the game, you can buy me a coffee ☺️');
    script.setAttribute('data-color', '#5F7FFF');
    script.setAttribute('data-position', 'Right');
    script.setAttribute('data-x_margin', '18');
    script.setAttribute('data-y_margin', '18');
    script.defer = true;

    script.onload = () => {
      if (window.BMC) {
        window.BMC.init({
          isFetchCheckerActive: true,
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      // Clean up any BMC elements
      const bmcBtn = document.querySelector('.bmc-btn');
      if (bmcBtn) {
        bmcBtn.remove();
      }
    };
  }, []);

  return null;
};