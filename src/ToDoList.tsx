import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {FilterValuesTypes, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type ToDoListPropsType = {
    id: string
    title: string
    todoListFilter: FilterValuesTypes
    tasks: Array<TaskType>
    addTask: (title: string, todoListID: string) => void
    removeTasks: (taskID: string, todoListID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesTypes, todoListID: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

export function ToDoList(props: ToDoListPropsType) {
    const tasks = props.tasks.map(task => {
        const removeTask = () => props.removeTasks(task.id, props.id)
        const changeStatus = (event: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, event.currentTarget.checked, props.id)
        const changeTaskTitle = (title: string) => props.changeTaskTitle(task.id, title, props.id)

        return (
            <ListItem key={task.id} className={task.isDone ? "is-done" : ""}>
                <Checkbox color={"primary"} checked={task.isDone} onChange={changeStatus} />
                <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </ListItem>
            // <li key={task.id} className={task.isDone ? "is-done" : ""}>
            //     {/*<input type="checkbox" checked={task.isDone}*/}
            //     {/*       onChange={changeStatus}/>*/}
            //     <Checkbox color={"primary"} checked={task.isDone} onChange={changeStatus} />
            //     <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
            //     <IconButton onClick={removeTask}>
            //         <Delete/>
            //     </IconButton>
            //     {/*<span>{task.title}</span>*/}
            //     {/*<button className={"close-button"} onClick={removeTask}>X</button>*/}
            // </li>
        )
    })

    const setAll = () => props.changeTodoListFilter("all", props.id)
    const setActive = () => props.changeTodoListFilter("active", props.id)
    const setCompleted = () => props.changeTodoListFilter("completed", props.id)

    const addTask = (title: string) => props.addTask(title, props.id)


    const allBtnClass = props.todoListFilter === "all" ? "active-filter" : "";
    const activeBtnClass = props.todoListFilter === "active" ? "active-filter" : "";
    const completedBtnClass = props.todoListFilter === "completed" ? "active-filter" : ""
    const removeTodoList = () => props.removeTodoList(props.id)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.id)

    return (
        <div>
            <h3>
                {/*{props.title}*/}
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
                {/*<button onClick={removeTodoList}>X</button>*/}
            </h3>
            <AddItemForm addItem={addTask}/>
            <List>
                {tasks}
            </List>
            <div>
                <Button style={{marginRight: "5px"}} size={"small"} color={"primary"}
                        variant={props.todoListFilter === "all" ? "contained" : "outlined"} className={allBtnClass}
                        onClick={setAll}>All</Button>
                <Button style={{marginRight: "5px"}} size={"small"} color={"primary"}
                        variant={props.todoListFilter === "active" ? "contained" : "outlined"}
                        className={activeBtnClass} onClick={setActive}>Active</Button>
                <Button style={{marginRight: "5px"}} size={"small"} color={"primary"}
                        variant={props.todoListFilter === "completed" ? "contained" : "outlined"}
                        className={completedBtnClass} onClick={setCompleted}>Completed</Button>
            </div>
        </div>
    )
}