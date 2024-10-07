import React, { useState } from 'react';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import WriteReview from './WriteReview';
import '../../../assets/customer/sass/pages/_product.scss';
import { useReviews } from './contexts/ReviewContext';


const Review: React.FC = () => {
  const { reviews, averageRating } = useReviews(); // Use the context hook
  const [writeReview, setWriteReview] = useState<string>('Rate Us');
  const [showReview, setShowReview] = useState<boolean>(false);

  // Calculate review counts
  const totalReviews = reviews.length;
  const reviewCounts = [5, 4, 3, 2, 1].map((star) =>
    reviews.filter((review) => review.rating === star).length
  );

  const handleReview = (isReviewing: boolean) => {
    setShowReview(isReviewing);
    setWriteReview(isReviewing ? 'Cancel Rating' : 'Rate Us');
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating); // Number of full stars
    const hasHalfStar = rating % 1 !== 0; // Check if there is a fractional part
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Remaining empty stars

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <StarRoundedIcon key={`full-${i}`} className="star-inner" />
        ))}
        {hasHalfStar && (
          <StarHalfIcon key="half" className="star-inner" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <StarBorderIcon key={`empty-${i}`} className="star-inner" />
        ))}
      </>
    );
  };

  const getBoxFillPercentage = (starCount: number, totalCount: number) => {
    if (totalCount === 0) return 0;
    return (starCount / totalCount) * 100; // Percentage of the box to fill
  };

  return (
    <div className="review-container">
      <div className="primary-review-container">
        <div className="review-star">
          {renderStars(averageRating)}
          <p className="outof">{averageRating.toFixed(1)} out of 5</p>
          <p className="based">Based on {totalReviews} review{totalReviews > 1 ? 's' : ''}</p>
        </div>
        <div className='review-balancer'>
          <h2 style={{ textAlign: 'center' }}>Customers Reviews</h2>
          <div className="customer-review">
            {reviewCounts.map((count, index) => {
              const starRating = 5 - index;
              const fillPercentage = getBoxFillPercentage(count, totalReviews);
              return (
                <div className={`star-${starRating}`} key={index}>
                  {renderStars(starRating)}
                  <div className="box">
                    <div className="box-fill" style={{ width: `${fillPercentage}%` }}></div>
                  </div>
                  <div className="review-num">{count}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="review-button">
          <button
            onClick={() => {
              setWriteReview(writeReview === 'Rate Us' ? 'Cancel Rating' : 'Rate Us');
              setShowReview(writeReview === 'Rate Us');
            }}
          >
            {writeReview}<StarRoundedIcon className='rate-star' />
          </button>
        </div>
      </div>
      {showReview && (
        <div className="write-review">
          <WriteReview onReview={handleReview} />
        </div>
      )}
      <div className="most-recent">
        <label htmlFor="sort">Sort by:</label>
        <select name="sort" id="sort">
          <option value="mostRecent">Most Recent</option>
          <option value="highestRating">Highest Rating</option>
          <option value="lowestRating">Lowest Rating</option>
        </select>
      </div>
      <div className="review-appear">
        {reviews.map((review, index) => (
          <div key={index} className="single-review">
            <div className="review-stars">
              {renderStars(review.rating)}
            </div>
            <div className="review-section">
              <PersonOutlineOutlinedIcon className="person-icon" />
            </div>
            <p>{review.comments}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
