
export type SnapPoint = 'closed' | 'half' | 'full';

export interface BottomSheetProps {
  children: React.ReactNode;
  initialSnap?: SnapPoint;
  onSnapChange?: (snap: SnapPoint) => void;
  className?: string;
}

export interface BottomSheetRef {
  snapTo: (snap: SnapPoint) => void;
  getCurrentSnap: () => SnapPoint;
}
