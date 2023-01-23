import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todo-lists-reducer";


export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

let initialState: TaskStateType = {}

type ActionType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodoListAT | RemoveTodoListAT

const tasksReducer = (state = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].filter(task => task.id != action.taskID)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.todoListID]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todoListID]],

            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(task => task.id === action.taskID ?
                    {...task, isDone: action.isDone} : task)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(task => task.id === action.taskID ?
                    {...task, title: action.title} : task)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todoListID]: []
            }
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.todoListID]
            return copyState
        default:
            return state
    }
}
export default tasksReducer;

export const removeTaskAC = (taskID: string, todoListID: string) => {
    return {type: "REMOVE-TASK", taskID, todoListID} as const
}
export const addTaskAC = (title: string, todoListID: string) => {
    return {type: "ADD-TASK", title, todoListID} as const
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string) => {
    return {type: "CHANGE-TASK-STATUS", taskID, isDone, todoListID} as const
}
export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string) => {
    return {type: "CHANGE-TASK-TITLE", taskID, title, todoListID} as const
}

