import React, {useCallback, useEffect} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {AddItemForm} from "./AddItemForm";
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistTC,
    ChangeTodoListFilterAC, fetchTodosThunk, removeTodolistTC, TodolistDomainType, updateTodolistTitleTC
} from "./state/todolists-reducer";
import {
    addTaskTC,
    removeTaskTC, TaskStatuses, updateTaskStatusTC, updateTaskTitleTC
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType} from "./api/api";
import {RequestStatusType} from "./state/app-reducer";
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";
import {NavLink, Redirect, Route, Switch} from 'react-router-dom';
import {Login} from "./features/Login/Login";

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
    let todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    let status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodosThunk)
    }, [])


    const removeTasks = useCallback((taskID: string, todoListID: string) => {
        dispatch(removeTaskTC(taskID, todoListID))
    }, [])
    // const addTask = useCallback((title: string, todoListID: string) => {
    //     dispatch(addTaskAC(title, todoListID))
    // }, [dispatch])
    const addTask = useCallback(function (title: string, todolistId: string) {
        const thunk = addTaskTC(title, todolistId)
        dispatch(thunk);
    }, []);
    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todoListID: string) => {
        dispatch(updateTaskStatusTC(taskId, status, todoListID))
    }, [])
    const changeTaskTitle = useCallback((taskId: string, title: string, todoListID: string) => {
        dispatch(updateTaskTitleTC(taskId, title, todoListID))
    }, [dispatch])

    const changeTodoListFilter = useCallback((newFilter: FilterValuesTypes, todoListID: string) => {
        dispatch(ChangeTodoListFilterAC(newFilter, todoListID))
    }, [dispatch])
    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(removeTodolistTC(todoListID))
    }, [])
    const AddTodoList = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [])
    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        dispatch(updateTodolistTitleTC(todoListID, title))
    }, [])

    // UI:
    const todoListComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={4} style={{padding: "20px"}}>
                    <ToDoList
                        id={tl.id}
                        title={tl.title}
                        tasks={tasks[tl.id]}
                        todoListFilter={tl.filter}
                        entityStatus={tl.entityStatus}
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
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoList
                    </Typography>
                    <Button variant={"outlined"} color="inherit"><NavLink to={'/login'} style={{color: "white"}}>Login</NavLink></Button>
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress color="secondary"/>}
            <Container fixed>
                <Switch>
                    <Route exact path={'/'} render={() => <>
                        <Grid container style={{padding: "20px 0"}}>
                            <AddItemForm addItem={AddTodoList} entityStatus={"idle"}/>
                        </Grid>
                        <Grid container={true} spacing={4}>
                            {todoListComponents}
                        </Grid>
                    </>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'/404'} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>
            </Container>
        </div>
    );
}


export default AppWithRedux;

