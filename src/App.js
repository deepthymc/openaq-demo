import './App.css';
import Header from './components/Header';
import PollutionDetails from './components/PollutionDetails';
import {useEffect, useState, useCallback, useMemo} from "react";
import axios from 'axios';

function App() {
    const [country, setCountry] = useState('IN');
    const [city, setCity] = useState('');
    const [loader, setLoader] = useState(false);
    const [dateFrom, setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(new Date());
    const [pollution, setPollution] = useState([]);
    const [error, setError] = useState('');

    const getCityPollution = (city) => {
        setCity(city);
    }
    const apiUrl = useMemo(() => {
        return `https://api.openaq.org/v2/measurements?date_from=${dateFrom.toISOString()}&date_to=${dateTo.toISOString()}&limit=100&page=1&offset=0&sort=desc&radius=1000&country=${country}&city=${city}&order_by=datetime`;
    }, [country, city, dateFrom, dateTo]);

    const cityPollution = useCallback(() => {
        setLoader(true);
        axios.get(apiUrl).then(response => {
            setLoader(false);
            setError('');
            setPollution(response.data.results);
        }).catch(error => {
            setLoader(false);
            setError('Error fetching pollution data');
        })
    }, [apiUrl]);

    useEffect(() => {
        if(city !== '') {
            cityPollution();
        }
    }, [city, dateFrom, dateTo, cityPollution]);

    return (
        <div className="main-wrapper">
            <div className="title">Pollution in Your City</div>
            <Header
                country={country}
                dateFrom={dateFrom}
                dateTo={dateTo}
                getCityPollution={getCityPollution}
                setDateFrom={setDateFrom}
                setDateTo={setDateTo}
            />
            {loader ?
                <div className="info">Loading...</div>
                :
                <PollutionDetails pollution={pollution} error={error}/>
            }
        </div>
    );
}

export default App;