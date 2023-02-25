import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'

/* store to keep track of all global state
    auth: from authSlice: keep track of user and loaded state when login and logout
*/
export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    devTools: true
})

export default store