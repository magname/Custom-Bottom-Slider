import React, { useRef, useState } from 'react';
import { BottomSheet } from '../components/BottomSheet/BottomSheet';
import { FlamSlides } from '../components/flam/FlamSlides';
import { BottomSheetRef, SnapPoint } from '../components/BottomSheet/types';
import { PhoneMockup } from '../components/PhoneMockup/PhoneMockup';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, Smartphone, Hand } from 'lucide-react';

const Index = () => {
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const [currentSnap, setCurrentSnap] = useState<SnapPoint>('closed');

  const handleSnapTo = (snap: SnapPoint) => {
    bottomSheetRef.current?.snapTo(snap);
  };

  const handleSnapChange = (snap: SnapPoint) => {
    setCurrentSnap(snap);
  };

  const handleBottomSheetControl = (action: 'closed' | 'half' | 'full') => {
    handleSnapTo(action);
  };

  return (
    <PhoneMockup>
      {/* Main Flam Content */}
      <FlamSlides onBottomSheetControl={handleBottomSheetControl} />

      {/* Bottom Sheet for Demo */}
      <BottomSheet
        ref={bottomSheetRef}
        initialSnap="closed"
        onSnapChange={handleSnapChange}
      >
        <div className="space-y-4 p-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Bottom Sheet Demo
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Touch-optimized spring physics bottom sheet
            </p>
          </div>

          <div className="space-y-3">
            <Card className="text-center border-green-200">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-center gap-2 text-lg text-green-800">
                  <ArrowUp className="w-4 h-4" />
                  Spring Physics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-green-600">
                  Natural motion with realistic physics
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-center gap-2 text-lg text-green-800">
                  <Hand className="w-4 h-4" />
                  Touch Gestures
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-green-600">
                  Optimized for mobile touch interactions
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-center gap-2 text-lg text-green-800">
                  <Smartphone className="w-4 h-4" />
                  Mobile First
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-green-600">
                  Built for mobile-first experiences
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-4">
            <p className="text-green-700 mb-2 text-sm">
              Current:{' '}
              <span className="font-semibold capitalize">{currentSnap}</span>
            </p>
            <p className="text-xs text-green-600">
              Use the controls above or drag the handle
            </p>
          </div>
        </div>
      </BottomSheet>
    </PhoneMockup>
  );
};

export default Index;
