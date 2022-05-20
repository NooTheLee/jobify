// @ts-nocheck
import React, { useReducer, useContext } from "react";
import reducer from './reducer';
import axios from 'axios';
import {
    CLEAR_ALERT,

    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,

    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,

    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,

    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,

    TOGGLE_SIDEBAR,
    LOGOUT,
    SHOW_ALERT,
    HANDLE_CHANGE,
    CLEAN_VALUES,

    CREATE_JOB_BEGIN,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_ERROR,

    GET_ALL_JOB_BEGIN,
    GET_ALL_JOB_SUCCESS,
    GET_ALL_JOB_ERROR,

    SET_EDIT_JOB,

    EDIT_JOB_BEGIN,
    EDIT_JOB_SUCCESS,
    EDIT_JOB_ERROR,

    SET_CURRENT_PAGE,

    DELETE_JOB_BEGIN,
    DELETE_JOB_SUCCESS,
    DELETE_JOB_ERROR,

    SHOW_STATS_BEGIN,
    SHOW_STATS_SUCCESS,

    SEARCH_BEGIN,
    SEARCH_SUCCESS,
    SEARCH_ERROR,

    CLEAR_FILTER,

    CHANGE_PAGE,
} from "./actions";

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

const initState = {
    isLoading: false,
    showAlert: false,
    alertText: "",
    alertType: "",
    currentPage: "",

    user: user ? JSON.parse(user) : null,
    token: token,
    userLocation: userLocation || "",

    showSidebar: true,

    isEditing: false,
    editJobId: '',

    position: '',
    company: '',
    jobLocation: userLocation || '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['pending', 'declined', 'interview'],
    status: 'pending',

    // stats page
    stats: {},
    monthlyApplications: [],

    //all-jobs page
    totalJobs: 0,
    numOfPage: 1,
    jobs: [],

    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],

    currentNumPage: 0,
    page: 1,
}


