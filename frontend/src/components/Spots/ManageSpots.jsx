import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllSpots } from "../../store/spots";

const ManageSpots = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const allSpots = useSelector(state => state.spots.spots);
    const currUser = useSelector(state => state.session.user.id);

    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch])

    const handleNewSpotButton = async (e) => {
        e.preventDefault();
        navigate(`/spots/new`)
    }

    if (!allSpots) return <p>Loading...</p>
    // console.log(allSpots)

    const userSpots = allSpots?.Spots?.filter(spot => spot.ownerId === currUser)

    return (

        <>
            <h1>Manage Your Spots</h1>
            <button onClick={handleNewSpotButton}>Create a New Spot</button>
            {userSpots?.length > 0 ? (
                userSpots.map((spot, index) => (
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
                        <button onClick={() => navigate(`/spots/${spot.id}/edit`)}>Update</button>
                        <button>Delete</button>
                    </div>
                ))
            ) : (
                <p>You don&apos;t have any spots listed yet.</p>
            )}
        </>

)
}

export default ManageSpots;
