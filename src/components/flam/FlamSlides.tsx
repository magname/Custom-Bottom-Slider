import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ExternalLink, ChevronUp, Minus, Maximize2, MessageCircle } from 'lucide-react';

interface Slide {
  type: 'full' | 'half';
  title: string;
  subtitle?: string;
  blurb?: string;
  cta?: string;
  points?: string[];
  footerCta?: string;
}

interface FlamSlidesProps {
  onBottomSheetControl?: (action: 'closed' | 'half' | 'full') => void;
}

const slides: Slide[] = [
  {
    type: 'full',
    title: 'Flam',
    subtitle: 'AI-Powered Mixed Reality Publishing Platform',
    blurb: 'Turn print, OOH & digital media into immersive experiences—no app download required.',
    cta: 'Dive into Mixed Reality →'
  },
  {
    type: 'half',
    title: 'How It Works',
    points: [
      'Scan a QR code with any phone camera → flips to Flam\'s MR viewer',
      'Instant, browser-based experience on all devices',
      'Fastest image recognition: 50 ms scan time',
      'Most accurate image tracking every time'
    ]
  },
  {
    type: 'half',
    title: 'Key Features',
    points: [
      'Unlimited scalability: built for billions of users',
      'Create & publish MR in minutes—no dev team needed',
      'Works across newspapers, billboards, packaging, magazines, TV',
      'Beautifully durable aerospace-grade hardware options'
    ]
  },
  {
    type: 'half',
    title: 'Why Brands Love Flam',
    points: [
      'Hook viewers with immersive, interactive ads',
      'Go viral—viewers record & share MR experiences',
      'Drive action: embed shop links, WhatsApp bots, lead-gen forms',
      'Track and analyze every interaction in real time',
      'Localize content by region or language on the fly'
    ]
  },
  {
    type: 'half',
    title: 'Success Stories',
    points: [
      'Britannia Nutrichoice × Ranveer Singh: The Hindu newspaper activation',
      'BW Businessworld cover: interactive magazine experience',
      'AJIO × Netflix Heeramandi: trailer reveal via MR flip'
    ],
    footerCta: 'Publish Your Mixed Reality Experience in Minutes →\nContact us at hello@flamapp.ai'
  }
];

export const FlamSlides: React.FC<FlamSlidesProps> = ({ onBottomSheetControl }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const visitFlam = () => {
    window.open('https://www.flamapp.ai/', '_blank');
  };

  const contactFlam = () => {
    window.open('https://www.flamapp.ai/contact-us', '_blank');
  };

  const slide = slides[currentSlide];

  return (
    <div className="h-full bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col">
      {/* Navigation */}
      <div className="flex justify-between items-center p-4 bg-white/80 backdrop-blur-sm border-b border-green-200">
        <div className="flex items-center gap-2">
          <Button 
            onClick={prevSlide} 
            variant="outline" 
            size="sm"
            className="border-green-200 hover:bg-green-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <div className="text-sm text-green-700 font-medium">
            {currentSlide + 1} / {slides.length}
          </div>
          
          <Button 
            onClick={nextSlide} 
            variant="outline" 
            size="sm"
            className="border-green-200 hover:bg-green-50"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Slide Content */}
      <div className="flex-1 px-4 pb-4 overflow-auto">
        {slide.type === 'full' ? (
          <Card className="h-full flex flex-col justify-center text-center border-green-200 bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-4">
              <CardTitle className="text-3xl font-bold text-green-800">
                {slide.title}
              </CardTitle>
              {slide.subtitle && (
                <p className="text-lg text-green-600 font-medium">
                  {slide.subtitle}
                </p>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {slide.blurb && (
                <p className="text-gray-700 leading-relaxed">
                  {slide.blurb}
                </p>
              )}
              {slide.cta && (
                <Button 
                  onClick={visitFlam}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {slide.cta}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              )}
              {/* Contact button inside full slide */}
              <Button 
                onClick={contactFlam}
                variant="outline" 
                size="sm"
                className="border-green-200 hover:bg-green-50 mt-4"
              >
                <MessageCircle className="w-3 h-3 mr-1" />
                Contact
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="h-full border-green-200 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-green-800">
                {slide.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {slide.points && (
                <ul className="space-y-3">
                  {slide.points.map((point, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
              {/* Contact button inside half slide */}
              <Button 
                onClick={contactFlam}
                variant="outline" 
                size="sm"
                className="border-green-200 hover:bg-green-50 mt-4"
              >
                <MessageCircle className="w-3 h-3 mr-1" />
                Contact
              </Button>
              {slide.footerCta && (
                <div className="mt-6 pt-4 border-t border-green-200">
                  <Button 
                    onClick={visitFlam}
                    className="w-full bg-green-600 hover:bg-green-700 text-white text-sm"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Flam
                  </Button>
                  <p className="text-xs text-green-600 mt-2 text-center">
                    Contact us at hello@flamapp.ai
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
