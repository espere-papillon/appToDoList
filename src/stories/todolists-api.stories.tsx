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

type TLType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<T> = {
    data: {
        item: T
    },
    resultCode: number,
    messages: Array<string>
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
       instance.get<Array<TLType>>("todo-lists")
        .then(res => {setState(res.data)})

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        instance.post<ResponseType<TLType>>("todo-lists", {title: "React///"})
            .then(res => {
                setState(res.data.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const tlId = "2033546a-d771-4a4e-97ca-2d526cc0cca7"
        instance.delete<ResponseType<{}>>(`todo-lists/${tlId}`, {})
            .then(res => {setState(res.data)})
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const tlId = "280f7a3c-7d6d-4b56-8032-b7412ad3c9a6"
        instance.put<ResponseType<{}>>(`todo-lists/${tlId}`, {title: "ReactReact"})
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

