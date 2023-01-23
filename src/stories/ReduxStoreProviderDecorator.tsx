import React from 'react';
import {Provider} from "react-redux";
import {combineReducers, legacy_createStore} from "redux";
import tasksReducer from "../state/tasks-reducer";
import todoListsReducer from "../state/todo-lists-reducer";
import {v1} from "uuid";
import {AppRootStateType} from "../state/store";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})
const initialStoryBookState:AppRootStateType = {
    todoLists: [
        {todoListID: 'todolistId1', title: "To buy", filter: 'all'},
        {todoListID: 'todolistId2', title: "To sell", filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: "Task 1", isDone: true},
            {id: v1(), title: "Task 2", isDone: false},
            {id: v1(), title: "Task 3", isDone: false},
        ],
        ['todolistId2']: [
            {id: v1(), title: "Task 1", isDone: true},
            {id: v1(), title: "Task 2", isDone: false},
            {id: v1(), title: "Task 3", isDone: false},
        ]
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialStoryBookState)

export const ReduxStoreProviderDecorator = (storyFn: () => JSX.Element) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};

export default ReduxStoreProviderDecorator;