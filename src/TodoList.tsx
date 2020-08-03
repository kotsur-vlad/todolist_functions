import React, {ChangeEvent} from "react"

import {FilterValuesType, TaskType} from "./App"
import AddItemForm from "./AddItemForm"
import EditableSpan from "./EditableSpan"

type PropsType = {
	id: string
	title: string
	tasks: Array<TaskType>
	filter: FilterValuesType
	deleteTodoList: (todoListId: string) => void
	changeTodoListTitle: (todoListId: string, todoListTitle: string) => void
	changeFilter: (todoListId: string, filterValue: FilterValuesType) => void
	addTask: (todoListId: string, taskTitle: string) => void
	deleteTask: (todoListId: string, taskId: string) => void
	changeTaskTitle: (todoListId: string, taskId: string, taskTitle: string) => void
	changeTaskStatus: (todoListId: string, taskId: string, status: boolean) => void
}

export function TodoList (props: PropsType) {

	//Add new task
	const onAddTaskClick = (taskTitle: string) => props.addTask(props.id, taskTitle)

	//Delete todoList
	const onDeleteTodoListHandler = () => props.deleteTodoList(props.id)

	//Change todoList's title
	const onChangeTodoListTitleHandler = (todoListTitle: string) => {
		props.changeTodoListTitle(props.id, todoListTitle)
	}

	//Get new filter's value
	const onAllClickHandler = () => props.changeFilter(props.id,"all")
	const onActiveClickHandler = () => props.changeFilter(props.id,"active")
	const onCompletedClickHandler = () => props.changeFilter(props.id,"completed")

	return (
		<div>
			<h3>
				<EditableSpan value={props.title}
							  getNewValue={onChangeTodoListTitleHandler}/>
				<button onClick={onDeleteTodoListHandler}>x</button>
			</h3>
			<div>
				<AddItemForm addItem={onAddTaskClick}/>
			</div>
			<ul>
				{
					props.tasks.map(t => {
						const onDeleteTaskHandler = () => props.deleteTask(props.id, t.id)
						const onChangeTaskTitleHandler = (taskTitle: string) => {
							props.changeTaskTitle(props.id, t.id, taskTitle)
						}
						const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
							const newStatus = e.currentTarget.checked
							props.changeTaskStatus(props.id, t.id, newStatus)
						}


						return <li key={t.id}
								   className={t.isDone ? "is-done" : ""}>
							<input type="checkbox"
								   checked={t.isDone}
								   onChange={onChangeStatusHandler}/>
							<EditableSpan value={t.title}
										  getNewValue={onChangeTaskTitleHandler}/>
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
