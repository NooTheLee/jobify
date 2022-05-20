import { useAppContext } from "../context/appContext";
import StatItem from "./StatItem";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa'
import './StatItem.css';

const StatsContainer = () => {

    const { stats } = useAppContext();

    const defaultStats = [
        {
            title: 'Pending Applications',
            count: stats.pending || 0,
            icon: <FaSuitcaseRolling />,
            color: "#e9b949",
            bcg: "#fcefc7",
        },
        {
            title: 'Interviews Scheduled',
            count: stats.declined || 0,
            icon: <FaCalendarCheck />,
            color: "#637acb",
            bcg: "#e0e8f9",
        },
        {
            title: 'Jobs Declined',
            count: stats.interview || 0,
            icon: <FaBug />,
            color: "#d66a6a",
            bcg: "#ffeeee",
        },

    ]

    return <div className="container-fluid">
        <div className="stats-container row">
            {defaultStats.map((value, index) => {
                return <StatItem key={index} {...value} />
            })}
        </div>

    </div>
}
export default StatsContainer;