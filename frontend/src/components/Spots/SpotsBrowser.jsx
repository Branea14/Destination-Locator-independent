import { useDispatch, useSelector } from "react-redux"
import { getAllSpots } from "../../store/spots"
import { useEffect, useMemo } from "react";

const SpotsBrowser = () => {

    const spotsObjects = useSelector((state) => state.spots.spots)
    const allSpots = useMemo(() => Object.values(spotsObjects) , [spotsObjects])
    // const allSpots = useSelector(state => Object.values(state.spots.spots))
    console.log(allSpots)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    if (!allSpots ) return <p>Loading spots...</p>

    return (
        <>
        {/* <>hello</> */}
            {allSpots?.map((spot, index) => (
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
                    {/* <button>Update</button>
                    <button>Delete</button> */}
                </div>
             ))}
        </>
    )
}

export default SpotsBrowser;
