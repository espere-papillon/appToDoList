import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {FilterValuesTypes, TaskType} from "./App";

type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTasks: (taskID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesTypes) => void
}

export function ToDoList(props: ToDoListPropsType) {
    const [title, setTitle] = useState<string>("")

    const tasks = props.tasks.map(task => {
        const removeTask = () => props.removeTasks(task.id)
        return (
            <li>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={removeTask}>X</button>
            </li>
        )
    })

    const setAll = () => props.changeTodoListFilter("all")
    const setActive = () => props.changeTodoListFilter("active")
    const setCompleted = () => props.changeTodoListFilter("completed")
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const addTask = () => {
        props.addTask(title)
        setTitle("")
    }
    const onKeyPressTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter")
            addTask()
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={changeTitle}
                    onKeyPress={onKeyPressTask}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                {/*<button onClick={() => {props.changeTodoListFilter("all")}}>All</button>*/}
                {/*<button onClick={() => {props.changeTodoListFilter("active")}}>Active</button>*/}
                {/*<button onClick={() => {props.changeTodoListFilter("completed")}}>Completed</button>*/}
                <button onClick={setAll}>All</button>
                <button onClick={setActive}>Active</button>
                <button onClick={setCompleted}>Completed</button>
            </div>
        </div>
    )
}