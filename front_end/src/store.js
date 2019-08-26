import { combineReducers, createStore } from 'redux'
import user from "./reducers/user"
import message from "./reducers/message"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2"

const reducer = combineReducers({
    user,
    message
});

const persistConfig = {
    key: "root",
    storage,
    stateReconciler: autoMergeLevel2,
    blacklist: ['message']
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);