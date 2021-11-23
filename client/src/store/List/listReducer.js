import { ADD_ELEM, UPDATE_ELEMS, UPDATE_ELEM, REMOVE_ELEM, UPDATE_LIST } from "./constants"

const defaulteState = {
    id: Date.now(),
    elems: [],
}

export const listReducer = (state = defaulteState, action) => {
    switch (action.type) {
        case ADD_ELEM:
            return { ...state, elems: [...state.elems, action.payload] }

        case UPDATE_ELEMS:
            return { ...state, elems: action.payload }

        case UPDATE_LIST:
            return {
                ...state,
                ...action.payload
            }

        case UPDATE_ELEM:
            return {
                ...state, elems: state.elems.filter(elem => {
                    if (elem.id === action.payload.id) {
                        elem = action.payload
                    }
                    return state.elems;
                })
            }

        case REMOVE_ELEM:
            return { ...state, elems: state.elems.filter(elem => elem.id !== action.payload) }

        default:
            return state;
    }
}
