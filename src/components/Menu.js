import logo from '../logo.svg';
import {useContext, useEffect, useState} from "react";
import {Link, Outlet} from "react-router-dom";
import * as React from "react";

export const ListLocationContext = React.createContext([]);
export default function Menu() {
    const [locations, setLocations] = useState([])

    return (
        <div className="row">
            <div className="col-xl-3 col-md-3 mt-4">
                <header className="App-header mt-4">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                        Learn React</a>
                </header>
            </div>

            <div className="col-xl-6 col-md-6">
                <ListLocationContext.Provider value={{locations, setLocations}}>
                    <span> <img className="imgLogo"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSbPsT2ekerB7HV1g46qBtIS1hWGo8xbY2vw&usqp=CAU"/> </span>
                    <p className="h4 navbar-text rounded ml-5 grey"> My Weather Forecast</p>
                    <hr/>

                    <nav className="navbar navbar-light my-nav">
                        <div className="container-fluid">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false"
                                    aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"> </span>
                            </button>
                            <div className="collapse navbar-collapse text-center" id="navbarText">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link to="/forecast"
                                              className="btn btn-grey me-2 mt-4"
                                              type="button">Forecast</Link>

                                        <Link to="/form"
                                              className="btn btn-grey me-2 mt-4"
                                              type="button">Locations</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    <Outlet/>
                </ListLocationContext.Provider>
            </div>

            <div className="col-xl-3 col-md-3 mt-4">
                <img
                    src="https://download.cnet.com/a/img/resize/0de933d694dbfd3e19ba1e13480a3e594f6ad3b7/catalog/2018/11/27/a27afb7d-606c-4f6b-ba9e-86b8009570cb/imgingest-1384353506637431747.png?auto=webp&fit=crop&width=64"
                    className="card-img-top myborder mb-3 mt-4" alt="..."/>
                <img className="myborder mb-3 "
                     src="data:image/jpeg;base64,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"
                     alt="..."/>
            </div>
        </div>
    );
}