import React, {useCallback} from "react"
// import {v1} from "uuid"
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core"
import {Menu} from "@material-ui/icons"
import {useDispatch, useSelector} from "react-redux"

import "./App.css"
import {TodoList} from "./TodoList"
import {AddItemForm} from "./AddItemForm"
import {
	addTodoListAC,
	changeTodoListFilterAC,
	changeTodoListTitleAC,
	deleteTodoListAC,
} from "./state/todolist-reducer"
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "./state/task-reducer"
import {AppRootState} from "./state/store"

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

function AppWithRedux () {
	console.log("APP was called")
	// const todoListId1 = v1()
	// const todoListId2 = v1()
	// const [todoLists] = useReducer(todoListReducer, [
	// 	{id: todoListId1, title: "What to learn", filter: "all"},
	// 	{id: todoListId2, title: "What to buy", filter: "all"},
	// ])
	//
	// //Get initial tasks
	// const [tasks] = useReducer(taskReducer, {
	// 	[todoListId1]: [
	// 		{id: v1(), title: "HTML&CSS", isDone: true},
	// 		{id: v1(), title: "JS", isDone: true},
	// 		{id: v1(), title: "React", isDone: false},
	// 		{id: v1(), title: "Redux", isDone: false},
	// 		{id: v1(), title: "GraphQL", isDone: false},
	// 	],
	// 	[todoListId2]: [
	// 		{id: v1(), title: "Smartphone", isDone: true},
	// 		{id: v1(), title: "House", isDone: false},
	// 	],
	// })

	//Get state
	const todoLists = useSelector<AppRootState, Array<TodoListType>>(state => state.todolists)
	const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)
	const dispatch = useDispatch()

	//Add todoList
	const addTodoList = useCallback((todoListTitle: string) => {
		const action = addTodoListAC(todoListTitle)
		dispatch(action)
	}, [dispatch])

	//Delete todoList
	const deleteTodoList = useCallback((todoListId: string) => {
		const action = deleteTodoListAC(todoListId)
		dispatch(action)
	}, [dispatch])

	//Change todoList's title
	const changeTodoListTitle = useCallback((todoListId: string, todoListTitle: string) => {
		dispatch(changeTodoListTitleAC(todoListId, todoListTitle))
	}, [dispatch])

	//Change todoList's filter
	const changeTodoListFilter = useCallback((todoListId: string, filterValue: FilterValuesType) => {
		dispatch(changeTodoListFilterAC(todoListId, filterValue))
	}, [dispatch])

	//Add task
	const addTask = useCallback((todoListId: string, taskTitle: string) => {
		dispatch(addTaskAC(todoListId, taskTitle))
	}, [dispatch])

	//Delete task
	const deleteTask = useCallback((todoListId: string, taskId: string) => {
		dispatch(deleteTaskAC(todoListId, taskId))
	}, [dispatch])

	//Change task's title
	const changeTaskTitle = useCallback((todoListId: string, taskId: string, taskTitle: string) => {
		dispatch(changeTaskTitleAC(todoListId, taskId, taskTitle))
	}, [dispatch])

	//Change task's status
	const changeTaskStatus = useCallback((todoListId: string, taskId: string, status: boolean) => {
		dispatch(changeTaskStatusAC(todoListId, taskId, status))
	}, [dispatch])

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
							let tasksForTodoList = tasks[tl.id]

							return <Grid item
										 key={tl.id}>
								<Paper style={{padding: "10px"}}>
									<TodoList key={tl.id}
											  id={tl.id}
											  title={tl.title}
											  tasks={tasksForTodoList}
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

export default AppWithRedux
