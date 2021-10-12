import * as types from "../types/types";

const initialState = {
    seq: "",
    username: "",
    name: "",
    isLogined: false,
    isAdmin: false,
    adminMode: false,
    logId: ""
}

function userReducer(state = initialState, { type, payload }) {
    switch (type) {
        case types.SET_USERINFO:
            return {
                ...state,
                seq: payload.seq,
                username: payload.username,
                name: payload.name,
                isLogined: payload.isLogined,
                isAdmin: payload.isAdmin,
                logId: payload.logId
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

export default userReducer;