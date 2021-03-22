import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {FilterValuesTypes, TaskType} from "./App";

type ToDoListPropsType = {
    title: string
    todoListFilter: FilterValuesTypes
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTasks: (taskID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesTypes) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean) => void
}

export function ToDoList(props: ToDoListPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, serError] = useState<string | null>(null)
    const tasks = props.tasks.map(task => {
        const removeTask = () => props.removeTasks(task.id)
        const changeStatus = (event: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, event.currentTarget.checked)
        return (
            <li>
                <input type="checkbox" checked={task.isDone}
                       onChange={changeStatus}/>
                <span>{task.title}</span>
                <button className={"close-button"} onClick={removeTask}>X</button>
            </li>
        )
    })

    const setAll = () => props.changeTodoListFilter("all")
    const setActive = () => props.changeTodoListFilter("active")
    const setCompleted = () => props.changeTodoListFilter("completed")
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {serError(null)
        setTitle(e.currentTarget.value)}
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(title)
        } else {
            serError("Title is required")
        }
        setTitle("")
    }
    const onKeyPressTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter")
            addTask()
    }

    const allBtnClass = props.todoListFilter === "all" ? "active-filter" : "";
    const activeBtnClass = props.todoListFilter === "active" ? "active-filter" : "";
    const completedBtnClass = props.todoListFilter === "completed" ? "active-filter" : ""

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    className={error ? "error-input" : ""}
                    value={title}
                    onChange={changeTitle}
                    onKeyPress={onKeyPressTask}
                />
                <button className={"add-button"} onClick={addTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                {/*<button onClick={() => {props.changeTodoListFilter("all")}}>All</button>*/}
                {/*<button onClick={() => {props.changeTodoListFilter("active")}}>Active</button>*/}
                {/*<button onClick={() => {props.changeTodoListFilter("completed")}}>Completed</button>*/}
                <button className={allBtnClass} onClick={setAll}>All</button>
                <button className={activeBtnClass} onClick={setActive}>Active</button>
                <button className={completedBtnClass} onClick={setCompleted}>Completed</button>
            </div>
        </div>
    )
}