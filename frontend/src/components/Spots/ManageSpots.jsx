import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import { useModal } from "../../context/Modal";
import DeleteModal from "./DeleteModal";
import { removeSpot } from "../../store/spots";
import "./ManageSpots.css"

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
        <div className="manage-spots">
            <div className="manage-spots-header">Manage Your Spots</div>
            <div className="container">
                {userSpots?.length > 0 ? (
                    userSpots.map((spot, index) => (
                        <>
                            <div className='spot-container' key={index} onClick={() => navigate(`/spots/${spot.id}`)}>
                                {/* <div onClick={() => navigate(`/spots/${spot.id}`)}> */}
                                    {/* <p className="spot-name-hover">{spot.name}</p> */}
                                    <img className='spot-image' src={spot.previewImage} alt=''></img>
                                    <div className="spot-details">
                                        <div className="spot-details-inside-container">
                                            <p className="spot-location">{spot.city}, {spot.state}</p>
                                            <p className="spot-rating">
                                                {spot.avgRating
                                                    ? `★ ${spot.avgRating.toFixed(1)}`
                                                    : 'NEW!'
                                                }
                                            </p>
                                        </div>
                                        <div className="spot-price-outside-container">
                                            <p className="spot-price"><span className="bold-price">${spot.price}</span> night</p>
                                        </div>
                                    </div>
                                    <div className="manage-spot-button">
                                        <button className='manage-buttons' onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/spots/${spot.id}/edit`);
                                        }}>
                                            Update
                                        </button>
                                        <button
                                            className='manage-buttons'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openModal(
                                                    <DeleteModal
                                                        spotId={spot.id}
                                                        handleDelete={() => handleDeleteButton(spot.id)}
                                                    />
                                                )
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                            </div>
                        </>
                    ))
                ) : (
                    <>
                    <button className='Create-Button' onClick={handleNewSpotButton}>Create a New Spot</button>
                    <p className="no-listings">You don&apos;t have any spots listed yet.</p>
                    </>
                )}
            </div>
        </div>

)
}

export default ManageSpots;
