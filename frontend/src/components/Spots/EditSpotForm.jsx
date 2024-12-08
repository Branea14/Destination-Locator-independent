import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editSpot } from "../../store/spots";

const EditSpotForm = ({spot}) => {
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [spotName, setSpotName] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrls, setImageUrls] = useState(['', '', '', '', '']);
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (spot) {
            setCountry(spot.country || "");
            setAddress(spot.address || "");
            setCity(spot.city || "");
            setState(spot.state || "");
            setDescription(spot.description || "");
            setSpotName(spot.name || "");
            setPrice(spot.price || "");
            setImageUrls(spot.SpotImages?.map((img) => img.url) || ["", "", "", "", ""]);
        }
    }, [spot]);

    const updateCountry = (e) => setCountry(e.target.value);
    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateSpotName = (e) => setSpotName(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updateUrl = (e, index) => {
        const newUrls = [...imageUrls];
        newUrls[index] = e.target.value;
        setImageUrls(newUrls);
    };

    const handleValidation = () => {
        const validationErrors = {};

        if (!country) validationErrors.country = 'Country is required';
        if (!address) validationErrors.address = 'Address is required';
        if (!city) validationErrors.city = 'City is required';
        if (!state) validationErrors.state = 'State is required';
        if (description.length < 30) validationErrors.description = 'Description needs a minimum of 30 characters';
        if (!spotName) validationErrors.spotName = 'Name is required';
        if (!price || isNaN(price)) validationErrors.price = 'Price is required';

        const previewImage = imageUrls[0];
        if (!previewImage) {
            validationErrors.previewImage = 'Preview Image is required.'
        } else if (!(previewImage.endsWith('.jpg') || previewImage.endsWith('.jpeg') || previewImage.endsWith('.png'))) {
            validationErrors.previewImage = 'Preview image must end in .png, .jpg, or .jpeg';
        }

        imageUrls.forEach((url, index) => {
            if (url && !(url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png'))) {
                validationErrors[`image${index}`] = 'Image URL must end in .png, .jpg, or .jpeg';
            }
        })

        return validationErrors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        console.log('form submitted')
        const validationErrors = handleValidation();
        console.log('validationErrors', validationErrors)
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const payload = {
            country,
            address,
            city,
            state,
            description,
            name: spotName,
            price,
            SpotImages: imageUrls
                .filter(url => url)
                .map((url, index) => ({ url, preview: index === 0 }))
        }

        console.log('payload', payload)

        const updatedSpot = await dispatch(editSpot(payload));
        console.log('newSpot', updatedSpot)
        if (updatedSpot?.id) {
            navigate(`/spots/${updatedSpot.id}`);
        }
    }

    if (!spot) return <p>Loading spot detail...</p>


    return (
        <section className="new-form-holder centered middled">
                <h1>Update Your Spot</h1>
            <form className="create-spot-form" onSubmit={handleSubmit}>
                <h2>Where&apos;s your place located?</h2>
                <p>Guests will only get your exact address once they booked a reservation.</p>
                <label>
                    Country
                    <input
                        type="text"
                        // placeholder="Country"
                        // required
                        value={country || ""}
                        onChange={updateCountry} />
                </label>
                {errors.country &&
                    <p>{errors.country}</p>
                }
                <label>
                    Street Address
                    <input
                        type="text"
                        placeholder="Address"
                        // required
                        value={address || ""}
                        onChange={updateAddress}
                    />
                </label>
                {errors.address &&
                    <p>{errors.address}</p>
                }
                <label>
                    City
                    <input
                        type="text"
                        placeholder="City"
                        // required
                        value={city || ""}
                        onChange={updateCity}
                    />
                </label> ,
                {errors.city &&
                    <p>{errors.city}</p>
                }
                <label>
                    State
                    <input
                        type="text"
                        placeholder="STATE"
                        // required
                        value={state || ""}
                        onChange={updateState}
                    />
                </label>
                {errors.state &&
                    <p>{errors.state}</p>
                }
                <h2>Describe your place to guests</h2>
                <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                <textarea
                    placeholder="Please write at least 30 characters"
                    // required
                    value={description || ""}
                    onChange={updateDescription}
                />
                {errors.description &&
                    <p>{errors.description}</p>
                }
                <h2>Create a title for your spot</h2>
                <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
                <input
                    type="text"
                    placeholder="Name of your spot"
                    // required
                    value={spotName || ""}
                    onChange={updateSpotName}
                />
                {errors.spotName &&
                    <p>{errors.spotName}</p>
                }
                <h2>Set a base price for your spot</h2>
                <p>Competitive price can help your listing stand out and rank higher in search results.</p>
                $ <input
                    type="number"
                    placeholder="Price per night (USD)"
                    // required
                    value={price || ""}
                    onChange={updatePrice}
                />
                {errors.price &&
                    <p>{errors.price}</p>
                }
                <h2>Liven up your spot with photos</h2>
                <p>Submit a link to at least one photo to publish your spot.</p>
                <input
                    type="text"
                    placeholder="Preview Image URL"
                    value={imageUrls[0] || ""}
                    onChange={(e) => updateUrl(e, 0)}
                />
                {errors.previewImage &&
                    <p>{errors.previewImage}</p>
                }

                {[1, 2, 3, 4].map(index => (
                    <input key={index}
                        type="text"
                        placeholder="Image URL"
                        value={imageUrls[index] || ""}
                        onChange={(e) => updateUrl(e, index)}
                        />
                ))}


                {errors.image1 && <p>{errors.image1}</p>}
                {errors.image2 && <p>{errors.image2}</p>}
                {errors.image3 && <p>{errors.image3}</p>}
                {errors.image4 && <p>{errors.image4}</p>}
                {/* <button type="submit" disabled={Object.keys(errors).length > 0}>Create Spot</button> */}
                <button type="submit" >Update Spot</button>

            </form>
        </section>
    )
}

export default EditSpotForm;