const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initState);
    axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;

    const authFetch = axios.create({
        baseURL: 'api/v1',
    })

    //request
    authFetch.interceptors.request.use(
        (config) => {
            //config.headers.common['Authorization'] = `Bearer ${state.token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        })

    //response
    authFetch.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response.status === 401) {

                dispatch({ type: SHOW_ALERT, alertType: 'danger', alertText: 'Login version has expired' })
                setTimeout(() => (
                    logOut()
                ), 3000)
            }
            return Promise.reject(error);
        })

    const showAlert = (alertType, alertText) => {

        dispatch({ type: SHOW_ALERT, alertType: alertType, alertText: alertText })
        clearAlert();
    }
    const clearAlert = () => {
        setTimeout(() => {

            dispatch({ type: CLEAR_ALERT })
        }, 3000)
    };
    const displayAlert = (alertType) => {

        dispatch({ type: alertType });
        clearAlert();
    };

    const addUserToLocalStorage = ({ user, token, location }) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        localStorage.setItem('location', location)
    }

    const removeUserToLocalStorage = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('location')
    }

    const registerUser = async (currentUser) => {

        dispatch({ type: REGISTER_USER_BEGIN })
        try {
            const response = await axios.post('api/v1/auth/register', currentUser)
            const { user, token, location } = response.data;

            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: { user, token, location },
            })
            // addUserToLocalStorage({ user, token, location })
            clearAlert();
        } catch (err) {

            dispatch({
                type: REGISTER_USER_ERROR,
                payload: { msg: err.response.data.msg }
            })
            clearAlert();
        }
    }

    const loginUser = async (currentUser) => {

        dispatch({ type: LOGIN_USER_BEGIN })
        try {
            const response = await axios.post('api/v1/auth/login', currentUser)
            const { user, token, location } = response.data;

            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: { user, token, location },
            })
            addUserToLocalStorage({ user, token, location })
            clearAlert();
        } catch (err) {

            dispatch({
                type: LOGIN_USER_ERROR,
                payload: { msg: err.response.data.msg }
            })
            clearAlert();
        }
    }

    const setupUser = async ({ currentUser, endPoint, alertText }) => {

        dispatch({ type: SETUP_USER_BEGIN })
        try {
            const response = await axios.post(`api/v1/auth/${endPoint}`, currentUser)
            const { user, token, location } = response.data;

            dispatch({
                type: SETUP_USER_SUCCESS,
                payload: { user, token, location, alertText },
            })
            addUserToLocalStorage({ user, token, location })
            clearAlert();
        } catch (err) {

            dispatch({
                type: LOGIN_USER_ERROR,
                payload: { msg: err.response.data.msg }
            })
            clearAlert();
        }
    }

    const toggleSidebar = () => {

        dispatch({ type: TOGGLE_SIDEBAR })
    }

    const updateUser = async (currentUser) => {

        dispatch({ type: UPDATE_USER_BEGIN })
        try {
            const { data } = await authFetch.patch('/auth/update', currentUser);
            const { user, location, token } = data;

            dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, location, token } })
            addUserToLocalStorage({ user, location, token })
        } catch (error) {
            if (error.response.status !== 401) {

                dispatch({ type: UPDATE_USER_ERROR, payload: { msg: error.response.data.msg } })
            }


        }
        clearAlert();
    }

    const logOut = () => {

        dispatch({ type: LOGOUT });
        removeUserToLocalStorage();
    }

    const handleChange = (stateName, value) => {

        dispatch({
            type: HANDLE_CHANGE,
            payload: { stateName, value }
        })
    }

    const cleanValues = () => {

        dispatch({ type: CLEAN_VALUES })
    }

    const createJob = async () => {

        dispatch({ type: CREATE_JOB_BEGIN })
        try {
            const { position, company, jobLocation, jobType, status } = state;
            // == 
            // const position = state.position;
            // const company = state.company;
            // ...

            await authFetch.post('/jobs', {
                position,
                company,
                jobLocation,
                jobType,
                status,
            })

            dispatch({ type: CREATE_JOB_SUCCESS })

            dispatch({ type: CLEAN_VALUES })

        } catch (error) {
            if (error.response.status === 401) return;

            dispatch({ type: CREATE_JOB_ERROR, payload: { msg: error.response.data.msg } })

        }
        clearAlert();
    }

    const getAllJobs = async () => {

        dispatch({ type: GET_ALL_JOB_BEGIN })
        try {
            const jobs = await authFetch.get('/jobs');

            dispatch({
                type: GET_ALL_JOB_SUCCESS,
                payload: jobs.data
            })
        } catch (error) {
            if (error.response.status === 401) return;

            dispatch({ type: GET_ALL_JOB_ERROR, payload: { msg: error.response.data.msg } })
        }
    }

    const setEditJob = ({ id }) => {

        dispatch({ type: SET_EDIT_JOB, payload: { id } })
    }
    const editJob = async (id, currentJob) => {

        dispatch({ type: EDIT_JOB_BEGIN })
        try {
            await authFetch.patch(`/jobs/${id}`, currentJob);
            //const { position, company, jobLocation, jobType, status } = data;
            //payload: { position, company, jobLocation, jobType, status }

            dispatch({ type: EDIT_JOB_SUCCESS })
        } catch (error) {
            if (error.response.status !== 401) {

                dispatch({ type: EDIT_JOB_ERROR, payload: { msg: error.response.data.msg } })
            }
            logOut();
        }
        clearAlert();
    }

    const deleteJob = async ({ id }) => {

        dispatch({ type: DELETE_JOB_BEGIN })
        try {
            const data = await authFetch.delete(`/jobs/${id}`);

            dispatch({ type: DELETE_JOB_SUCCESS, payload: { msg: data.data.msg } })
            getAllJobs();
            //dispatch({ type: DELETE_JOB_SUCCESS, payload: { msg: "Delete success" } })
        } catch (error) {
            if (error.response.status !== 401) {

                dispatch({ type: DELETE_JOB_ERROR, payload: { msg: error.response.data.msg } })
            }
        }
        clearAlert();
    }

    const setCurrentPage = (currentPage) => {

        dispatch({ type: SET_CURRENT_PAGE, payload: { currentPage } })
    }

    const showStats = async () => {

        dispatch({ type: SHOW_STATS_BEGIN })
        try {
            const { data } = await authFetch.get('/jobs/stats');

            dispatch({
                type: SHOW_STATS_SUCCESS,
                payload: {
                    stats: data.defaultStats,
                    monthlyApplications: data.monthlyApplications,
                }
            });
        } catch (error) {
            logOut();
        }
    }

    const clearFilters = () => {

        dispatch({ type: CLEAR_FILTER })
    }

    const getJobs = async (page = 1) => {
        const {
            search,
            searchStatus,
            searchType,
            sort } = state

        let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
        if (search) {
            url += `&search=${search}`;
        }

        dispatch({ type: SEARCH_BEGIN })
        try {
            const { data } = await authFetch.get(url);

            dispatch({ type: SEARCH_SUCCESS, payload: data })

        } catch (error) {

            dispatch({ type: SEARCH_ERROR })
            logOut();
        }
    }

    const changePage = (page) => {
        dispatch({ type: CHANGE_PAGE, payload: { page: page } })
        getJobs(page)
    }


    return <AppContext.Provider
        value={{
            ...state,
            displayAlert,
            registerUser,
            loginUser,
            setupUser,
            toggleSidebar,
            removeUserToLocalStorage,
            updateUser,
            logOut,
            showAlert,
            handleChange,
            cleanValues,
            createJob,
            getAllJobs,
            editJob,
            deleteJob,
            setEditJob,
            setCurrentPage,
            showStats,
            clearFilters,
            getJobs,
            changePage,
        }}>
        {children}
    </AppContext.Provider>
}

const useAppContext = () => {
    return useContext(AppContext)
};

export { AppProvider, initState, useAppContext }

