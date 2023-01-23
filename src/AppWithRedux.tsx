import React, {useCallback} from 'react';
import './App.css';
import {TaskType} from "./TodoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC
} from "./state/todo-lists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import TodoListWithRedux from "./TodoListWithRedux";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListType = {
    todoListID: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [todoList_ID: string]: Array<TaskType>
}

const AppWithRedux = () => {

    let todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists)
    let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const removeTask = (taskID: string, todoListID: string) => {
        dispatch(removeTaskAC(taskID, todoListID))
    }
    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        dispatch(changeTodoListFilterAC(filter, todoListID))
    }
    const addTask = (title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
    }
    const removeTodoList = (todoListID: string) => {
        let action = (removeTodoListAC(todoListID))
        dispatch(action)
    }
    const addTodoList = useCallback((title: string) => {
        let action = addTodoListAC(title)
        dispatch(action)
    }, [dispatch])
    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todoListID))
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        dispatch(changeTodoListTitleAC(title, todoListID))
    }
    const getTasksForRender = (todolist: TodoListType, tasks: TaskStateType) => {
        let tasksForRender: Array<TaskType>;
        switch (todolist.filter) {
            case 'completed':
                tasksForRender = tasks[todolist.todoListID].filter(t => t.isDone);
                break;
            case 'active':
                tasksForRender = tasks[todolist.todoListID].filter(t => !t.isDone);
                break;
            default:
                tasksForRender = tasks[todolist.todoListID]
        }
        return tasksForRender
    }
    const todoListComponents = todoLists.map(tl => {

        return (
            <Grid item key={tl.todoListID}>
                <Paper elevation={20} style={{padding: "20px"}}>
                    <TodoListWithRedux
                        key={tl.todoListID}
                        todoList={tl}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        To-do Lists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>

            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0px"}}>
                    <AddItemForm addItem={addTodoList} errorColor={"blue"}/>
                </Grid>
                <Grid container spacing={3} justifyContent={"center"}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    )
};

export default AppWithRedux;
