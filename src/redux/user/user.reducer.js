import {
    USER_LOADED,
    CLEAR_USER
} from './user.actions'

const INITIAL_STATE = {
    currentUser: null,
    isAuthenticated: null,
    loading: true
};

const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                currentUser: payload,
                loading: false
            };
        case CLEAR_USER:
            return {
                ...state,
                currentUser: null,
                loading: false,
            };
        default:
            return state;
    }
};
export default userReducer;
