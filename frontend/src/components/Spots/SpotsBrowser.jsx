import { useDispatch, useSelector } from "react-redux"
import { getAllSpots } from "../../store/spots"
import { useEffect } from "react";

const SpotsBrowser = () => {
    // const allSpots = useSelector(state => console.log('state', state))
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    return (
        <>
        </>
    )
}

export default SpotsBrowser;
