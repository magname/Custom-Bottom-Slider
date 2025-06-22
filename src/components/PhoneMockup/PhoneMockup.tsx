
import React from 'react';
import { cn } from '@/lib/utils';

interface PhoneMockupProps {
  children: React.ReactNode;
  className?: string;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({ children, className }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className={cn("relative", className)}>
        {/* iPhone 15 Frame */}
        <div className="relative w-[375px] h-[812px] bg-black rounded-[50px] p-2 shadow-2xl">
          {/* Screen Bezel */}
          <div className="w-full h-full bg-white rounded-[42px] overflow-hidden relative">
            {/* Dynamic Island (iPhone 15 style) */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50"></div>
            
            {/* App Content Container */}
            <div className="absolute inset-0 pt-10 overflow-hidden">
              <div className="relative w-full h-full">
                {children}
              </div>
            </div>
          </div>
        </div>
        
        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};
