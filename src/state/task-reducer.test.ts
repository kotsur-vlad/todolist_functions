import {TasksStateType} from "../AppWithRedux"
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, taskReducer} from "./task-reducer"
import {addTodoListAC, deleteTodoListAC} from "./todolist-reducer"

let startState: TasksStateType

beforeEach(() => {
	startState = {
		"todolistId1": [
			{id: "1", title: "CSS", isDone: false},
			{id: "2", title: "JS", isDone: true},
			{id: "3", title: "React", isDone: false},
		],
		"todolistId2": [
			{id: "1", title: "bread", isDone: false},
			{id: "2", title: "milk", isDone: true},
			{id: "3", title: "tea", isDone: false},
		],
	}
})

test("correct task should be added to correct array", () => {
	const action = addTaskAC("todolistId2", "juice")
	const endState = taskReducer(startState, action)

	expect(endState["todolistId1"].length).toBe(3)
	expect(endState["todolistId2"].length).toBe(4)
	expect(endState["todolistId2"][0].id).toBeDefined()
	expect(endState["todolistId2"][0].title).toBe("juice")
	expect(endState["todolistId2"][0].isDone).toBe(false)
})
test("new array should be added when new todolist is added", () => {
	const action = addTodoListAC("new todolist")
	const endState = taskReducer(startState, action)

	const keys = Object.keys(endState)
	const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2")
	if (!newKey) {
		throw Error("new key should be added")
	}

	expect(keys.length).toBe(3)
	expect(endState[newKey]).toEqual([])
})

test("correct task should be deleted from correct array", () => {
	const action = deleteTaskAC("todolistId2", "2")
	const endState = taskReducer(startState, action)

	expect(endState["todolistId1"].length).toBe(3)
	expect(endState["todolistId2"].length).toBe(2)
	expect(endState["todolistId2"].every(t => t.id !== "2")).toBeTruthy()
})
test("property with todolistId should be deleted", () => {
	const action = deleteTodoListAC("todolistId2")
	const endState = taskReducer(startState, action)

	const keys = Object.keys(endState)

	expect(keys.length).toBe(1)
	expect(endState["todolistId2"]).toBeUndefined()
})


test("title of specified task should be changed", () => {
	const action = changeTaskTitleAC("todolistId1", "1", "HTML")
	const endState = taskReducer(startState, action)

	expect(endState["todolistId1"][0].title).toBe("HTML")
	expect(endState["todolistId2"][0].title).toBe("bread")
})

test("status of specified task should be changed", () => {
	const action = changeTaskStatusAC("todolistId2", "2", false)
	const endState = taskReducer(startState, action)

	expect(endState["todolistId2"][1].isDone).toBeFalsy()
	expect(endState["todolistId1"][1].isDone).toBeTruthy()
})
