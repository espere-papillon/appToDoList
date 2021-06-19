import {authAPI, LoginDataType} from "../api/api";
import {Dispatch} from "redux";
import {SetAppErrorAT, setAppStatusAC, SetAppStatusAT, setIsInitializedAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";


const initialState = {
    isLoggedIn: false
}

export const setIsLoggedInAC = (value: boolean) => ({type: "login/SET-IS-LOGGED-IN", value} as const)

type InitialStateType = typeof initialState

type ActionType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusAT | SetAppErrorAT

export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

export const loginTC = (data: LoginDataType) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
        })
}

export const initializedAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    })
        .finally(() => {
                dispatch(setIsInitializedAC(true))
            }
        )
}