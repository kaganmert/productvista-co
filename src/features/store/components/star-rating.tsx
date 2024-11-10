import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  showNumber?: boolean;
}

export const StarRating = ({ rating, showNumber = true }: StarRatingProps) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      {showNumber && <span className="text-sm text-gray-500">({rating.toFixed(1)})</span>}
    </div>
  );
};
