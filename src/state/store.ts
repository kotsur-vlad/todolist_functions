import {combineReducers, createStore} from "redux"

import {todoListReducer} from "./todolist-reducer"
import {taskReducer} from "./task-reducer"

const rootReducer = combineReducers({
	todolists: todoListReducer,
	tasks: taskReducer,
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store;