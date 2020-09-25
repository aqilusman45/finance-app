import {configureStore} from '@reduxjs/toolkit'
import manageProductReducer from './../Feature/ManageProductSlice/ManageProductSlice'

export const store=configureStore({
    reducer:{
        productData:manageProductReducer
    },
})