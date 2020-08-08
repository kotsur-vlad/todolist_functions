import React, {ChangeEvent, useCallback} from "react"
import {Checkbox, IconButton} from "@material-ui/core"
import {Delete} from "@material-ui/icons"

import {EditableSpan} from "./EditableSpan"
import {TaskType} from "./AppWithRedux"

type PropsType = {
	todoListId: string
	task: TaskType
	deleteTask: (todoListId: string, taskId: string) => void
	changeTaskTitle: (todoListId: string, taskId: string, taskTitle: string) => void
	changeTaskStatus: (todoListId: string, taskId: string, status: boolean) => void
}

export const Task = React.memo((props: PropsType) => {
	const onDeleteTaskHandler = () => props.deleteTask(props.todoListId, props.task.id)
	const onChangeTaskTitleHandler = useCallback((taskTitle: string) => {
		props.changeTaskTitle(props.todoListId, props.task.id, taskTitle)
	}, [props.changeTaskTitle, props.todoListId, props.task.id])
	const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const newStatus = e.currentTarget.checked
		props.changeTaskStatus(props.todoListId, props.task.id, newStatus)
	}

	return (
		<div key={props.task.id}
			 className={props.task.isDone ? "is-done" : ""}>
			<Checkbox checked={props.task.isDone}
					  onChange={onChangeStatusHandler}
					  color="secondary"
			/>
			<EditableSpan value={props.task.title}
						  getNewValue={onChangeTaskTitleHandler}/>
			<IconButton onClick={onDeleteTaskHandler}>
				<Delete/>
			</IconButton>
		</div>
	)
})