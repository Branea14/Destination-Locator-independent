import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleSpot } from "../../store/spots";
import EditSpotForm from "./EditSpotForm";

const EditSpot = () => {
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    const spot = useSelector(state => state.spots.singleSpot);

    useEffect(() => {
        const fetchingSpot = async () => {
            if (spotId) {
                await dispatch(getSingleSpot(spotId));
                setIsLoaded(true);
            }
        }
        fetchingSpot();

    }, [spotId, dispatch])

    if (!isLoaded || !spot ) return <p>Loading...</p>

    return (
        <>
            <EditSpotForm spot={spot}/>
        </>
    )
}

export default EditSpot;
