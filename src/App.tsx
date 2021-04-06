import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

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

function App() {
    // BLL:
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
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

    function removeTasks(taskID: string, todoListID: string) {
        const updatedTasks = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks({...tasks, [todoListID]: updatedTasks})
        //const filteredTasks = tasks.filter(t => t[].id !== taskID)
        //setTasks(filteredTasks)
    }

    function addTask(title: string, todoListID: string) {
        const newTask = {
            id: v1(),
            title,
            isDone: false
        }
        setTasks({
            ...tasks,
            [todoListID]: [newTask, ...tasks[todoListID]]
        })
    }

    function changeTodoListFilter(newFilter: FilterValuesTypes, todoListID: string) {
        const updatedTodoLists = todoLists.map(tl => tl.id === todoListID ? {...tl, filter: newFilter} : tl)
        setTodoLists(updatedTodoLists)
    }

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

    function changeTaskStatus(taskId: string, newIsDone: boolean, todoListID: string) {
        const updatedTasks = tasks[todoListID].map(el => {
            if (el.id === taskId) {
                return {...el, isDone: newIsDone}
            }
            return el
        })
        setTasks({...tasks, [todoListID]: updatedTasks})
    }

    function changeTaskTitle(taskId: string, title: string, todoListID: string) {
        const updatedTasks = tasks[todoListID].map(el => {
            if (el.id === taskId) {
                return {...el, title}
            }
            return el
        })
        setTasks({...tasks, [todoListID]: updatedTasks})
    }

    function removeTodoList(todoListID: string) {
        const updatedTodoLists = todoLists.filter(tl => tl.id !== todoListID)
        setTodoLists(updatedTodoLists)
        delete tasks[todoListID]
    }

    function AddTodoList(title: string) {
        const newTodoListID = v1()
        const neTodoList: TodoListType = {
            id: newTodoListID, title, filter: "all"
        }
        setTodoLists([...todoLists, neTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        const updatedTodoLists = todoLists.map(tl => tl.id === todoListID ? {...tl, title} : tl)
        setTodoLists(updatedTodoLists)
    }

    // UI:
    return (
        <div className="App">
            <AddItemForm addItem={AddTodoList} />
            {
                todoLists.map(tl => {
                    return (
                        <ToDoList
                            key={tl.id}
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
                    )
                })
            }
        </div>
    );
}


export default App;

