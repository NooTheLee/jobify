import { useAppContext } from "../context/appContext";
import { FormRowSelect, FormRow } from '.';
import { useEffect } from "react";
const SearchContainer = ({ className = "" }) => {
    const {
        isLoading,
        search,
        searchStatus,
        searchType,
        sort,
        sortOptions,
        statusOptions,
        jobTypeOptions,
        handleChange,
        clearFilters,
        getJobs,
    } = useAppContext()

    const handleSearch = (e) => {
        if (isLoading) return
        handleChange(e.target.name, e.target.value);
    }
    useEffect(() => {
        getJobs();
    }, [search, searchStatus, searchType, sort])
    return (<div className={"container " + className}>
        <div className="card-block">
            <div className="row">
                <FormRow className={'col-sm-4 pb-5'}
                    name={'search'}
                    labelText={'Search'}
                    handleChange={e => handleSearch(e)}
                    value={search}
                />
                <FormRowSelect className={'col-sm-4'}
                    handleChange={e => handleSearch(e)}
                    name={'searchStatus'}
                    labelText={'Status'}
                    list={['all', ...statusOptions]}
                    value={searchStatus}
                />
                <FormRowSelect className={'col-sm-4'}
                    handleChange={e => handleSearch(e)}
                    name={'searchType'}
                    labelText={'Sort'}
                    list={['all', ...jobTypeOptions]}
                    value={searchType}
                />

                <FormRowSelect className={'col-sm-4'}
                    handleChange={e => handleSearch(e)}
                    name={'sort'}
                    labelText={'Sort'}
                    list={sortOptions}
                    value={sort}
                />

                <div className="col-sm-4">
                    <p className="m-b-10 f-w-600">Clear</p>
                    <div className="">
                        <button className='col-sm-12 btn btn-outline-secondary' onClick={clearFilters} disabled={isLoading}> {isLoading ? "Please wait..." : "Clear filter"} </button>
                    </div>
                </div>
            </div>

        </div>
    </div>

    )
}
export default SearchContainer;