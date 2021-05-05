import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";

type RemoveTaskActionType = {
    type: "REMOVE_TASK",
    taskID: string,
    todolistID: string,
}

type AddTaskActionType = {
    type: "ADD_TASK",
    title: string,
    todolistID: string,
}

type ChangeTaskStatusActionType = {
    type: "CHANGE_TASK_STATUS",
    taskID: string,
    isDone: boolean,
    todolistID: string,
}

type ChangeTaskTitleActionType = {
    type: "CHANGE_TASK_TITLE",
    taskID: string,
    title: string,
    todolistID: string,
}

const initialState: TasksStateType = {

}

export type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListAT
    | RemoveTodoListAT

export  const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE_TASK": {
            let copyState = {...state}
            copyState[action.todolistID] = copyState[action.todolistID].filter(task => task.id !== action.taskID)
            return copyState
        }
        case "ADD_TASK": {
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            };
            return {...state, [action.todolistID]: [newTask, ...state[action.todolistID]]}
        }
        case "CHANGE_TASK_STATUS": {
            let copyState = {...state}
            let updateTasks = copyState[action.todolistID].map(el => {
                if (el.id === action.taskID) {
                    return {...el, isDone: action.isDone}
                }
                return el
            })
            return {...state, [action.todolistID]: updateTasks}
        }
        case "CHANGE_TASK_TITLE": {
            let copyState = {...state}
            let updateTasks = copyState[action.todolistID].map(el => {
                if (el.id === action.taskID) {
                    return {...el, title: action.title}
                }
                return el
            })
            return {...state, [action.todolistID]: updateTasks}
        }
        case "ADD-TODOLIST": {
            return {...state, [action.id]: []}
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.todoListID]
            return copyState
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todolistID: string): RemoveTaskActionType => {
    return { type: "REMOVE_TASK", taskID, todolistID}
}

export const addTaskAC = (title: string, todolistID: string): AddTaskActionType => {
    return { type: "ADD_TASK", title, todolistID}
}

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistID: string): ChangeTaskStatusActionType => {
    return { type: "CHANGE_TASK_STATUS", taskID, isDone, todolistID}
}

export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string): ChangeTaskTitleActionType => {
    return { type: "CHANGE_TASK_TITLE", taskID, title, todolistID}
}