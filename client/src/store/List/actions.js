import { ADD_ELEM, UPDATE_ELEMS, UPDATE_ELEM, REMOVE_ELEM} from "./constants"

export const addElemAction = (payload) => ({ type: ADD_ELEM, payload });
export const updateElemAction = (payload) => ({ type: UPDATE_ELEM, payload });
export const updateElemsAction = (payload) => ({ type: UPDATE_ELEMS, payload });
export const removeElemAction = (payload) => ({ type: REMOVE_ELEM, payload });