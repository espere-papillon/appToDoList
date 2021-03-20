import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesTypes = "all" | "active" | "completed"

function App() {
    // console.log(v1())

    // BLL:
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: false},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true}
    ])

    function removeTasks(taskID: string) {
        const filteredTasks = tasks.filter(t => t.id !== taskID)
        setTasks(filteredTasks)
    }

    function addTask(title: string) {
        const task: TaskType = {
            id: v1(),
            title, // title: title,
            isDone: false
        }
        const newTasks = [task, ...tasks]
        // const newTasks = [...tasks]
        // newTasks.unshift(task)
        setTasks(newTasks)
    }

    //const todoListFilter: FilterValuesTypes = "active"

        const [todoListFilter, setTodoListFilter] = useState<FilterValuesTypes>("all")

        function changeTodoListFilter(newFilter: FilterValuesTypes) {
        setTodoListFilter(newFilter)
        }


        function getTasksForTodoList () {
        switch (todoListFilter) {
            case "active":
                return tasks.filter(t => t.isDone === false)
            case "completed":
                return tasks.filter(t => t.isDone === true)
            default:
                return tasks
        }
    }
    // UI:
    return (
        <div className="App">
            <ToDoList title = {'What to learn'}
                      tasks={getTasksForTodoList()}
                      addTask={addTask}
                      removeTasks={removeTasks}
                      changeTodoListFilter={changeTodoListFilter}/>
        </div>
    );
}


export default App;

