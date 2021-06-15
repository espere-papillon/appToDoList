import {setAppErrorAC, SetAppErrorAT, setAppStatusAC, SetAppStatusAT} from "../state/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/api";

export const handleServerNetworkError = (dispatch: Dispatch<ServerErrorAT>, message: string) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC('failed'))
}

export const handleServerAppError = <T>(dispatch: Dispatch<ServerErrorAT>, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Error'))
    }
    dispatch(setAppStatusAC('failed'))
}

type ServerErrorAT = SetAppStatusAT | SetAppErrorAT