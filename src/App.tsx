import React, {useState} from "react"

import "./App.css"
import {TodoList} from "./TodoList"

export type FilterValuesType = "all" | "active" | "completed"

export type TaskType = {
	id: number
	title: string
	isDone: boolean
}

function App () {

	//Get initial tasks
	const initTasks = [
		{id: 1, title: "HTML&CSS", isDone: true},
		{id: 2, title: "JS", isDone: true},
		{id: 3, title: "React", isDone: false},
		{id: 4, title: "Redux", isDone: false},
		{id: 5, title: "GraphQL", isDone: false},
	]

	const [tasks, setTasks] = useState<Array<TaskType>>(initTasks)

	//Remove task
	const removeTask = (taskId: number) => {
		const newTasks = tasks.filter(t => t.id !== taskId)
		setTasks(newTasks);
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

	return (
		<div className="App">
            <TodoList title="What to learn"
					  tasks={filteredTasks}
					  removeTask={removeTask}
					  changeFilter={changeFilter}/>
		</div>
	)
}

export default App
