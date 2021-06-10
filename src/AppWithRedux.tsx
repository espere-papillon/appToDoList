import React, {useCallback, useEffect} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodoListFilterAC,
    ChangeTodolistTitleAC, fetchTodosThunk, RemoveTodoListAC
} from "./state/todolists-reducer";
import {
    addTaskAC,
    addTaskTC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    fetchTasksTC,
    removeTaskAC
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType} from "./api/api";

// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }

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

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodosThunk)
    }, [])




    const removeTasks = useCallback((taskID: string, todoListID: string) => {
        dispatch(removeTaskAC(taskID, todoListID))
    }, [dispatch])
    // const addTask = useCallback((title: string, todoListID: string) => {
    //     dispatch(addTaskAC(title, todoListID))
    // }, [dispatch])
    const addTask = useCallback(function (title: string, todolistId: string) {
        const thunk = addTaskTC(title, todolistId)
        dispatch(thunk);
    }, []);
    const changeTaskStatus = useCallback((taskId: string, newIsDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskId, newIsDone, todoListID))
    }, [dispatch])
    const changeTaskTitle = useCallback((taskId: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todoListID))
    }, [dispatch])

    const changeTodoListFilter = useCallback((newFilter: FilterValuesTypes, todoListID: string) => {
        dispatch(ChangeTodoListFilterAC(newFilter, todoListID))
    }, [dispatch])
    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(RemoveTodoListAC(todoListID))
    }, [dispatch])
    const AddTodoList = useCallback((title: string) => {
        dispatch(AddTodolistAC(title))
    }, [dispatch])
    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        dispatch(ChangeTodolistTitleAC(title, todoListID))
    }, [dispatch])

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

