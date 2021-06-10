import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT, SetTodosAT} from "./todolists-reducer";
import { Dispatch } from "redux";
import {TaskType, todolistsAPI} from "../api/api";
import {TasksStateType} from "../AppWithRedux";

type RemoveTaskActionType = {
    type: "REMOVE_TASK",
    taskID: string,
    todolistID: string,
}

type AddTaskActionType = {
    type: "ADD_TASK",
    task: TaskType
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
    | SetTodosAT
    | SetTasksActionType

export  const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE_TASK": {
            let copyState = {...state}
            copyState[action.todolistID] = copyState[action.todolistID].filter(task => task.id !== action.taskID)
            return copyState
        }
        case "ADD_TASK": {
            // const newTask: TaskType = {
            //     id: v1(),
            //     title: action.title,
            //     isDone: false
            // };
            // return {...state, [action.todolistID]: [newTask, ...state[action.todolistID]]}
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
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
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todolists.forEach(tl => {copyState[tl.id] = []})
            return copyState
        }
        case "SET-TASKS": {
            const copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todolistID: string): RemoveTaskActionType => {
    return { type: "REMOVE_TASK", taskID, todolistID}
}

// export const addTaskAC = (title: string, todolistID: string): AddTaskActionType => {
//     return { type: "ADD_TASK", title, todolistID}
// }
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistID: string): ChangeTaskStatusActionType => {
    return { type: "CHANGE_TASK_STATUS", taskID, isDone, todolistID}
}

export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string): ChangeTaskTitleActionType => {
    return { type: "CHANGE_TASK_TITLE", taskID, title, todolistID}
}

export type SetTasksActionType = ReturnType<typeof setTasksAC>

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
    return {type: 'SET-TASKS', tasks, todolistId} as const
}

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                const action = setTasksAC(tasks, todolistId)
                dispatch(action)
            })
    }
}

export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            const action = addTaskAC(res.data.data.item)
            dispatch(action)
        })
}
