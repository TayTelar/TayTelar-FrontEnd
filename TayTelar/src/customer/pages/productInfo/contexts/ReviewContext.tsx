import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Review {
  rating: number;
  comments: string;
}

interface ReviewContextType {
  reviews: Review[];
  addReview: (review: Review) => void;
  averageRating: number;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const useReviews = (): ReviewContextType => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
};

export const ReviewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      rating: 5,
      comments: 'Great working',
    },
  ]);
  const [averageRating, setAverageRating] = useState<number>(5); // Initialize with the first review's rating

  const addReview = (review: Review) => {
    setReviews(prevReviews => [...prevReviews, review]);
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
  };

  React.useEffect(() => {
    setAverageRating(calculateAverageRating());
  }, [reviews]);

  return (
    <ReviewContext.Provider value={{ reviews, addReview, averageRating }}>
      {children}
    </ReviewContext.Provider>
  );
};

export default ReviewContext;
