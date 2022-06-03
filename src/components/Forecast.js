import {useContext, useEffect, useState} from "react";
import {classesModule} from '../classes/Classes';
import {ListLocationContext} from './Menu';

const START_IMAGE_SRC = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSbPsT2ekerB7HV1g46qBtIS1hWGo8xbY2vw&usqp=CAU";
const START_FETCH = "https://www.7timer.info/bin/api.pl?lon=";
const END_FETCH = "&product=civillight&output=json";
const START_URL_IMAGE = "https://www.7timer.info/bin/astro.php?%20lon=";
const END_URL_IMAGE = "&ac=0&lang=en&unit=metric&output=internal&tzshift=0";
const BTN_NAME = "btn_name";
const EMPTY = ''
const ERROR_NOT_AVAILABLE_SERVER = "Weather forecast service is not available right now... Please try again later";

export default function Forecast() {

    let state = useContext(ListLocationContext);
    const [nameLocationToFetch, setNameLocationToFetch] = useState(EMPTY)
    const [latitudeLocation, setLatitudeLocation] = useState(EMPTY)
    const [longitudeLocation, setLongitudeLocation] = useState(EMPTY)
    const [urlImage, setUrlImage] = useState(START_IMAGE_SRC);
    const [dataLocation, setDataLocation] = useState(new classesModule.Location(EMPTY, EMPTY, EMPTY));
    const [isLoading, setIsLoading] = useState(false);
    const [isDisplayPressed, setDisplayPressed] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(EMPTY);

    /**
     * Get response from server and if it is ok convert it to json, else set error.
     * @param response - The response from the server when fetch.
     * @returns {*} - promise.
     */
    function handleResponse(response) {
        if (!response.ok) {
            setIsError(true);
            setErrorMsg(`Status not OK: ${response.status} ${response.statusText}`)
        }
        return response.json();
    }

    /**
     * Get json object of the data from the server when fetch and create a new location based on
     * the data.
     * @param jsonObj - the data of the location from the server (7 days).
     */
    function handleJson(jsonObj) {
        let location = new classesModule.Location(nameLocationToFetch, latitudeLocation, longitudeLocation)
        try {
            jsonObj.dataseries.forEach(elem => {
                let day = new classesModule.Day(elem.date, elem.weather, elem.temp2m, elem.wind10m_max)
                location.add_day(day)
            });
        } catch (error) {
            setIsError(true);
            setErrorMsg(error)
        }

        setUrlImage(`${START_URL_IMAGE}${location.longitude}&lat=${location.latitude}${END_URL_IMAGE}`)
        setIsLoading(false);
        setDataLocation(location)
    }

    /**
     * Get error from the server.
     * @param error - The error message.
     */
    function handleError(error) {
        setIsError(true);
        setErrorMsg(ERROR_NOT_AVAILABLE_SERVER)
    }

    /**
     * Do the fetch to server to get the data according to the latitude and longitude from the input.
     */
    const doFetch = () => {
        setIsError(false);
        setErrorMsg(EMPTY);
        setIsLoading(true);
        setDisplayPressed(true);
        state.locations.map(location => {
            if (location.name === nameLocationToFetch) {
                fetch(`${START_FETCH}${location.longitude}&lat=${location.latitude}${END_FETCH}`)
                    .then(handleResponse)
                    .then(handleJson)
                    .catch(handleError);
            }
        })
    }

    /**
     * Listener to the button click of a button thar represent a saved location in the list of locations.
     * @param event
     */
    const saveNameLocation = (event) => {
        const name = event.target.getAttribute(BTN_NAME)
        setNameLocationToFetch(name)
    }

    /**
     * Save latitude and longitude according to the name of the location to fetch.
     */
    useEffect(() => {
        state.locations.map(location => {
            if (location.name === nameLocationToFetch) {
                setLatitudeLocation(location.latitude)
                setLongitudeLocation(location.longitude)
            }
        })
    }, [nameLocationToFetch])

    return (
        <div className="container-fluid myborder">
            <div className="card border myborder border-info border-3  bg-light mt-4 mb-4">
                <div className="card-body ">
                    <p className="h3 mb-3 left-text-align">Forecast: {isDisplayPressed && nameLocationToFetch}</p>

                    {isLoading ? (
                        <div>
                            <img className="img-fluid  mt-3"
                                 src="https://cdn.dribbble.com/users/580699/screenshots/2934892/summer.gif"/>
                        </div>
                    ) : (
                        <div>
                            <img className="img-fluid"
                                 src={urlImage}/>

                            {isDisplayPressed &&
                            <div className="card border-info mt-3">
                                {
                                    dataLocation.listDays.map(day => (
                                        <div key={day.date}>
                                            <h5 key={day.date}
                                                className="card-header left-text-align my-bg">{day.date}</h5>
                                            <div className="card-body">
                                                <p className="card-text left-text-align">
                                                    <strong>Weather:</strong> {day.weather} <br/>
                                                    <strong>Temperature:</strong> {day.temperature.min}&#8451; to {day.temperature.max}&#8451;
                                                    <br/>
                                                    <strong>Wind condition:</strong> {day.windSpeed}m/s
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            }
                        </div>
                    )}

                    <div className="card bg-light mb-1 mt-3 border-info">
                        <h4 className="mt-2 mb-3 left-text-align">Locations:</h4>
                        {state.locations.length === 0 ? (<p className="left-text-align">(no locations yet...)</p>) :
                            (state.locations.map(item => (
                                <div key={item.name}>
                                    <button btn_name={item.name}
                                            className="btn btn-outline-secondary btn-block w-100 selectedBtn "
                                            onClick={saveNameLocation}><b>{item.name}</b>
                                    </button>
                                </div>
                            )))
                        }
                    </div>

                    {isError && <div className="alert alert-danger mt-2">
                        {errorMsg}
                    </div>}

                    {state.locations.length !== 0 &&
                    <div className="col text-center">
                        <button className="btn btn-grey mt-2" onClick={doFetch}>Display Weather Forecast
                        </button>
                    </div>
                    }

                    {isLoading ? (
                        <div>
                            <img className="img-fluid mt-3"
                                 src="https://cdn.dribbble.com/users/580699/screenshots/2934892/summer.gif"/>
                        </div>
                    ) : (
                        isDisplayPressed &&
                        <div className="card border-info mt-3">
                            <h5 className="card-header left-text-align text-primary my-bg">Data location
                                of: {dataLocation.name}</h5>
                            <div className="card-body">
                                <h5 className="card-title left-text-align">{dataLocation.name}</h5>
                                <p className="card-text left-text-align">{dataLocation.latitude}&deg; N, {dataLocation.longitude}&deg; E</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
