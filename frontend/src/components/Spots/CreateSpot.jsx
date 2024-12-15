import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSpot } from "../../store/spots";
import './CreateSpot.css';

const CreateSpot = () => {
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
        if (!description || description.length < 30) validationErrors.description = 'Description needs a minimum of 30 characters';
        if (!spotName) validationErrors.spotName = 'Name is required';
        if (!price || isNaN(price)) validationErrors.price = 'Price is required';
        else if (price <= 0) validationErrors.price = 'Price must be greater than $0'

        const previewImage = imageUrls[0];
        if (!previewImage) {
            validationErrors.previewImage = 'Preview Image is required'
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

        const validationErrors = handleValidation();

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
            SpotImages: imageUrls.map((url, index) => ({
                url,
                preview: index === 0
            }))
        }

        const newSpot = await dispatch(createSpot(payload));

        if (newSpot) {
            navigate(`/spots/${newSpot.id}`);
        }
    }

    return (
        <section className="new-form-holder centered middled">
                <div className="form-title">Create a New Spot</div>
            <form className="create-spot-form" onSubmit={handleSubmit}>
                <h2>Where&apos;s your place located?</h2>
                <p>Guests will only get your exact address once they booked a reservation.</p>
                <label>
                    Country
                    <input
                        type="text"
                        placeholder="Country"
                        value={country}
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
                        value={address}
                        onChange={updateAddress}
                    />
                </label>
                {errors.address &&
                    <p>{errors.address}</p>
                }
                <div className="city-and-state">
                    <label className="city">
                        City
                        <input
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={updateCity}
                        />
                    </label> <span div className="comma">,</span>
                    {errors.city &&
                        <p>{errors.city}</p>
                    }
                    <label>
                        State
                        <input
                            type="text"
                            placeholder="State"
                            value={state}
                            onChange={updateState}
                        />
                    </label>
                    {errors.state &&
                        <p>{errors.state}</p>
                    }
                </div>

                <div className="section-break"></div>

                <h2>Describe your place to guests</h2>
                <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                <textarea className="spot-description"
                    placeholder="Please write at least 30 characters."
                    value={description}
                    onChange={updateDescription}
                />
                {errors.description &&
                    <p>{errors.description}</p>
                }

                <div className="section-break"></div>

                <h2>Create a title for your spot</h2>
                <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
                <input className="spot-title"
                    type="text"
                    placeholder="Name of your spot"
                    value={spotName}
                    onChange={updateSpotName}
                />
                {errors.spotName &&
                    <p>{errors.spotName}</p>
                }

                <div className="section-break"></div>

                <h2>Set a base price for your spot</h2>
                <p>Competitive price can help your listing stand out and rank higher in search results.</p>
                <div className="full-price">
                <span className="dollar-sign">$</span> <input
                    type="number"
                    placeholder="Price per night (USD)"
                    value={price}
                    onChange={updatePrice}
                />
                {errors.price &&
                    <p>{errors.price}</p>
                }
                </div>

                <div className="section-break"></div>

                <h2>Liven up your spot with photos</h2>
                <p>Submit a link to at least one photo to publish your spot.</p>
                <input className="preview-image"
                    type="text"
                    placeholder="Preview Image URL"
                    value={imageUrls[0]}
                    onChange={(e) => updateUrl(e, 0)}
                />
                {errors.previewImage &&
                    <p>{errors.previewImage}</p>
                }

                {[1, 2, 3, 4].map(index => (
                    <input key={index} className="images"
                        type="text"
                        placeholder="Image URL"
                        value={imageUrls[index]}
                        onChange={(e) => updateUrl(e, index)}
                        />
                ))}
                {errors.image1 && <p>{errors.image1}</p>}
                {errors.image2 && <p>{errors.image2}</p>}
                {errors.image3 && <p>{errors.image3}</p>}
                {errors.image4 && <p>{errors.image4}</p>}
                {/* <button type="submit" disabled={Object.keys(errors).length > 0}>Create Spot</button> */}
                <button type="submit" >Create Spot</button>

            </form>
        </section>
    )
}

export default CreateSpot;
