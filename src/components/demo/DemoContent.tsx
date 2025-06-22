
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Star, MapPin, Clock, Users } from 'lucide-react';

interface DemoContentProps {
  onSnapTo: (snap: 'closed' | 'half' | 'full') => void;
  currentSnap: 'closed' | 'half' | 'full';
}

export const DemoContent: React.FC<DemoContentProps> = ({ onSnapTo, currentSnap }) => {
  return (
    <div className="space-y-4">
      {/* Quick Actions */}
      <div className="flex gap-2 flex-wrap">
        <Button 
          size="sm" 
          variant={currentSnap === 'closed' ? 'default' : 'outline'}
          onClick={() => onSnapTo('closed')}
        >
          Close
        </Button>
        <Button 
          size="sm" 
          variant={currentSnap === 'half' ? 'default' : 'outline'}
          onClick={() => onSnapTo('half')}
        >
          Half
        </Button>
        <Button 
          size="sm" 
          variant={currentSnap === 'full' ? 'default' : 'outline'}
          onClick={() => onSnapTo('full')}
        >
          Full
        </Button>
      </div>

      <Separator />

      {/* Restaurant Info Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">The Garden Bistro</CardTitle>
              <CardDescription className="flex items-center gap-1 mt-1">
                <MapPin className="w-4 h-4" />
                Downtown • 0.3 miles away
              </CardDescription>
            </div>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" />
              4.8
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              25-35 min
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              Popular now
            </div>
          </div>

          <p className="text-sm">
            Fresh, locally-sourced ingredients crafted into delicious Mediterranean dishes. 
            Known for their signature pasta and wood-fired pizzas.
          </p>

          {currentSnap === 'full' && (
            <>
              <Separator />
              
              <div className="space-y-3">
                <h4 className="font-semibold">Popular Items</h4>
                <div className="space-y-2">
                  {[
                    { name: 'Margherita Pizza', price: '$18.99', description: 'Classic tomato, mozzarella, basil' },
                    { name: 'Truffle Pasta', price: '$24.99', description: 'Creamy truffle sauce with mushrooms' },
                    { name: 'Caesar Salad', price: '$14.99', description: 'Crisp romaine, parmesan, croutons' },
                    { name: 'Grilled Salmon', price: '$28.99', description: 'Atlantic salmon with seasonal vegetables' }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-start p-3 rounded-lg border">
                      <div>
                        <h5 className="font-medium">{item.name}</h5>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{item.price}</p>
                        <Button size="sm" className="mt-1">Add</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-semibold">Reviews</h4>
                <div className="space-y-3">
                  {[
                    { name: 'Sarah M.', rating: 5, text: 'Amazing food and great service! The truffle pasta is incredible.' },
                    { name: 'John D.', rating: 5, text: 'Best pizza in town. The wood-fired oven makes all the difference.' },
                    { name: 'Emma L.', rating: 4, text: 'Lovely atmosphere and fresh ingredients. Will definitely come back!' }
                  ].map((review, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-sm">{review.name}</span>
                        <div className="flex">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <Button className="w-full mt-4">
            Order Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
