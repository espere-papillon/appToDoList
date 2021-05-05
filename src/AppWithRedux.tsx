import React, {useReducer, useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodoListFilterAC,
    ChangeTodolistTitleAC, RemoveTodoListAC,
    todoListsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesTypes = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesTypes
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    // BLL:
    let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)

    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    let dispatch = useDispatch()

    function getTasksForTodoList(todoList: TodoListType): Array<TaskType> {
        switch (todoList.filter) {
            case "active":
                return tasks[todoList.id].filter(t => t.isDone === false)
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone === true)
            default:
                return tasks[todoList.id]
        }
    }

    function removeTasks(taskID: string, todoListID: string) {
        dispatch(removeTaskAC(taskID, todoListID))
    }
    function addTask(title: string, todoListID: string) {
        dispatch(addTaskAC(title, todoListID))
    }
    function changeTaskStatus(taskId: string, newIsDone: boolean, todoListID: string) {
        dispatch(changeTaskStatusAC(taskId, newIsDone, todoListID))
    }
    function changeTaskTitle(taskId: string, title: string, todoListID: string) {
        dispatch(changeTaskTitleAC(taskId, title, todoListID))
    }

    function changeTodoListFilter(newFilter: FilterValuesTypes, todoListID: string) {
        dispatch(ChangeTodoListFilterAC(newFilter, todoListID))
    }
    function removeTodoList(todoListID: string) {
        dispatch(RemoveTodoListAC(todoListID))
    }
    function AddTodoList(title: string) {
        dispatch(AddTodolistAC(title))
    }
    function changeTodoListTitle(title: string, todoListID: string) {
        dispatch(ChangeTodolistTitleAC(title, todoListID))
    }

    // UI:
    const todoListComponents = todoLists.map(tl => {
        return (
            <Grid item>
                <Paper elevation={4} style={{padding: "20px"}}>
                    <ToDoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={getTasksForTodoList(tl)}
                        todoListFilter={tl.filter}
                        addTask={addTask}
                        removeTasks={removeTasks}
                        changeTodoListFilter={changeTodoListFilter}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoList
                    </Typography>
                    <Button variant={"outlined"} color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0px"}}>
                    <AddItemForm addItem={AddTodoList}/>
                </Grid>
                <Grid container={true} spacing={4}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}


export default AppWithRedux;

