import {TaskStateType, TodoListType} from "../App";
import todoListsReducer, {addTodoListAC} from "./todo-lists-reducer";
import tasksReducer from "./tasks-reducer";

test("ids should be equals", () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodoListType> = [];

    const action = addTodoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].todoListID;

    expect(idFromTasks).toBe(action.todoListID);
    expect(idFromTodolists).toBe(action.todoListID);
})