import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import '../../assets/sass/pages/_product.scss';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { useReviews } from './contexts/ReviewContext'; // Use the context hook

// Define validation schema
const validationSchema = Yup.object({
    comments: Yup.string()
        .min(5, 'Comments must be a minimum of 5 characters')
        .max(500, 'Comments cannot be more than 500 characters'),
    rating: Yup.number()
        .required('Rating is required')
        .min(1, 'Rating must be at least 1')
        .max(5, 'Rating cannot be more than 5'),
});

const WriteReview: React.FC<{ onReview: (isReviewing: boolean) => void }> = ({ onReview }) => {
    const { addReview } = useReviews(); // Use the context hook
    const [rating, setRating] = useState<number>(0);
    const [ratingDescription, setRatingDescription] = useState<JSX.Element | string>('');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const formik = useFormik({
        initialValues: {
            comments: '',
            rating: 0,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            addReview({
                comments: values.comments,
                rating: values.rating,
            });
            setIsSubmitted(true);
        },
    });

    const getRatingDescription = (rating: number): JSX.Element | string => {
        switch (rating) {
            case 1:
                return (
                    <>
                        <span>Hated it</span>
                        <SentimentVeryDissatisfiedIcon style={{ color: 'black', position: "relative", top: "0.35rem", left: "0.3rem" }} />
                    </>
                );
            case 2:
                return (
                    <>
                        <span>Didn't like it</span>
                        <SentimentDissatisfiedIcon style={{ color: 'black', position: "relative", top: "0.35rem", left: "0.3rem" }} />
                    </>
                );
            case 3:
                return (
                    <>
                        <span>Was good</span>
                        <SentimentNeutralIcon style={{ color: 'black', position: "relative", top: "0.35rem", left: "0.3rem" }} />
                    </>
                );
            case 4:
                return (
                    <>
                        <span>Liked it</span>
                        <SentimentSatisfiedIcon style={{ color: 'black', position: "relative", top: "0.35rem", left: "0.3rem" }} />
                    </>
                );
            case 5:
                return (
                    <>
                        <span>Loved it</span>
                        <SentimentVerySatisfiedIcon style={{ color: 'black', position: "relative", top: "0.35rem", left: "0.3rem" }} />
                    </>
                );
            default:
                return '';
        }
    };

    return (
        <div className="main-review">
            {isSubmitted ? (
                <div className="thank-you-message">
                    <CheckCircleIcon style={{ fontSize: '3rem' }} />
                    <h1>Review Submitted!</h1>
                    <p>Thank you for your review. Your feedback is valuable to us.</p>
                </div>
            ) : (
                <form onSubmit={formik.handleSubmit}>
                    <h2>Write a Review</h2>
                    <p>Rating</p>
                    <div className="rating-container">
                        {[...Array(5)].map((_, i) => (
                            <StarRoundedIcon
                                key={i}
                                className="star-inner"
                                style={{
                                    width: '2rem',
                                    height: '2rem',
                                    color: i < rating ? 'black' : 'grey',
                                    cursor: 'pointer',
                                }}
                                onClick={() => {
                                    setRating(i + 1);
                                    setRatingDescription(getRatingDescription(i + 1));
                                    formik.setFieldValue('rating', i + 1);
                                }}
                            />
                        ))}
                        <p className="rating-description" style={{ fontWeight: '1000', fontSize: '1.1rem' }}>{ratingDescription}</p>
                    </div>
                    {formik.errors.rating && formik.touched.rating && (
                        <p className="error">{formik.errors.rating}</p>
                    )}

                    <p>Review</p>
                    <textarea
                        className="comments"
                        placeholder="Write your comments here"
                        name="comments"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.comments}
                    />
                    {formik.errors.comments && formik.touched.comments && (
                        <p className="error">{formik.errors.comments}</p>
                    )}

                    <p>
                        How we use your data: We’ll only contact you about the review you left, and only if necessary. By
                        submitting your review, you agree to Judge.me’s terms, privacy and content policies.
                    </p>

                    <button className="cancel" type="button" onClick={() => onReview(false)}>
                        Cancel Review
                    </button>
                    <button className="submit" type="submit">
                        Submit Review
                    </button>
                </form>
            )}
        </div>
    );
};

export default WriteReview;
