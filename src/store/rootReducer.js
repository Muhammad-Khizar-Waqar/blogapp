import { combineReducers } from "@reduxjs/toolkit"
import authSlice from "./feature/authSlice"

const rootReducer = combineReducers({
	auth: authSlice,
})

export default rootReducer
