import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {FilterValuesTypes, TaskType} from "./App";

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
}

export function ToDoList(props: ToDoListPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, serError] = useState<string | null>(null)
    const tasks = props.tasks.map(task => {
        const removeTask = () => props.removeTasks(task.id, props.id)
        const changeStatus = (event: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, event.currentTarget.checked, props.id)
        return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <input type="checkbox" checked={task.isDone}
                       onChange={changeStatus}/>
                <span>{task.title}</span>
                <button className={"close-button"} onClick={removeTask}>X</button>
            </li>
        )
    })

    const setAll = () => props.changeTodoListFilter("all", props.id)
    const setActive = () => props.changeTodoListFilter("active", props.id)
    const setCompleted = () => props.changeTodoListFilter("completed", props.id)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        serError(null)
        setTitle(e.currentTarget.value)
    }
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(title, props.id)
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
    const removeTodoList = () => props.removeTodoList(props.id)

    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodoList}>X</button>
            </h3>
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
                <button className={allBtnClass} onClick={setAll}>All</button>
                <button className={activeBtnClass} onClick={setActive}>Active</button>
                <button className={completedBtnClass} onClick={setCompleted}>Completed</button>
            </div>
        </div>
    )
}