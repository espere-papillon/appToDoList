import {FilterValuesTypes, TodoListType} from "../App";
import {v1} from "uuid";

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

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export  const todoListsReducer = (todoLists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todoListID)
        case "ADD-TODOLIST":
            const newTodoListID = v1()
            const newTodoList: TodoListType = {
                id: action.id, title: action.title, filter: "all"
            }
            return [...todoLists, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, filter: action.newFilter} : tl)
        default:
            return todoLists
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

export const ChangeTodoListFilter = (newFilter: FilterValuesTypes, todoListID: string): ChangeTodoListFilterAT => {
    return { type: "CHANGE-TODOLIST-FILTER", newFilter, todoListID}
}
