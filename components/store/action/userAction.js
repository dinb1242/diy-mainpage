import * as types from "../types/types";

export function setUserInfo(payload) {
    return {
        type: types.SET_USERINFO,
        payload
    }
}

export function deleteUserInfo() {
    return {
        type: types.DELETE_USERINFO
    }
}