import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Loading from "./Loading";
import Job from './Job.js'
import Pagination from "./Pagination";
const JobsContainer = ({ className = "" }) => {

    const {
        jobs,
        totalJobs,
        numOfPage,
        isLoading,
        getAllJobs,
    } = useAppContext();

    useEffect(() => {
        getAllJobs();
    }, [])

    if (isLoading) {
        return <Loading speed={5} />
    }
    else if (jobs.length === 0) {
        return (
            <div>
                <h1>
                    No jobs to display...
                </h1>
            </div>
        )
    }
    const type = ['primary', 'success', 'danger', 'warning', 'info', 'dark']
    return (
        <div className={"row " + className}>
            <h6>
                {totalJobs} job{jobs.length > 1 && 's'} found
            </h6>
            {jobs.map((value) => {
                return (<Job
                    typeDay={type[Math.floor(Math.random() * type.length)]}
                    key={value._id}
                    {...value}
                />)
            })}
            {numOfPage > 1 && <Pagination />}
        </div>
    )
}
export default JobsContainer;