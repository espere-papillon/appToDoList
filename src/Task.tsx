import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./App";

type TaskSpanPropsType = {
    task: TaskType
    removeTasks: (taskId: string) => void
    changeTaskTitle: (taskId: string, title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const Task = React.memo(({task, changeTaskTitle, changeTaskStatus, removeTasks}: TaskSpanPropsType) => {
    console.log('Task called')

    const removeTask = () => removeTasks(task.id)
    const changeStatus = (event: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, event.currentTarget.checked)
    const changeTitle = (title: string) => changeTaskTitle(task.id, title)

    return (
        <ListItem key={task.id} className={task.isDone ? "is-done" : ""}>
            <Checkbox color={"primary"} checked={task.isDone} onChange={changeStatus} />
            <EditableSpan title={task.title} changeTitle={changeTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </ListItem>
    )
})