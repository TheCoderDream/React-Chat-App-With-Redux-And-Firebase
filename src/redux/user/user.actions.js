export const USER_LOADED = "USER_LOADED";
export const CLEAR_USER = "CLEAR_USER";

export const setCurrentUser = user => ({
    type: USER_LOADED,
    payload: user
});

export const clearUser = () => ({
    type: CLEAR_USER,
});
