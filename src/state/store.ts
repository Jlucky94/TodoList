import tasksReducer from './tasks-reducer';
import todoListsReducer from "./todo-lists-reducer";
import {combineReducers, createStore, legacy_createStore} from 'redux' ;


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})


export const store = legacy_createStore(rootReducer);


export type AppRootStateType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store;
