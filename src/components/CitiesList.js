import { useState } from "react";

function CitiesList({country, getCityPollution}) {
    const [cities, setCities] = useState(['Delhi','Mumbai', 'Cochin', 'Agra', 'Chennai']);
    const [city, setCity] = useState('');

    const cityPollution = (e) => {
        let citySelected = e.target.value;
        setCity(citySelected)
        getCityPollution(citySelected)
    }

    const cityElement = cities.map((cityItem, indx) => (
        <option key={`city${indx}`}>
            {cityItem}
        </option>
    ));

    return (
        <div className="cities">
            <select className="formBlock" onChange={cityPollution} value={city}>
                <option>Select City</option>
                {cityElement}
            </select>
        </div>
    );
}

export default CitiesList;