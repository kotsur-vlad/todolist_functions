import React, {ChangeEvent, KeyboardEvent, useState} from "react"

import {FilterValuesType, TaskType} from "./App"

type PropsType = {
	title: string
	tasks: Array<TaskType>
	removeTask: (taskId: string) => void
	changeFilter: (filterValue: FilterValuesType) => void
	addTask: (taskTitle: string) => void
}

export function TodoList (props: PropsType) {

	const [newTaskTitle, setNewTaskTitle] = useState("")

	const addTask = () => {
		props.addTask(newTaskTitle)
		setNewTaskTitle("")
	}

	const onNewTaskTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTaskTitle(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.charCode === 13) {
			addTask()
		}
	}

	const onAllClickHandler = () => props.changeFilter("all")
	const onActiveClickHandler = () => props.changeFilter("active")
	const onCompletedClickHandler = () => props.changeFilter("completed")

	return (
		<div>
			<h3>{props.title}</h3>
			<div>
				<input value={newTaskTitle}
					   onChange={onNewTaskTitleChangeHandler}
					   onKeyPress={onKeyPressHandler}/>
				<button onClick={addTask}>+</button>
			</div>
			<ul>
				{
					props.tasks.map(t => {
						const onRemoveHandler = () => props.removeTask(t.id)

						return <li key={t.id}>
							<input type="checkbox"
								   checked={t.isDone}/>
							<span>{t.title}</span>
							<button onClick={onRemoveHandler}>x</button>
						</li>
					})
				}
			</ul>
			<div>
				<button onClick={onAllClickHandler}>All</button>
				<button onClick={onActiveClickHandler}>Active</button>
				<button onClick={onCompletedClickHandler}>Completed</button>
			</div>
		</div>
	)
}