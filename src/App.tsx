import React, {useState} from "react"

import "./App.css"
import {TodoList} from "./TodoList"
import {v1} from "uuid"

export type FilterValuesType = "all" | "active" | "completed"

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type TodoListType = {
	id: string
	title: string
	filter: FilterValuesType
}

type TasksStateType = {
	[key: string]: Array<TaskType>
}

function App () {

	//Get initial todoLists
	const todoListId1 = v1()
	const todoListId2 = v1()
	const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
		{id: todoListId1, title: "What to learn", filter: "all"},
		{id: todoListId2, title: "What to buy", filter: "completed"},
	])

	//Get initial tasks
	const [tasks, setTasks] = useState<TasksStateType>({
		[todoListId1]: [
			{id: v1(), title: "HTML&CSS", isDone: true},
			{id: v1(), title: "JS", isDone: true},
			{id: v1(), title: "React", isDone: false},
			{id: v1(), title: "Redux", isDone: false},
			{id: v1(), title: "GraphQL", isDone: false},
		],
		[todoListId2]: [
			{id: v1(), title: "Smartphone", isDone: true},
			{id: v1(), title: "House", isDone: false},
		],
	})

	//Delete todoList
	const deleteTodoList = (todoListId: string) => {
		const newTodoLists = todoLists.filter(tl => tl.id !== todoListId)
		delete tasks[todoListId]
		setTodoLists(newTodoLists)
	}

	//Change todoList's filter
	const changeFilter = (todoListId: string, filterValue: FilterValuesType) => {
		const todoList = todoLists.find(tl => tl.id === todoListId)
		if (todoList) {
			todoList.filter = filterValue
			setTodoLists([...todoLists])
		}
	}

	//Add task
	const addTask = (todoListId: string, taskTitle: string) => {
		const task = {
			id: v1(),
			title: taskTitle,
			isDone: false,
		}
		const currentTasks = tasks[todoListId]
		tasks[todoListId] = [task, ...currentTasks]
		setTasks({...tasks})
	}

	//Delete task
	const deleteTask = (todoListId: string, taskId: string) => {
		const currentTasks = tasks[todoListId]
		tasks[todoListId] = currentTasks.filter(t => t.id !== taskId)
		setTasks({...tasks})
	}

	//Change task's status
	const changeStatus = (todoListId: string, taskId: string, status: boolean) => {
		const currentTasks = tasks[todoListId]
		const task = currentTasks.find(t => t.id === taskId)
		if (task) {
			task.isDone = status
			setTasks({...tasks})
		}
	}

	return (
		<div className="App">
			{
				todoLists.map(tl => {
					let filteredTasks = tasks[tl.id]
					if (tl.filter === "active") {
						filteredTasks = filteredTasks.filter(t => !t.isDone)
					} else if (tl.filter === "completed") {
						filteredTasks = filteredTasks.filter(t => t.isDone)
					}

					return <TodoList key={tl.id}
									 id={tl.id}
									 title={tl.title}
									 tasks={filteredTasks}
									 filter={tl.filter}
									 deleteTodoList={deleteTodoList}
									 changeFilter={changeFilter}
									 addTask={addTask}
									 deleteTask={deleteTask}
									 changeTaskStatus={changeStatus}/>
				})
			}
		</div>
	)
}

export default App
