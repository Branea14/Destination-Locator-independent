import { useDispatch, useSelector } from "react-redux"
import { getAllSpots } from "../../store/spots"
import { useEffect } from "react";

const SpotsBrowser = () => {
    const allSpots = useSelector(state => state.spots.spots)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    if (!allSpots || !allSpots.Spots) return <p>Loading spots...</p>

    return (
        <>
            {allSpots.Spots.map((spot, index) => (
                <div className='spot-container' key={index}>
                    <p className="spot-name-hover">{spot.name}</p>
                    <img src={spot.previewImage} alt=''></img>
                    <p>{spot.city}, {spot.state}</p>
                    <p>${spot.price} night</p>
                    <p>
                        {spot.avgRating
                            ? `⭐${spot.avgRating}`
                            : 'NEW!'
                        }
                    </p>
                </div>
            ))}
        </>
    )
}

export default SpotsBrowser;
