import React, {ChangeEvent, KeyboardEvent, useState} from "react"

import {FilterValuesType, TaskType} from "./App"

type PropsType = {
	title: string
	tasks: Array<TaskType>
	filter: string
	removeTask: (taskId: string) => void
	changeFilter: (filterValue: FilterValuesType) => void
	addTask: (taskTitle: string) => void
	changeTaskStatus: (taskId: string, status: boolean) => void
}

export function TodoList (props: PropsType) {

	//Get new task's title
	const [error, setError] = useState<string | null>(null)
	const [newTaskTitle, setNewTaskTitle] = useState("")
	const addTask = () => {
		if (newTaskTitle.trim() !== "") {
			props.addTask(newTaskTitle)
			setNewTaskTitle("")
		} else {
			setError("Title is required")
		}
	}
	const onNewTaskTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTaskTitle(e.currentTarget.value)
	}
	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (e.charCode === 13) {
			addTask()
		}
	}

	//Get new filter's value
	const onAllClickHandler = () => props.changeFilter("all")
	const onActiveClickHandler = () => props.changeFilter("active")
	const onCompletedClickHandler = () => props.changeFilter("completed")

	return (
		<div>
			<h3>{props.title}</h3>
			<div>
				<input className={error ? "error" : ""}
					   value={newTaskTitle}
					   onChange={onNewTaskTitleChangeHandler}
					   onKeyPress={onKeyPressHandler}/>
				<button onClick={addTask}>+</button>
				{error && <div className="error-message">{error}</div>}
			</div>
			<ul>
				{
					props.tasks.map(t => {
						const onRemoveHandler = () => props.removeTask(t.id)
						const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
							const newStatus = e.currentTarget.checked
							props.changeTaskStatus(t.id, newStatus)
						}

						return <li key={t.id}
								   className={t.isDone ? "is-done" : ""}>
							<input type="checkbox"
								   checked={t.isDone}
								   onChange={onChangeStatusHandler}/>
							<span>{t.title}</span>
							<button onClick={onRemoveHandler}>x</button>
						</li>
					})
				}
			</ul>
			<div>
				<button className={props.filter === "all" ? "active-filter" : ""}
						onClick={onAllClickHandler}>All
				</button>
				<button className={props.filter === "active" ? "active-filter" : ""}
						onClick={onActiveClickHandler}>Active
				</button>
				<button className={props.filter === "completed" ? "active-filter" : ""}
						onClick={onCompletedClickHandler}>Completed
				</button>
			</div>
		</div>
	)
}