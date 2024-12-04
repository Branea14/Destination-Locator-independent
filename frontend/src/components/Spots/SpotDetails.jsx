import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getSingleSpot } from "../../store/spots";

const SpotDetails = () => {
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const singleSpot = useSelector(state => state.spot.singleSpot)
    // console.log(singleSpot)

    useEffect(() => {
        spotId && dispatch(getSingleSpot(spotId))
    }, [spotId, dispatch])

    // alertbutton = () => {
    //     alert('Feature Coming soon')
    // }

    if (!singleSpot) return null;

    return (
        <>
            <h1>{singleSpot.name}</h1>
            <h2>{singleSpot.city}, {singleSpot.state}, {singleSpot.country}</h2>
            {singleSpot.SpotImages.map((spotImageDetails, index) => (
                <div key={index}>
                    {/* need to add more images */}
                    <img src={spotImageDetails.url} alt="" ></img>
                </div>
            ))}
            <h2>Hosted by {singleSpot.Owner.firstName} {singleSpot.Owner.lastName}</h2>
            <p>{singleSpot.description}</p>
            <h3 className="price">
                ${singleSpot.price} <span className="night">night</span>
            </h3>
            <button type="button" onClick={() => alert('Feature Coming Soon...')}>Reserve</button>
            <h4>{singleSpot.avgStarRating && singleSpot.numReviews == 1
                    ? `⭐${singleSpot.avgStarRating} • ${singleSpot.numReviews} review`
                    : singleSpot.avgStarRating && singleSpot.numReviews > 1
                    ? `⭐${singleSpot.avgStarRating} • ${singleSpot.numReviews} reviews`
                    : `⭐NEW!`
                }
            </h4>
            <h3>
                {singleSpot.avgStarRating && singleSpot.numReviews == 1
                    ? `⭐${singleSpot.avgStarRating} • ${singleSpot.numReviews} review`
                    : singleSpot.avgStarRating && singleSpot.numReviews > 1
                    ? `⭐${singleSpot.avgStarRating} • ${singleSpot.numReviews} reviews`
                    : `⭐NEW!`
                }
            </h3>
            <Outlet />
        </>
    )
}

export default SpotDetails;
