import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT, SetTodosAT} from "./todolists-reducer";
import { Dispatch } from "redux";
import {TaskType, todolistsAPI} from "../api/api";
import {TasksStateType} from "../AppWithRedux";
import {AppRootStateType} from "./store";

type RemoveTaskActionType = {
    type: "REMOVE_TASK",
    taskID: string,
    todolistID: string,
}

type AddTaskActionType = ReturnType<typeof addTaskAC>

type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

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
                    return {...el, status: action.status}
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

export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD_TASK', task} as const
}

export const changeTaskStatusAC = (taskID: string, status: TaskStatuses, todolistID: string) => {
    return { type: "CHANGE_TASK_STATUS", taskID, status, todolistID} as const
}

export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string) => {
    return { type: "CHANGE_TASK_TITLE", taskID, title, todolistID} as const
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
            debugger
            const action = addTaskAC(res.data.data.item)
            dispatch(action)
        })
}

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            const action = removeTaskAC(taskId,todolistId)
            dispatch(action)
        })
}

export const updateTaskStatusTC = (id: string, status: TaskStatuses, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const updatedTask = tasksForCurrentTodolist.find(t => {
            return t.id === id
        })

        if (updatedTask) {
            const model = {...updatedTask, status}

            todolistsAPI.updateTask(todolistId, id, model)
                .then((res) => {
                    const action = changeTaskStatusAC(res.data.data.item.id, res.data.data.item.status, res.data.data.item.todoListId)
                    dispatch(action)
                })
        }
    }
}

export const updateTaskTitleTC = (id: string, title: string, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const updatedTask = tasksForCurrentTodolist.find(t => {
            return t.id === id
        })

        if (updatedTask) {
            const model = {...updatedTask, title}

            todolistsAPI.updateTask(todolistId, id, model)
                .then((res) => {
                    const action = changeTaskTitleAC(res.data.data.item.id, res.data.data.item.title, res.data.data.item.todoListId)
                    dispatch(action)
                })
        }
    }
}
