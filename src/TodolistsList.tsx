import {FilterValuesTypes, TasksStateType} from "./AppWithRedux";
import {TaskStatuses} from "./api/api";
import {fetchTodosThunk, TodolistDomainType} from "./state/todolists-reducer";
import {Grid, Paper} from "@material-ui/core";
import {ToDoList} from "./ToDoList";
import React, {useEffect} from "react";
import {AddItemForm} from "./AddItemForm";
import {Redirect, Route} from "react-router-dom";
import {Login} from "./features/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


type PropsType = {
    todoLists: Array<TodolistDomainType>
    tasks: TasksStateType
    addTask: (title: string, todoListID: string) => void
    removeTasks: (taskID: string, todoListID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesTypes, todoListID: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
    AddTodoList: (title: string) => void
}

export const TodolistsList = (props: PropsType) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodosThunk)
    }, [])

    const todoListComponents = props.todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={4} style={{padding: "20px"}}>
                    <ToDoList
                        id={tl.id}
                        title={tl.title}
                        tasks={props.tasks[tl.id]}
                        todoListFilter={tl.filter}
                        entityStatus={tl.entityStatus}
                        addTask={props.addTask}
                        removeTasks={props.removeTasks}
                        changeTodoListFilter={props.changeTodoListFilter}
                        changeTaskStatus={props.changeTaskStatus}
                        removeTodoList={props.removeTodoList}
                        changeTaskTitle={props.changeTaskTitle}
                        changeTodoListTitle={props.changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    if (!isLoggedIn) {
        return <>
            <Redirect to={'/login'}/></>
    }
    return <>
        <Grid container style={{padding: "20px 0"}}>
            <AddItemForm addItem={props.AddTodoList} entityStatus={"idle"}/>
        </Grid>
        <Grid container={true} spacing={4}>
            {todoListComponents}
        </Grid>
    </>
}