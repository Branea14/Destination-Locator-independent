import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import { useModal } from "../../context/Modal";
import DeleteModal from "./DeleteModal";
import { removeSpot } from "../../store/spots";

const ManageSpots = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {openModal} = useModal();

    const currUser = useSelector(state => state.session.user?.id);
    const spotsObjects = useSelector((state) => state.spots.spots)
    const allSpots = useMemo(() => Object.values(spotsObjects) , [spotsObjects])

    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch])

    const handleNewSpotButton = async (e) => {
        e.preventDefault();
        navigate(`/spots/new`)
    }

    const handleDeleteButton = spotId => {
        dispatch(removeSpot(spotId))
    }

    // if (!allSpots ) return <p>Loading manage spots</p>
    const userSpots = allSpots?.filter(spot => spot.ownerId === currUser)


    return (

        <>
            <h1>Manage Your Spots</h1>
            <button onClick={handleNewSpotButton}>Create a New Spot</button>
            {userSpots?.length > 0 ? (
                userSpots.map((spot, index) => (
                    <div className='spot-container' key={index}>
                        <div onClick={() => navigate(`/spots/${spot.id}`)}>
                            {/* <p className="spot-name-hover">{spot.name}</p> */}
                            <img src={spot.previewImage} alt=''></img>
                            <p>
                                {spot.avgRating
                                    ? `★ ${spot.avgRating}`
                                    : 'NEW!'
                                }
                            </p>
                            <p>${spot.price} night</p>
                            <p>{spot.city}, {spot.state}</p>

                        </div>
                        <button onClick={() => navigate(`/spots/${spot.id}/edit`)}>Update</button>
                        <button onClick={() => openModal(<DeleteModal spotId={spot.id} handleDelete={() => handleDeleteButton(spot.id)}/>)}>Delete</button>
                    </div>
                ))
            ) : (
                <p>You don&apos;t have any spots listed yet.</p>
            )}
        </>

)
}

export default ManageSpots;
