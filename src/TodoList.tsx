import React, {ChangeEvent} from "react"
import {Button, Checkbox, IconButton} from "@material-ui/core"
import {Delete} from "@material-ui/icons"

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
	const onAllClickHandler = () => props.changeFilter(props.id, "all")
	const onActiveClickHandler = () => props.changeFilter(props.id, "active")
	const onCompletedClickHandler = () => props.changeFilter(props.id, "completed")

	return (
		<div>
			<h3>
				<EditableSpan value={props.title}
							  getNewValue={onChangeTodoListTitleHandler}/>
				<IconButton onClick={onDeleteTodoListHandler}>
					<Delete/>
				</IconButton>
			</h3>
			<div>
				<AddItemForm addItem={onAddTaskClick}/>
			</div>
			<div>
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


						return <div key={t.id}
									className={t.isDone ? "is-done" : ""}>
							<Checkbox checked={t.isDone}
									  onChange={onChangeStatusHandler}
									  color="secondary"
							/>
							<EditableSpan value={t.title}
										  getNewValue={onChangeTaskTitleHandler}/>
							<IconButton onClick={onDeleteTaskHandler}>
								<Delete/>
							</IconButton>
						</div>
					})
				}
			</div>
			<div>
				<Button onClick={onAllClickHandler}
						variant={props.filter === "all" ? "outlined" : "text"}>All
				</Button>
				<Button onClick={onActiveClickHandler}
						variant={props.filter === "active" ? "outlined" : "text"}
						color="primary">Active
				</Button>
				<Button onClick={onCompletedClickHandler}
						variant={props.filter === "completed" ? "outlined" : "text"}
						color="secondary">Completed
				</Button>
			</div>
		</div>
	)
}
