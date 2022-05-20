import './Job.css'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa'
import moment from 'moment';
import { useAppContext } from '../context/appContext';
import { Link } from 'react-router-dom';

const Job = ({ typeDay, position, company, status, jobType, jobLocation, createdAt, _id }) => {
    let date = moment(createdAt).format('MMM Do, YYYY');
    const {
        deleteJob,
        setEditJob,
    } = useAppContext();
    return (
        <div className="col-lg-4">
            <div className="card card-margin">
                <div className="card-header no-border">
                    <h5 className="card-title">{position}</h5>
                </div>
                <div className="card-body pt-0">
                    <div className="widget-49">
                        <div className="widget-49-title-wrapper">
                            <div className={`widget-49-date-${typeDay}`}>
                                <span className="widget-49-date-day">{position[0]}</span>
                            </div>
                            <div className="widget-49-meeting-info">
                                <span className="widget-49-pro-title">{company}</span>
                                <span className="widget-49-meeting-time">{date}</span>
                            </div>
                        </div>
                        <ol className="widget-49-meeting-points">
                            <li className="widget-49-meeting-item">
                                <FaLocationArrow color='black' size={"18px"} />
                                <span>{jobLocation}</span></li>
                            <li className="widget-49-meeting-item float-right">
                                <FaBriefcase color='black' size={"18px"} />
                                <span>{jobType}</span></li>
                            <li className="widget-49-meeting-item">
                                <FaCalendarAlt color='black' size={"18px"} />
                                <span>{status}</span>
                            </li>
                        </ol>
                        <div className="d-flex">
                            <Link to={'/add-job'} className="btn btn-outline-success"
                                style={{ marginRight: "5px" }}
                                onClick={() => {
                                    setEditJob({ id: _id });
                                }}
                            >Edit</Link>
                            <button className="btn btn-outline-danger"
                                onClick={() => {
                                    deleteJob({ id: _id })
                                }}
                            >Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Job;