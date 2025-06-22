
import React from 'react';
import { cn } from '@/lib/utils';

interface BottomSheetContentProps {
  children: React.ReactNode;
  className?: string;
}

export const BottomSheetContent: React.FC<BottomSheetContentProps> = ({
  children,
  className
}) => {
  return (
    <div className={cn("flex-1 overflow-auto px-4 pb-4", className)}>
      {children}
    </div>
  );
};
