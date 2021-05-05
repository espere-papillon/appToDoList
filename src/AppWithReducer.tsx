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

function AppWithReducer() {
    // BLL:
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    let [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, [
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID_1]: [
            {id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        [todoListID_2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Vegetable', isDone: true},
            {id: v1(), title: 'Fruit', isDone: true},
            {id: v1(), title: 'Butter', isDone: false}
        ]
    })

    const [todoListFilter, setTodoListFilter] = useState<FilterValuesTypes>("all")

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
        let action = removeTaskAC(taskID, todoListID)
        dispatchToTasks(action)
    }
    function addTask(title: string, todoListID: string) {
        dispatchToTasks(addTaskAC(title, todoListID))
    }
    function changeTaskStatus(taskId: string, newIsDone: boolean, todoListID: string) {
        dispatchToTasks(changeTaskStatusAC(taskId, newIsDone, todoListID))
    }
    function changeTaskTitle(taskId: string, title: string, todoListID: string) {
        dispatchToTasks(changeTaskTitleAC(taskId, title, todoListID))
    }

    function changeTodoListFilter(newFilter: FilterValuesTypes, todoListID: string) {
        dispatchToTodoLists(ChangeTodoListFilterAC(newFilter, todoListID))
    }
    function removeTodoList(todoListID: string) {
        let action = RemoveTodoListAC(todoListID)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }
    function AddTodoList(title: string) {
        let action = AddTodolistAC(title)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }
    function changeTodoListTitle(title: string, todoListID: string) {
        dispatchToTodoLists(ChangeTodolistTitleAC(title, todoListID))
    }

    // UI:
    const todoListComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={4} style={{padding: "20px"}}>
                    <ToDoList
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


export default AppWithReducer;

