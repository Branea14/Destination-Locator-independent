import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getAllReviews } from "../../store/reviews";

const Reviews = () => {
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const singleReview = useSelector(state => state.reviews)
    console.log('singleReview', singleReview)

    useEffect(() => {
        if (spotId) dispatch(getAllReviews(spotId))
    }, [spotId, dispatch]);

    if (!singleReview) return null;

    return (
        <>
            {singleReview.reviews.map((review, index) => {
                const createdAt = new Date(review.createdAt);
                // found solution on StackOverFlow
                // const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                // const month = months[createdAt.getMonth()];
                // const year = createdAt.getFullYear();
                const options = {year: 'numeric', month: 'long'};

                // const formattedDate = `${month} ${year}`;
                const formattedDate = createdAt.toLocaleDateString('en-US', options)
                return (
                    <div key={index}>
                        <div>{review.User.firstName}</div>
                        <div>{formattedDate}</div>
                        <div>{review.review}</div>
                    </div>
                )

            })}
        </>
    )
}

export default Reviews;
