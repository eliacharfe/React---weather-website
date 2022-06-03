import './App.css';
import Menu from "./components/Menu";
import FormHandle from "./components/FormHandle";
import Forecast from "./components/Forecast";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function Home() {
    return (
        <FormHandle/>
    )
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Menu/>}>
                    <Route index element={<Home/>}/>
                    <Route path="forecast" element={<Forecast/>}/>
                    <Route path="form" element={<FormHandle/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
