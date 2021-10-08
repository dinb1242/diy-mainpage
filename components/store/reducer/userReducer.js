import * as types from "../types/types";

const initialState = {
    username: "",
    name: "",
    isLogined: false
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case types.SET_USERINFO:
            return {
                ...state,
                username: payload.username,
                name: payload.name,
                isLogined: payload.isLogined
            }

        default:
            return state
    }
}
