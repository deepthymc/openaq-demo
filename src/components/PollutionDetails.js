import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function PollutionDetails({pollution, error}) {
    const dateFormatter = (date) => {
        let dt = new Date(date);
        return dt.getDate() + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear() + ' ' + dt.getHours() + ':' + dt.getMinutes();
    }

    const pollutionData = pollution.map(({ date: { local }, value }) => ({
        time: dateFormatter(local),
        pm25: value,
    }));

    return (
        <div className='pollution-details'>

            {pollutionData.length === 0 ?
                <div className='info'>{error || 'No data'}</div>
                :
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                        data={pollutionData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="time" />
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Line type="monotone" dataKey="pm25" stroke="#8884d8" strokeWidth={2}/>
                    </LineChart>
                </ResponsiveContainer>
            }
        </div>

    );
}

export default PollutionDetails;