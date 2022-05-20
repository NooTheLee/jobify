import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppContext } from '../../context/appContext';
import { FormRowSelect, FormRow } from './../../component';
const AllJob = () => {

    const {
        isEditing,
        isLoading,

        position,
        company,
        jobLocation,
        jobTypeOptions,
        jobType,
        statusOptions,
        status,
        handleChange,
        cleanValues,
        createJob,
        editJob,
        editJobId,
        setCurrentPage,
    } = useAppContext();

    useEffect(() => {
        setCurrentPage(window.location.pathname);
    }, [])

    let navigate = useNavigate();

    const handleSubmit = (e) => {
        if (isEditing) {
            const currentJob = { position, company, jobLocation, jobType, status };
            // console.log(currentJob);
            editJob(editJobId, currentJob);
            navigate('/all-jobs');
            return;
        }
        createJob();
    }


    return <div className='container'>
        <div className="card-block">
            <h3 className="m-b-20 p-b-5 b-b-default f-w-600">{isEditing ? "Edit job" : "Add job"}</h3>
            <div className="row">
                <FormRow className={'col-sm-4 pb-5'}
                    name={'position'}
                    labelText={'Position'}
                    handleChange={e => handleChange(e.target.name, e.target.value)}
                    value={position}
                />
                <FormRow className={'col-sm-4'}
                    name={'company'}
                    labelText={'Company'}
                    handleChange={e => handleChange(e.target.name, e.target.value)}
                    value={company}
                />
                <FormRow className={'col-sm-4'}
                    name={'jobLocation'}
                    labelText={'Job location'}
                    handleChange={e => handleChange(e.target.name, e.target.value)}
                    value={jobLocation}
                />

                <FormRowSelect className={'col-sm-4'}
                    handleChange={e => handleChange(e.target.name, e.target.value)}
                    name={'jobType'}
                    labelText={'Job type'}
                    list={jobTypeOptions}
                    value={jobType}
                />

                <FormRowSelect className={'col-sm-4'}
                    handleChange={e => handleChange(e.target.name, e.target.value)}
                    name={'status'}
                    labelText={'Status'}
                    list={statusOptions}
                    value={status}
                />

                <div className="col-sm-4">
                    <p className="m-b-10 f-w-600">Save?</p>
                    <div className="">
                        <button className={`col-sm-5 btn btn-outline-success `} style={{ marginRight: "10px" }} onClick={handleSubmit} disabled={isLoading}> {isLoading ? "Please wait..." : "Save changes"}  </button>
                        <button className='col-sm-5 btn btn-outline-secondary' style={{ marginLeft: "10px" }} onClick={cleanValues} disabled={isLoading}> {isLoading ? "Please wait..." : "Clear"} </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
}

export default AllJob;