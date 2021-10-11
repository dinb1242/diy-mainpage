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

export function changeUsermode(payload) {
    console.log("===>Change Usermode");
    console.log(payload);
    return {
        type: types.CHANGE_USERMODE,
        payload
    }
}