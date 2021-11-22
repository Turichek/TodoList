import { SET_AUTH_VALUES, SET_ISAUTHENTICATED } from "./constants";

const defaulteState = {
    token: null,
    usedId: null,
    isAuthenticated: false
}

export const authReducer = (state = defaulteState, action) => {
    switch (action.type) {
        case SET_AUTH_VALUES:
            return {
                ...state,
                ...action.payload
            }

        case SET_ISAUTHENTICATED:
            return {
                ...state,
                isAuthenticated: action.payload,
            }

        default:
            return state;
    }
}