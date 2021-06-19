import React, {ChangeEvent, useCallback, useEffect} from "react";
import {FilterValuesTypes} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "./api/api";
import {useDispatch, useSelector} from "react-redux";
import {fetchTasksTC} from "./state/tasks-reducer";
import {RequestStatusType} from "./state/app-reducer";
import {AppRootStateType} from "./state/store";
import {Redirect} from "react-router-dom";

type ToDoListPropsType = {
    id: string
    title: string
    todoListFilter: FilterValuesTypes
    tasks: Array<TaskType>
    entityStatus: RequestStatusType
    addTask: (title: string, todoListID: string) => void
    removeTasks: (taskID: string, todoListID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesTypes, todoListID: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

export const ToDoList = React.memo((props: ToDoListPropsType) => {
    const removeTask = useCallback((taskId: string) => props.removeTasks(taskId, props.id), [props.removeTasks, , props.id])
    const changeStatus = useCallback((taskId: string, status: TaskStatuses) => props.changeTaskStatus(taskId, status, props.id), [props.changeTaskStatus, props.id])
    const changeTaskTitle = useCallback((taskId: string, newTitle: string) => props.changeTaskTitle(taskId, newTitle, props.id), [props.changeTaskTitle, props.id])

    const dispatch = useDispatch()

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(fetchTasksTC(props.id))
    }, [])

    const tasks = getTasksForTodoList().map(task => <Task
        key={task.id}
        task={task}
        removeTasks={removeTask}
        changeTaskStatus={changeStatus}
        changeTaskTitle={changeTaskTitle}/>)

    const setAll = useCallback(() => props.changeTodoListFilter("all", props.id), [props.changeTodoListFilter,
        props.id]);
    const setActive = useCallback(() => props.changeTodoListFilter("active", props.id),
        [props.changeTodoListFilter, props.id]);
    const setCompleted = useCallback(() => props.changeTodoListFilter("completed", props.id),
        [props.changeTodoListFilter, props.id]);

    const addTask = useCallback((title: string) => props.addTask(title, props.id), [props.addTask, props.id])


    const allBtnClass = props.todoListFilter === "all" ? "active-filter" : "";
    const activeBtnClass = props.todoListFilter === "active" ? "active-filter" : "";
    const completedBtnClass = props.todoListFilter === "completed" ? "active-filter" : ""
    const removeTodoList = () => props.removeTodoList(props.id)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.id)

    function getTasksForTodoList(): Array<TaskType> {
        switch (props.todoListFilter) {
            case "active":
                return props.tasks.filter(t => t.status === TaskStatuses.New)
            case "completed":
                return props.tasks.filter(t => t.status === TaskStatuses.Completed)
            default:
                return props.tasks
        }
    }

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList} disabled={props.entityStatus === "loading"}>
                    <Delete/>
                </IconButton>
                {/*<button onClick={removeTodoList}>X</button>*/}
            </h3>
            <AddItemForm addItem={addTask} entityStatus={props.entityStatus}/>
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
})