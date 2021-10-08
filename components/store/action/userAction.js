import * as types from "../types/types";

export function setUserInfo(payload) {
    console.log(payload);
    return {
        type: types.SET_USERINFO,
        payload
    }
}