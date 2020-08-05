import {v1} from "uuid"

import {TasksStateType} from "../App"
import {addTodoListActionType, deleteTodoListActionType} from "./todolist-reducer"

type addTaskActionType = {
	type: "ADD-TASK"
	todoListId: string
	title: string
}
type deleteTaskActionType = {
	type: "DELETE-TASK"
	todoListId: string
	taskId: string
}
type changeTaskTitleActionType = {
	type: "CHANGE-TASK-TITLE",
	todoListId: string
	taskId: string
	title: string
}
type changeTaskStatusActionType = {
	type: "CHANGE-TASK-STATUS",
	todoListId: string
	taskId: string
	status: boolean
}

type ActionsType =
	addTaskActionType
	| deleteTaskActionType
	| changeTaskTitleActionType
	| changeTaskStatusActionType
	| addTodoListActionType
	| deleteTodoListActionType

export const taskReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
	switch (action.type) {
		case "ADD-TASK":
			const newTask = {
				id: v1(),
				title: action.title,
				isDone: false,
			}
			return {
				...state,
				[action.todoListId]: [newTask, ...state[action.todoListId]],
			}
		case "DELETE-TASK":
			return {
				...state,
				[action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId),
			}
		case "CHANGE-TASK-TITLE":
			return {
				...state,
				[action.todoListId]: state[action.todoListId].map(t => {
					if (t.id === action.taskId) {
						return {
							...t,
							title: action.title,
						}
					} else {
						return t
					}
				}),
			}
		case "CHANGE-TASK-STATUS":
			return {
				...state,
				[action.todoListId]: state[action.todoListId].map(t => {
					if (t.id === action.taskId) {
						return {
							...t,
							isDone: action.status,
						}
					} else {
						return t
					}
				}),
			}
		case "ADD-TODOLIST":
			return {
				...state,
				[action.todoListId]: [],
			}
		case "DELETE-TODOLIST":
			const stateCopy = {...state}
			delete stateCopy[action.todoListId]
			return stateCopy
		default:
			throw new Error("I don't understand this type")
	}
}

export const addTaskAC = (todoListId: string, title: string): addTaskActionType => {
	return {type: "ADD-TASK", todoListId, title}
}

export const deleteTaskAC = (todoListId: string, taskId: string): deleteTaskActionType => {
	return {type: "DELETE-TASK", todoListId, taskId}
}

export const changeTaskTitleAC = (todoListId: string, taskId: string, title: string): changeTaskTitleActionType => {
	return {type: "CHANGE-TASK-TITLE", todoListId, taskId, title}
}

export const changeTaskStatusAC = (todoListId: string, taskId: string, status: boolean): changeTaskStatusActionType => {
	return {type: "CHANGE-TASK-STATUS", todoListId, taskId, status}
}
