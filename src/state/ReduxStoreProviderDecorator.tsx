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
    todolists: [] as Array<TodolistDomainType>,
    tasks: {} as TasksStateType
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}