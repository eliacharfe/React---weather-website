import {useContext, useEffect, useState} from "react";
import {classesModule} from '../classes/Classes';
import {ListLocationContext} from './Menu';

const VALID_NAME = "Name is valid";
const VALID_LATITUDE = "Latitude is valid";
const VALID_LONGITUDE = "Longitude is valid";
const REQUIRE_NAME = "Name is required";
const REQUIRE_LATITUDE = "Latitude is required";
const REQUIRE_LONGITUDE = "Longitude is required";
const CORRECT_INPUT = "alert-info mt-2 myborder left-text-align";
const INCORRECT_INPUT = "text-danger mt-2";
const INVALID_SYNTAX_INPUT_MSG = "Value must be decimal number: only digits, a single minus and single dot";
const MUST_DECIMAL = "Value must be decimal between ";
const LAT_RANGE = "-90 and 90";
const LON_RANGE = "-180 and 180";
const LOCATION_EXIST = "Location already exist";
const EMPTY = '';
const MAX_LATITUDE = 90;
const MIN_LATITUDE = -90;
const MAX_LONGITUDE = 180;
const MIN_LONGITUDE = -180;
const BTN_NAME = "btn_name";

export default function FormHandle() {

    const [isReset, setIsReset] = useState(false);
    const [name, setName] = useState(EMPTY);
    const [latitude, setLatitude] = useState(EMPTY);
    const [longitude, setLongitude] = useState(EMPTY);
    const [ValidName, setValidName] = useState(REQUIRE_NAME);
    const [ValidLatitude, setValidLatitude] = useState(REQUIRE_LATITUDE);
    const [ValidLongitude, setValidLongitude] = useState(REQUIRE_LONGITUDE);
    const [errorMsg, setErrorMsg] = useState(EMPTY);

    let state = useContext(ListLocationContext);

    /**
     * Set name from input.
     * @param event
     */
    const handleNameChanged = event => {
        setName(event.target.value);
    }

    /**
     * Validate input of the name.
     */
    useEffect(() => {
        (name.length === 0) ? setValidName(REQUIRE_NAME) : setValidName(VALID_NAME);
    }, [name]);

    /**
     * Set latitude from input.
     * @param event
     */
    const handleLatitudeChanged = event => {
        setLatitude(event.target.value);
    }

    /**
     * Validate input of the latitude.
     */
    useEffect(() => {
        if (latitude.length === 0) {
            setValidLatitude(REQUIRE_LATITUDE);
        } else if (!/(?<=^| )-?\d+(\.\d+)?(?=$| )/.test(latitude)) {
            setValidLatitude(INVALID_SYNTAX_INPUT_MSG);
        } else if (latitude > MAX_LATITUDE || latitude < MIN_LATITUDE) {
            setValidLatitude(MUST_DECIMAL + LAT_RANGE);
        } else {
            setValidLatitude(VALID_LATITUDE);
        }
    }, [latitude]);

    /**
     * Set longitude from input.
     * @param event
     */
    const handleLongitudeChanged = event => {
        setLongitude(event.target.value);
    }

    /**
     * Validate input of the longitude.
     */
    useEffect(() => {
        if (longitude.length === 0) {
            setValidLongitude(REQUIRE_LATITUDE);
        } else if (!/(?<=^| )-?\d+(\.\d+)?(?=$| )/.test(longitude)) {
            setValidLongitude(INVALID_SYNTAX_INPUT_MSG);
        } else if (longitude > MAX_LONGITUDE || longitude < MIN_LONGITUDE) {
            setValidLongitude(MUST_DECIMAL + LON_RANGE);
        } else {
            setValidLongitude(VALID_LONGITUDE);
        }
    }, [longitude]);

    /**
     * Check if all inputs are correct if so anf if the location does not exist yet, add the new
     * location to the list of the locations.
     * @param event
     */
    function handleFormSubmission(event) {
        event.preventDefault();
        setErrorMsg(EMPTY)

        if (ValidName === VALID_NAME && ValidLatitude === VALID_LATITUDE && ValidLongitude === VALID_LONGITUDE) {
            let isNotExistLocation = true
            state.locations.map(location => {
                if (location.name === name) {
                    isNotExistLocation = false
                    setErrorMsg(LOCATION_EXIST)
                }
            })
            if (isNotExistLocation) {
                const location = new classesModule.Location(name, latitude, longitude);
                state.setLocations([...state.locations, location])
            }
            setIsReset(!isReset)
        }
    }

    /**
     * Remove a location when button close is clicked for a certain location in the list.
     * @param event
     */
    const removeLocation = event => {
        const name = event.target.getAttribute(BTN_NAME)
        state.setLocations(state.locations.filter(location => location.name !== name))
    }

    /**
     * Reset states.
     */
    useEffect(() => {
        setName(EMPTY)
        setLatitude(EMPTY)
        setLongitude(EMPTY)
    }, [isReset])


    return (

        <div className="container-fluid">
            <div className="card bg-light mt-2">
                <h4 className="mt-2 mb-3 left-text-align">Locations:</h4>

                {state.locations.length === 0 ? (<p className="left-text-align">(no locations yet...)</p>) :
                    (state.locations.map(location => (
                        <div key={location.name} className="card border  bg-light">
                            <div key={location.name} className="card-body mycard">
                                <div key={location.name}>
                                    <h5 className="left">{location.name}</h5>
                                    <button btn_name={location.name} className="btn btn-danger right"
                                            onClick={removeLocation}>X</button>
                                </div>
                            </div>
                        </div>
                    )))}
            </div>

            <div className="card border myborder border-primary border-3  bg-light mt-4 mb-4">
                <div className="card-body my-card">

                    <p className={errorMsg === '' ? '' : "alert alert-danger"}>{errorMsg}</p>

                    <form className="border p-3 myform left-text-align" onSubmit={handleFormSubmission}>
                        <h4 className="mb-2">Add Location:</h4>

                        <div>
                            <label className="form-label">Name</label>
                            <span className="text-danger">*</span>
                            <input type="text" className="form-control myinput myborder"
                                   value={name} onChange={handleNameChanged}/>
                            <p className={ValidName === VALID_NAME ? CORRECT_INPUT
                                : INCORRECT_INPUT}>{ValidName}</p>
                        </div>
                        <div>
                            <label htmlFor="latitudeInput" className="form-label">Latitude</label>
                            <span className="text-danger">*</span>
                            <input type="text" className="form-control myinput myborder"
                                   value={latitude} onChange={handleLatitudeChanged}/>
                            <p className={ValidLatitude === VALID_LATITUDE ? CORRECT_INPUT
                                : INCORRECT_INPUT}>{ValidLatitude}</p>
                        </div>
                        <div>
                            <label htmlFor="LongitudeInput" className="form-label ">Longitude</label>
                            <span className="text-danger">*</span>
                            <input type="text" className="form-control myinput myborder"
                                   value={longitude} onChange={handleLongitudeChanged}/>
                            <p className={ValidLongitude === VALID_LONGITUDE ? CORRECT_INPUT
                                : INCORRECT_INPUT}>{ValidLongitude}</p>
                        </div>

                        <button type="submit" className=" btn btn-block mybtn btn-primary w-100"
                                id="btnSubmit">Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>

    )
}

