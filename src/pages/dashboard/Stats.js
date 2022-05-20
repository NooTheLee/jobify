import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { StatsContainer, ChartsContainer, Loading } from '../../component/index.js';

const Stats = () => {
    const {
        showStats,
        isLoading,
        monthlyApplications,
    } = useAppContext();

    useEffect(() => {
        showStats();
    }, [])

    if (isLoading) {
        return <Loading speed={4} />
    }

    return <div className="stats">
        <StatsContainer />
        {monthlyApplications.length > 0 && <ChartsContainer />}

    </div>
}

export default Stats;