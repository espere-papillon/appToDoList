import React, {ChangeEvent} from "react";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "./api/api";

export type TaskPropsType = {
    task: TaskType
    removeTasks: (taskId: string) => void
    changeTaskTitle: (taskId: string, title: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses) => void
}

export const Task = React.memo(({task, changeTaskTitle, changeTaskStatus, removeTasks}: TaskPropsType) => {
    console.log('Task called')

    const removeTask = () => removeTasks(task.id)
    const changeStatus = (event: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
    const changeTitle = (title: string) => changeTaskTitle(task.id, title)

    return (
        <ListItem key={task.id} className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox color={"primary"} checked={task.status === TaskStatuses.Completed} onChange={changeStatus} />
            <EditableSpan title={task.title} changeTitle={changeTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </ListItem>
    )
})