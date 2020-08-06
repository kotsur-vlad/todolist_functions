import {TasksStateType, TodoListType} from "../AppWithRedux"
import {addTodoListAC, todoListReducer} from "./todolist-reducer"
import {taskReducer} from "./task-reducer"

test('ids should be equals', () => {
	const startTasksState: TasksStateType = {};
	const startTodolistsState: Array<TodoListType> = [];

	const action = addTodoListAC("new todolist");

	const endTasksState = taskReducer(startTasksState, action)
	const endTodolistsState = todoListReducer(startTodolistsState, action)

	const keys = Object.keys(endTasksState);
	const idFromTasks = keys[0];
	const idFromTodolists = endTodolistsState[0].id;

	expect(idFromTasks).toBe(action.todoListId);
	expect(idFromTodolists).toBe(action.todoListId);
});
