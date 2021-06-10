import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType, store} from "./store";
import {combineReducers, createStore} from "redux";
import {TodolistDomainType, todoListsReducer} from "./todolists-reducer";
import { tasksReducer } from "./tasks-reducer";
import {v1} from "uuid";
import {TasksStateType, TodoListType} from "../AppWithRedux";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer
})

const initialGlobalState = {
    todolists: [
        // {id: "todolistId1", title: "What to learn", filter: "all"},
        // {id: "todolistId2", title: "What to buy", filter: "all"}
    ] as Array<TodolistDomainType>,
    tasks: {
        // ["todolistId1"]: [
        //     {id: v1(), title: "HTML&CSS", isDone: true},
        //     {id: v1(), title: "JS", isDone: true}
        // ],
        // ["todolistId2"]: [
        //     {id: v1(), title: "Milk", isDone: true},
        //     {id: v1(), title: "React Book", isDone: true}
        // ]
    } as TasksStateType
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}