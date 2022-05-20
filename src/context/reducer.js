import {
    ALERT_DANGER,
    ALERT_SUCCESS,
    CLEAR_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,

    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,

    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,

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

const reducer = (state, action) => {
    switch (action.type) {
        case ALERT_DANGER: return { ...state, showAlert: true, alertType: "danger", alertText: 'Please provider all values!' }

        case ALERT_SUCCESS: return { ...state, showAlert: true, alertType: "success", alertText: "Success!" }

        case SHOW_ALERT: return { ...state, showAlert: false, alertType: action.alertType, alertText: action.alertText }

        case CLEAR_ALERT: return { ...state, showAlert: false, alertType: '', alertText: "" }

        case REGISTER_USER_BEGIN: {
            return { ...state, isLoading: true }
        }

        case REGISTER_USER_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                token: action.payload.token,
                user: action.payload.user,
                userLocation: action.payload.location,
                jobLocation: action.payload.location,
                showAlert: true,
                alertType: 'success',
                alertText: 'User Created! Redirecting...',
            }
        }

        case REGISTER_USER_ERROR: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg,
            }
        }

        case LOGIN_USER_BEGIN: {
            return { ...state, isLoading: true }
        }

        case LOGIN_USER_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                token: action.payload.token,
                user: action.payload.user,
                userLocation: action.payload.location,
                jobLocation: action.payload.location,
                showAlert: true,
                alertType: 'success',
                alertText: 'Login successful! Redirecting...',
            }
        }

        case LOGIN_USER_ERROR: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg,
            }
        }

        case SETUP_USER_BEGIN: {
            return { ...state, isLoading: true }
        }

        case SETUP_USER_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                token: action.payload.token,
                user: action.payload.user,
                userLocation: action.payload.location,
                jobLocation: action.payload.location,
                showAlert: true,
                alertType: 'success',
                alertText: action.payload.alertText,
            }
        }

        case SETUP_USER_ERROR: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg,
            }
        }

        case UPDATE_USER_BEGIN: {
            return { ...state, isLoading: true }
        }

        case UPDATE_USER_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                token: action.payload.token,
                user: action.payload.user,
                userLocation: action.payload.location,
                jobLocation: action.payload.location,
                showAlert: true,
                alertType: 'success',
                alertText: 'User Profile Updated',
            }
        }

        case UPDATE_USER_ERROR: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg,
            }
        }
        case TOGGLE_SIDEBAR: {
            return {
                ...state,
                showSidebar: !state.showSidebar,
            }
        }
        case LOGOUT: {
            return {
                ...state,
                user: null,
                userLocation: null,
                token: null,
            }
        }

        case HANDLE_CHANGE: {
            return {
                ...state,
                [action.payload.stateName]: action.payload.value,
                page: 1
            }
        }

        case CLEAN_VALUES: {
            const initialState = {
                isEditing: false,
                editJobId: '',
                position: '',
                company: '',
                jobLocation: state.userLocation || '',
                jobType: 'full-time',
                status: 'pending',
            }
            return {
                ...state,
                ...initialState
            }
        }

        case CREATE_JOB_BEGIN: {
            return { ...state, isLoading: true }
        }

        case CREATE_JOB_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'success',
                alertText: 'New job create',
            }
        }

        case CREATE_JOB_ERROR: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg,
            }
        }
        case GET_ALL_JOB_BEGIN: {
            return { ...state, isLoading: true }
        }

        case GET_ALL_JOB_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                jobs: action.payload.jobs,
                totalJobs: action.payload.totalJobs,
                numOfPage: action.payload.numOfPage,
            }
        }

        case GET_ALL_JOB_ERROR: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg,
            }
        }

        case SET_EDIT_JOB: {
            const job = state.jobs.find((job) => job._id === action.payload.id)
            const { _id,
                position,
                company,
                jobLocation,
                jobType,
                status,
            } = job

            return {
                ...state,
                isEditing: true,
                editJobId: _id,
                position,
                company,
                jobLocation,
                jobType,
                status,
            }
        }

        case EDIT_JOB_BEGIN: {
            return { ...state, isLoading: true }
        }

        case EDIT_JOB_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                isEditing: false,

                editJobId: '',
                position: '',
                company: '',
                jobLocation: state.userLocation || '',
                jobType: 'full-time',
                status: 'pending',
            }
        }

        case EDIT_JOB_ERROR: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg,
            }
        }

        case DELETE_JOB_BEGIN: {
            return { ...state, isLoading: true }
        }

        case DELETE_JOB_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertText: action.payload.msg,
                alertType: 'success',
            }
        }

        case DELETE_JOB_ERROR: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg,
            }
        }

        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.payload.currentPage }
        }

        case SHOW_STATS_BEGIN: {
            return { ...state, isLoading: true }
        }

        case SHOW_STATS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                stats: action.payload.stats,
                monthlyApplications: action.payload.monthlyApplications,
            }
        }

        case SEARCH_BEGIN: {
            return { ...state, isLoading: true }
        }

        case SEARCH_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                jobs: action.payload.jobs,
                totalJobs: action.payload.totalJobs,
                numOfPage: action.payload.numOfPage,
            }
        }

        case SEARCH_ERROR: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg,
            }
        }

        case CLEAR_FILTER: {
            return {
                ...state,
                search: '',
                searchStatus: 'all',
                searchType: 'all',
                sort: 'latest',
            }
        }


        case CHANGE_PAGE: {
            return {
                ...state,
                page: action.payload.page
            }
        }

        default: throw new Error(`No such action: ${action.type}`)
    }
}

export default reducer;