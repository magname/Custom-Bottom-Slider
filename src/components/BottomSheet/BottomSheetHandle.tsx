
// import React from 'react';
// import { cn } from '@/lib/utils';

// interface BottomSheetHandleProps {
//   onMouseDown: (e: React.MouseEvent) => void;
//   onTouchStart: (e: React.TouchEvent) => void;
//   isDragging: boolean;
// }

// export const BottomSheetHandle: React.FC<BottomSheetHandleProps> = ({
//   onMouseDown,
//   onTouchStart,
//   isDragging
// }) => {
//   const handleMouseDown = (e: React.MouseEvent) => {
//     console.log('Handle mouse down triggered');
//     e.preventDefault();
//     e.stopPropagation();
//     onMouseDown(e);
//   };

//   const handleTouchStart = (e: React.TouchEvent) => {
//     console.log('Handle touch start triggered');
//     e.preventDefault();
//     e.stopPropagation();
//     onTouchStart(e);
//   };

//   return (
//     <div 
//       className="flex justify-center py-6 cursor-grab active:cursor-grabbing select-none"
//       onMouseDown={handleMouseDown}
//       onTouchStart={handleTouchStart}
//       style={{ 
//         touchAction: 'none',
//         WebkitTouchCallout: 'none',
//         WebkitUserSelect: 'none',
//         userSelect: 'none'
//       }}
//     >
//       <div
//         className={cn(
//           "w-12 h-1.5 bg-gray-300 rounded-full transition-all duration-200 pointer-events-none",
//           isDragging ? "bg-gray-400 w-16 h-2" : "hover:bg-gray-400"
//         )}
//       />
//     </div>
//   );
// };

// import React from 'react';
// import { cn } from '@/lib/utils';

// interface BottomSheetHandleProps {
//   onMouseDown: (e: React.MouseEvent) => void;
//   onTouchStart: (e: React.TouchEvent) => void;
//   isDragging: boolean;
// }

// export const BottomSheetHandle: React.FC<BottomSheetHandleProps> = ({
//   onMouseDown,
//   onTouchStart,
//   isDragging
// }) => {
//   const handleMouseDown = (e: React.MouseEvent) => {
//     console.log('Handle mouse down triggered');
//     onMouseDown(e);
//   };

//   const handleTouchStart = (e: React.TouchEvent) => {
//     console.log('Handle touch start triggered');
//     onTouchStart(e);
//   };

//   return (
//     <div 
//       className="flex justify-center py-6 cursor-grab active:cursor-grabbing select-none"
//       onMouseDown={handleMouseDown}
//       onTouchStart={handleTouchStart}
//       onContextMenu={(e) => e.preventDefault()}
//       style={{ 
//         touchAction: 'none',
//         WebkitTouchCallout: 'none',
//         WebkitUserSelect: 'none',
//         userSelect: 'none',
//         WebkitTapHighlightColor: 'transparent'
//       }}
//     >
//       <div
//         className={cn(
//           "w-12 h-1.5 bg-gray-300 rounded-full transition-all duration-200",
//           isDragging ? "bg-gray-400 w-16 h-2" : "hover:bg-gray-400"
//         )}
//       />
//     </div>
//   );
// };

import React from 'react';
import { cn } from '@/lib/utils';

interface BottomSheetHandleProps {
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
  isDragging: boolean;
}

export const BottomSheetHandle: React.FC<BottomSheetHandleProps> = ({
  onMouseDown,
  onTouchStart,
  isDragging
}) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    console.log('Handle mouse down triggered');
    onMouseDown(e);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    console.log('Handle touch start triggered');
    onTouchStart(e);
  };

  return (
    <div 
      className="flex justify-center py-4 cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onContextMenu={(e) => e.preventDefault()}
      style={{ 
        touchAction: 'none',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      <div
        className={cn(
          "w-12 h-1.5 bg-gray-300 rounded-full transition-all duration-200",
          isDragging ? "bg-gray-500 w-16 h-2" : "hover:bg-gray-400"
        )}
      />
    </div>
  );
};