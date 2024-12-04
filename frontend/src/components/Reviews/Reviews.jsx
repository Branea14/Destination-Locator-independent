import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom"
import { getAllReviews } from "../../store/reviews";

const Reviews = () => {
    const {spotId} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (spotId) dispatch(getAllReviews(spotId))
    }, [spotId, dispatch]);

    return (
        <>
        </>
    )
}

export default Reviews;
