import CitiesList from './CitiesList';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Header({country, getCityPollution, dateFrom, dateTo, setDateFrom, setDateTo}) {
    return (
        <div className="header">
            <div className="filter">
                <label>City</label>
                <CitiesList country={country} getCityPollution={getCityPollution} />
            </div>
            <div className="filter">
                <label>From</label>
                <DatePicker name="dateFrom" selected={dateFrom} onChange={(date) => setDateFrom(date)}  maxDate={new Date()} dateFormat="dd/MM/yyyy"/>
            </div>
            <div className="filter">
                <label>To</label>
                <DatePicker name="dateTo" selected={dateTo} onChange={(date) => setDateTo(date)} maxDate={new Date()} dateFormat="dd/MM/yyyy"/>
            </div>
        </div>

    );
}

export default Header;