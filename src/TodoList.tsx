import React, {ChangeEvent, KeyboardEvent, useState} from "react"

import {FilterValuesType, TaskType} from "./App"

type PropsType = {
	id: string
	title: string
	tasks: Array<TaskType>
	filter: FilterValuesType
	deleteTodoList: (todoListId: string) => void
	changeFilter: (todoListId: string, filterValue: FilterValuesType) => void
	addTask: (todoListId: string, taskTitle: string) => void
	deleteTask: (todoListId: string, taskId: string) => void
	changeTaskStatus: (todoListId: string, taskId: string, status: boolean) => void
}

export function TodoList (props: PropsType) {

	//Get new task's title and add new task
	const [error, setError] = useState<string | null>(null)
	const [newTaskTitle, setNewTaskTitle] = useState("")
	const onAddTaskHandler = () => {
		if (newTaskTitle.trim() !== "") {
			props.addTask(props.id, newTaskTitle)
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
			onAddTaskHandler()
		}
	}
	const onLostInputTitleFocus = () => {
		setError(null)
	}

	//Get new filter's value
	const onAllClickHandler = () => props.changeFilter(props.id,"all")
	const onActiveClickHandler = () => props.changeFilter(props.id,"active")
	const onCompletedClickHandler = () => props.changeFilter(props.id,"completed")

	//Delete todoList
	const onDeleteTodoListHandler = () => props.deleteTodoList(props.id)

	return (
		<div>
			<h3>
				{props.title} <button onClick={onDeleteTodoListHandler}>x</button>
			</h3>
			<div>
				<input className={error ? "error" : ""}
					   value={newTaskTitle}
					   onChange={onNewTaskTitleChangeHandler}
					   onKeyPress={onKeyPressHandler}
					   onBlur={onLostInputTitleFocus}/>
				<button onClick={onAddTaskHandler}>+</button>
				{error && <div className="error-message">{error}</div>}
			</div>
			<ul>
				{
					props.tasks.map(t => {
						const onDeleteTaskHandler = () => props.deleteTask(props.id, t.id)
						const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
							const newStatus = e.currentTarget.checked
							props.changeTaskStatus(props.id, t.id, newStatus)
						}

						return <li key={t.id}
								   className={t.isDone ? "is-done" : ""}>
							<input type="checkbox"
								   checked={t.isDone}
								   onChange={onChangeStatusHandler}/>
							<span>{t.title}</span>
							<button onClick={onDeleteTaskHandler}>x</button>
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