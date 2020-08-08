import React, {useCallback} from "react"
import {Button, IconButton} from "@material-ui/core"
import {Delete} from "@material-ui/icons"

import {FilterValuesType, TaskType} from "./AppWithRedux"
import {AddItemForm} from "./AddItemForm"
import {EditableSpan} from "./EditableSpan"
import {Task} from "./Task"

type PropsType = {
	id: string
	title: string
	tasks: Array<TaskType>
	filter: FilterValuesType
	deleteTodoList: (todoListId: string) => void
	changeTodoListTitle: (todoListId: string, todoListTitle: string) => void
	changeTodoListFilter: (todoListId: string, filterValue: FilterValuesType) => void
	addTask: (todoListId: string, taskTitle: string) => void
	deleteTask: (todoListId: string, taskId: string) => void
	changeTaskTitle: (todoListId: string, taskId: string, taskTitle: string) => void
	changeTaskStatus: (todoListId: string, taskId: string, status: boolean) => void
}

export const TodoList = React.memo((props: PropsType) => {
	console.log("TDLST was called")

	//Add new task
	const onAddTaskClick = useCallback((taskTitle: string) => props.addTask(props.id, taskTitle), [props.addTask, props.id])

	//Delete todoList
	const onDeleteTodoListHandler = useCallback(() => props.deleteTodoList(props.id), [props.deleteTodoList, props.id])

	//Change todoList's title
	const onChangeTodoListTitleHandler = useCallback((todoListTitle: string) => {
		props.changeTodoListTitle(props.id, todoListTitle)
	}, [props.changeTodoListTitle, props.id])

	//Get new filter's value
	const onAllClickHandler = useCallback(
		() => props.changeTodoListFilter(props.id, "all"), [props.changeTodoListFilter, props.id],
	)
	const onActiveClickHandler = useCallback(
		() => props.changeTodoListFilter(props.id, "active"), [props.changeTodoListFilter, props.id],
	)
	const onCompletedClickHandler = useCallback(
		() => props.changeTodoListFilter(props.id, "completed"), [props.changeTodoListFilter, props.id],
	)

	//Task's filtration
	let tasks = props.tasks
	if (props.filter === "active") {
		tasks = props.tasks.filter(t => !t.isDone)
	} else if (props.filter === "completed") {
		tasks = props.tasks.filter(t => t.isDone)
	}
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
					tasks.map(t => <Task key={t.id}
										 todoListId={props.id}
										 task={t}
										 deleteTask={props.deleteTask}
										 changeTaskTitle={props.changeTaskTitle}
										 changeTaskStatus={props.changeTaskStatus}/>)
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
})
