// Combine Reducer
import { combineReducers } from "redux";
import user from "./userReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"]
}

const rootReducer = combineReducers({
    user
})

export default persistReducer(persistConfig, rootReducer);