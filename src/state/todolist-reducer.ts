import {v1} from "uuid"

import {FilterValuesType, TodoListType} from "../AppWithRedux"

export type addTodoListActionType = {
	type: "ADD-TODOLIST"
	todoListId: string
	title: string
}
export type deleteTodoListActionType = {
	type: "DELETE-TODOLIST"
	todoListId: string
}
type changeTodoListTitleActionType = {
	type: "CHANGE-TODOLIST-TITLE"
	todoListId: string
	title: string
}
type changeTodoListFilterActionType = {
	type: "CHANGE-TODOLIST-FILTER"
	todoListId: string
	filter: FilterValuesType
}

type ActionsType =
	addTodoListActionType
	| deleteTodoListActionType
	| changeTodoListTitleActionType
	| changeTodoListFilterActionType

const initialState: Array<TodoListType> = []

export const todoListReducer = (state: Array<TodoListType> = initialState, action: ActionsType): Array<TodoListType> => {
	switch (action.type) {
		case "ADD-TODOLIST":
			return [
				{
					id: action.todoListId,
					title: action.title,
					filter: "all",
				},
				...state,
			]
		case "DELETE-TODOLIST":
			return state.filter(tl => tl.id !== action.todoListId)
		case "CHANGE-TODOLIST-TITLE":
			return [
				...state.map(tl => {
					if (tl.id === action.todoListId) {
						return {
							...tl,
							title: action.title,
						}
					} else {
						return tl
					}
				}),

			]
		case "CHANGE-TODOLIST-FILTER":
			return [
				...state.map(tl => {
					if (tl.id === action.todoListId) {
						return {
							...tl,
							filter: action.filter,
						}
					} else {
						return tl
					}
				}),
			]
		default:
			return state
	}
}

export const addTodoListAC = (title: string): addTodoListActionType => {
	return {type: "ADD-TODOLIST", todoListId: v1(), title}
}

export const deleteTodoListAC = (todoListId: string): deleteTodoListActionType => {
	return {type: "DELETE-TODOLIST", todoListId}
}

export const changeTodoListTitleAC = (todoListId: string, title: string): changeTodoListTitleActionType => {
	return {type: "CHANGE-TODOLIST-TITLE", todoListId, title}
}

export const changeTodoListFilterAC = (todoListId: string, filter: FilterValuesType): changeTodoListFilterActionType => {
	return {type: "CHANGE-TODOLIST-FILTER", todoListId, filter}
}
