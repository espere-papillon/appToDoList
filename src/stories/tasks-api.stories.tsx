import React, {useEffect, useState} from 'react'
import axios from "axios";

export default {
    title: 'API'
}

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "2915ec48-57be-426d-903d-1c83b1420c90"
    }
})

type TaskType = {
    id: string
    addedDate: string
    order: number
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
    todoListId: string
}

type GetType = {
    items: Array<TaskType>
    totalCount: number
    error: string
}

type ResponseType<T> = {
    data: {
        item: T
    }
    resultCode: number
    messages: Array<string>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        const tlId = "280f7a3c-7d6d-4b56-8032-b7412ad3c9a6"
        instance.get<GetType>(`todo-lists/${tlId}/tasks`)
        .then(res => {setState(res.data.items)})

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const tlId = "280f7a3c-7d6d-4b56-8032-b7412ad3c9a6"
        instance.post<ResponseType<TaskType>>(`todo-lists/${tlId}/tasks`,
            {
                title: "string",
                description: "string",
                completed: true,
                status: 3,
                priority: 1,
                startDate: "06/03/2021",
                deadline: "06/10/2021",
            })
            .then(res => {
                setState(res.data.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const tlId = "280f7a3c-7d6d-4b56-8032-b7412ad3c9a6"
        const taskId = "c7921913-fecd-4775-a15b-1aea0eb422a7"
        instance.delete<ResponseType<{}>>(`todo-lists/${tlId}/tasks/${taskId}`, {})
            .then(res => {setState(res.data)})
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const tlId = "280f7a3c-7d6d-4b56-8032-b7412ad3c9a6"
        const taskId = "ed64ae06-cb72-4119-8a44-2c305af51215"
        instance.put<ResponseType<{}>>(`todo-lists/${tlId}/tasks/${taskId}`, {title: "ReactReact"})
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

