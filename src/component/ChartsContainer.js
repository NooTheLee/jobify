import AreaChart from "./AreaChart";
import BarCharts from "./BarCharts";
import { useState } from 'react'
import { useAppContext } from './../context/appContext.js';

const ChartsContainer = () => {

    const [barChart, setBarChart] = useState(true);

    const { monthlyApplications: data } = useAppContext();


    return <div>
        <h4>Monthly application</h4>
        <button type="button"
            className="btn btn-outline-success"
            onClick={() => { setBarChart(!barChart) }}>
            Change type chart
        </button>
        {barChart ? <BarCharts data={data} /> : <AreaChart data={data} />}

    </div>
}
export default ChartsContainer;
