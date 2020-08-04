import {v1} from "uuid"

import {FilterValuesType, TodoListType} from "../App"

type addTodoListActionType = {
	type: "ADD-TODOLIST",
	title: string,
}
type deleteTodoListActionType = {
	type: "DELETE-TODOLIST",
	id: string,
}
type changeTodoListTitleActionType = {
	type: "CHANGE-TODOLIST-TITLE",
	id: string,
	title: string,
}
type changeTodoListFilterActionType = {
	type: "CHANGE-TODOLIST-FILTER",
	id: string,
	filter: FilterValuesType,
}

type ActionsType =
	addTodoListActionType
	| deleteTodoListActionType
	| changeTodoListTitleActionType
	| changeTodoListFilterActionType

export const todoListReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
	switch (action.type) {
		case "ADD-TODOLIST":
			return [
				...state,
				{
					id: v1(),
					title: action.title,
					filter: "all",
				},
			]
		case "DELETE-TODOLIST":
			return state.filter(tl => tl.id !== action.id)
		case "CHANGE-TODOLIST-TITLE":
			return [
				...state.map(tl => {
					if (tl.id === action.id) {
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
					if (tl.id === action.id) {
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
			throw new Error("I don't understand this type")
	}
}

export const addTodoListAC = (title: string): addTodoListActionType => {
	return {type: "ADD-TODOLIST", title: title}
}

export const deleteTodoListAC = (todolistId: string): deleteTodoListActionType => {
	return {type: "DELETE-TODOLIST", id: todolistId}
}

export const changeTodoListTitleAC = (todolistId: string, title: string): changeTodoListTitleActionType => {
	return {type: "CHANGE-TODOLIST-TITLE", id: todolistId, title: title}
}

export const changeTodoListFilterAC = (todolistId: string, filter: FilterValuesType): changeTodoListFilterActionType => {
	return {type: "CHANGE-TODOLIST-FILTER", id: todolistId, filter: filter}
}
