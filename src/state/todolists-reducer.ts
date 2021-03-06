import {FilterValuesTypes} from "../AppWithRedux";
import {todolistsAPI, TodolistType} from "../api/api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../utils/error-utils";

export type RemoveTodoListAT = ReturnType<typeof RemoveTodoListAC>

export type AddTodoListAT = ReturnType<typeof AddTodolistAC>

type ChangeTodoListTitleAT = ReturnType<typeof ChangeTodolistTitleAC>

type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    newFilter: FilterValuesTypes
    todoListID: string
}

const initialState: Array<TodolistDomainType> = []

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesTypes
    entityStatus: RequestStatusType
}

export type ActionType =
    RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListTitleAT
    | ChangeTodoListFilterAT
    | SetTodosAT
    | ReturnType<typeof changeTodolistEntityStatusAC>

export const todoListsReducer = (state = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListID)
        case "ADD-TODOLIST":
            return [{
                ...action.todilist,
                filter: "all",
                entityStatus: "idle"
            },
                ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.todoListID ? {...tl, filter: action.newFilter} : tl)
        case "SET-TODOLISTS":
            return action.todolists.map(tl => ({
                ...tl,
                filter: "all",
                entityStatus: "idle"
            }))
        case "CHANGE-TODOLIST-STATUS":
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        default:
            return state
    }
}

export const RemoveTodoListAC = (id: string) => {
    return {type: "REMOVE-TODOLIST", todoListID: id} as const
}

export const AddTodolistAC = (todilist: TodolistType) => {
    return {type: "ADD-TODOLIST", todilist} as const
}

export const ChangeTodolistTitleAC = (title: string, todoListID: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", title, todoListID} as const
}

export const ChangeTodoListFilterAC = (newFilter: FilterValuesTypes, todoListID: string): ChangeTodoListFilterAT => {
    return {type: "CHANGE-TODOLIST-FILTER", newFilter, todoListID}
}

export const setTodosAC = (todolists: Array<TodolistType>) => {
    return {type: 'SET-TODOLISTS', todolists} as const
}

export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => {
    return {type: 'CHANGE-TODOLIST-STATUS', id, entityStatus} as const
}

export type SetTodosAT = ReturnType<typeof setTodosAC>

export const fetchTodosThunk = (dispatch: Dispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodosAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
        })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(AddTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                dispatch(setAppErrorAC(res.data.messages[0]))
                dispatch(setAppStatusAC('succeeded'))
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
        })
}

export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
    dispatch(changeTodolistEntityStatusAC(id, "loading"))
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.deleteTodolist(id).then(res => {
        dispatch(RemoveTodoListAC(id))
        dispatch(setAppStatusAC('succeeded'))
    })
}

export const updateTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                const action = ChangeTodolistTitleAC(title, id)
                dispatch(action)
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((error: AxiosError) => {
                handleServerNetworkError(dispatch, error.message)
            })
    }
}