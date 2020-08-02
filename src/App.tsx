import React, {useState} from "react"

import "./App.css"
import {TodoList} from "./TodoList"
import {v1} from "uuid"

export type FilterValuesType = "all" | "active" | "completed"

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

function App () {

	//Get initial tasks
	const initTasks = [
		{id: v1(), title: "HTML&CSS", isDone: true},
		{id: v1(), title: "JS", isDone: true},
		{id: v1(), title: "React", isDone: false},
		{id: v1(), title: "Redux", isDone: false},
		{id: v1(), title: "GraphQL", isDone: false},
	]
	const [tasks, setTasks] = useState<Array<TaskType>>(initTasks)

	//Add task
	const addTask = (taskTitle: string) => {
		const task = {
			id: v1(),
			title: taskTitle,
			isDone: false,
		}
		const newTasks = [task, ...tasks]
		setTasks(newTasks)
	}

	//Remove task
	const removeTask = (taskId: string) => {
		const newTasks = tasks.filter(t => t.id !== taskId)
		setTasks(newTasks)
	}

	//Changing task's filter
	const [filter, setFilter] = useState<FilterValuesType>("all")
	let filteredTasks = tasks
	if (filter === "active") {
		filteredTasks = tasks.filter(t => !t.isDone)
	} else if (filter === "completed") {
		filteredTasks = tasks.filter(t => t.isDone)
	}
	const changeFilter = (filterValue: FilterValuesType) => {
		setFilter(filterValue)
	}

	//Changing task's status
	const changeStatus = (taskId: string, status: boolean) => {
		const task = tasks.find(t => t.id === taskId)
		if (task) {
			task.isDone = status
			setTasks([...tasks])
		}
	}

	return (
		<div className="App">
			<TodoList title="What to learn"
					  tasks={filteredTasks}
					  filter={filter}
					  removeTask={removeTask}
					  changeFilter={changeFilter}
					  addTask={addTask}
					  changeTaskStatus={changeStatus}/>
		</div>
	)
}

export default App
