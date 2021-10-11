import * as types from "../types/types";

const initialState = {
    username: "",
    name: "",
    isLogined: false,
    isAdmin: false,
    adminMode: false
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case types.SET_USERINFO:
            return {
                ...state,
                username: payload.username,
                name: payload.name,
                isLogined: payload.isLogined,
                isAdmin: payload.isAdmin
            }

        case types.DELETE_USERINFO:
            return initialState;

        case types.CHANGE_USERMODE:
            return {
                ...state,
                adminMode: payload.adminMode
            }

        default:
            return state
    }
}
