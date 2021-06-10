import {FilterValuesTypes, TodoListType} from "../AppWithRedux";
import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../api/api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    todoListID: string
}

export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string,
    id: string,
}

type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    todoListID: string
}

type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    newFilter: FilterValuesTypes
    todoListID: string
}

const initialState: Array<TodolistDomainType> = [

]

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesTypes
}

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT | SetTodosAT

export  const todoListsReducer = (state = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListID)
        case "ADD-TODOLIST":
            return [{
                id: action.id,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.todoListID ? {...tl, filter: action.newFilter} : tl)
        case "SET-TODOLISTS":
            return action.todolists.map(tl => ({
                ...tl,
                filter: "all"
            }))
        default:
            return state
    }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => {
    return {type: "REMOVE-TODOLIST", todoListID: id}
}

export const AddTodolistAC = (title: string): AddTodoListAT => {
    return {type: "ADD-TODOLIST", title, id: v1()}
}

export const ChangeTodolistTitleAC = (title: string, todoListID: string): ChangeTodoListTitleAT => {
    return { type: "CHANGE-TODOLIST-TITLE", title, todoListID}
}

export const ChangeTodoListFilterAC = (newFilter: FilterValuesTypes, todoListID: string): ChangeTodoListFilterAT => {
    return { type: "CHANGE-TODOLIST-FILTER", newFilter, todoListID}
}

export const setTodosAC = (todolists: Array<TodolistType>) => {
    return {type: 'SET-TODOLISTS', todolists} as const
}

export type SetTodosAT = ReturnType<typeof setTodosAC>

export const fetchTodosThunk = (dispatch: Dispatch, getState: () => AppRootStateType) => {
    todolistsAPI.getTodolists().then(res => {
        dispatch(setTodosAC(res.data))
    })
}