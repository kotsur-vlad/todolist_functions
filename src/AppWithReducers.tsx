import React, {useReducer} from "react"
import {v1} from "uuid"
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core"
import {Menu} from "@material-ui/icons"

import "./App.css"
import {TodoList} from "./TodoList"
import AddItemForm from "./AddItemForm"
import {
	addTodoListAC,
	changeTodoListFilterAC,
	changeTodoListTitleAC,
	deleteTodoListAC,
	todoListReducer,
} from "./state/todolist-reducer"
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, taskReducer} from "./state/task-reducer"

export type FilterValuesType = "all" | "active" | "completed"

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type TodoListType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type TasksStateType = {
	[key: string]: Array<TaskType>
}

function AppWithReducers () {

	//Get initial todoLists
	const todoListId1 = v1()
	const todoListId2 = v1()
	const [todoLists, dispatchToTodoList] = useReducer(todoListReducer, [
		{id: todoListId1, title: "What to learn", filter: "all"},
		{id: todoListId2, title: "What to buy", filter: "all"},
	])

	//Get initial tasks
	const [tasks, dispatchToTask] = useReducer(taskReducer, {
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

	//Add todoList
	const addTodoList = (todoListTitle: string) => {
		const action = addTodoListAC(todoListTitle)
		dispatchToTodoList(action)
		dispatchToTask(action)
	}

	//Delete todoList
	const deleteTodoList = (todoListId: string) => {
		const action = deleteTodoListAC(todoListId)
		dispatchToTodoList(action)
		dispatchToTask(action)
	}

	//Change todoList's title
	const changeTodoListTitle = (todoListId: string, todoListTitle: string) => {
		dispatchToTodoList(changeTodoListTitleAC(todoListId, todoListTitle))
	}

	//Change todoList's filter
	const changeTodoListFilter = (todoListId: string, filterValue: FilterValuesType) => {
		dispatchToTodoList(changeTodoListFilterAC(todoListId, filterValue))
	}

	//Add task
	const addTask = (todoListId: string, taskTitle: string) => {
		dispatchToTask(addTaskAC(todoListId, taskTitle))
	}

	//Delete task
	const deleteTask = (todoListId: string, taskId: string) => {
		dispatchToTask(deleteTaskAC(todoListId, taskId))
	}

	//Change task's title
	const changeTaskTitle = (todoListId: string, taskId: string, taskTitle: string) => {
		dispatchToTask(changeTaskTitleAC(todoListId, taskId, taskTitle))
	}

	//Change task's status
	const changeTaskStatus = (todoListId: string, taskId: string, status: boolean) => {
		dispatchToTask(changeTaskStatusAC(todoListId, taskId, status))
	}

	return (
		<div className="App">
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start"
								color="inherit">
						<Menu/>
					</IconButton>
					<Typography variant="h6">
						News
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Grid container
					  style={{padding: "20px"}}>
					<AddItemForm addItem={addTodoList}/>
				</Grid>
				<Grid container
					  spacing={7}>
					{
						todoLists.map(tl => {
							let filteredTasks = tasks[tl.id]
							if (tl.filter === "active") {
								filteredTasks = filteredTasks.filter(t => !t.isDone)
							} else if (tl.filter === "completed") {
								filteredTasks = filteredTasks.filter(t => t.isDone)
							}

							return <Grid item>
								<Paper style={{padding: "10px"}}>
									<TodoList key={tl.id}
											  id={tl.id}
											  title={tl.title}
											  tasks={filteredTasks}
											  filter={tl.filter}
											  deleteTodoList={deleteTodoList}
											  changeTodoListTitle={changeTodoListTitle}
											  changeTodoListFilter={changeTodoListFilter}
											  addTask={addTask}
											  deleteTask={deleteTask}
											  changeTaskTitle={changeTaskTitle}
											  changeTaskStatus={changeTaskStatus}/>
								</Paper>
							</Grid>
						})
					}
				</Grid>
			</Container>
		</div>
	)
}

export default AppWithReducers
