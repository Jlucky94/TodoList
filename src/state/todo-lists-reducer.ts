import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";
import TodoList from "../TodoList";

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    todoListID: string
}
export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
    todoListID: string
}
export type ChangeTodoListTypeAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    todoListID: string
}
export type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    todoListID: string
}

type ActionType =
    ChangeTodoListFilterAT
    | RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListTypeAT

let initialState: Array<TodoListType> = []

const todoListsReducer = (state = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.todoListID !== action.todoListID)
        case "ADD-TODOLIST":
            return [{todoListID: action.todoListID, title: action.title, filter: 'all'}, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.todoListID !== action.todoListID ? tl : {...tl, title: action.title})
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.todoListID !== action.todoListID ? tl : {...tl, filter: action.filter})
        default:
            return state
    }
}
export default todoListsReducer;

export const removeTodoListAC = (todoListID: string): RemoveTodoListAT => ({type: "REMOVE-TODOLIST", todoListID})
export const addTodoListAC = (title: string): AddTodoListAT => ({type: "ADD-TODOLIST", title, todoListID: v1()})
export const changeTodoListTitleAC = (title: string, todoListID: string): ChangeTodoListTypeAT => ({
    type: "CHANGE-TODOLIST-TITLE",
    title,
    todoListID
})
export const changeTodoListFilterAC = (filter: FilterValuesType, todoListID: string): ChangeTodoListFilterAT => ({
    type: "CHANGE-TODOLIST-FILTER",
    filter,
    todoListID
})
