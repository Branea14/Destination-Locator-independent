import { useDispatch, useSelector } from "react-redux"
import { getAllSpots } from "../../store/spots"
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./SpotsBrowser.css";


const SpotsBrowser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const spotsObjects = useSelector((state) => state.spots.spots)
    const allSpots = useMemo(() => Object.values(spotsObjects) , [spotsObjects])
    // const allSpots = useSelector(state => Object.values(state.spots.spots))

    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch])

    if (!allSpots ) return <p>Loading spots...</p>
    // console.log('allSpots', allSpots)
    return (
        <div className="spots-browser">
            {allSpots?.map((spot, index) => (
                <div className='spot-container' onClick={() => navigate(`/spots/${spot.id}`)} key={index} title={`${spot.name}`}>
                    {/* <div className="tool-tip-container">
                        <div className="hover-element">{spot.name}</div> */}
                    <img className="spot-image"src={spot.previewImage} alt={spot.name}></img>
                    {/* </div> */}
                    <div className="spot-details">
                        <div className="spot-details-inside-container">
                            <p className="spot-location">{spot.city}, {spot.state}</p>
                            <p className="spot-rating">
                                {spot.avgRating ? `★ ${spot.avgRating.toFixed(1)}` : <span className="new">NEW!</span>}
                            </p>
                        </div>
                        <div className="spot-price-outside-container">
                            <p className="spot-price"><span className="bold-price">${spot.price}</span> night</p>
                        </div>
                    </div>
                </div>
             ))}
        </div>
    )
}

export default SpotsBrowser;
