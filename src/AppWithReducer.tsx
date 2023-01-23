import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from 'uuid'
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import todoListsReducer, {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC
} from "./state/todo-lists-reducer";
import tasksReducer, {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListType = {
    todoListID: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [todoList_ID: string]: Array<TaskType>
}

function AppWithReducer() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, [
        {todoListID: todoListID_1, title: "I am in Turkey now", filter: "all"},
        {todoListID: todoListID_2, title: "What to buy", filter: "all"}
    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID_1]: [
            {id: v1(), title: "Make app body", isDone: true},
            {id: v1(), title: "Put props", isDone: true},
            {id: v1(), title: "Make map method for tasks", isDone: true},
            {id: v1(), title: "Add add-function", isDone: true},
            {id: v1(), title: "Add remove-function", isDone: true},
            {id: v1(), title: "Add new switching filter method", isDone: true},
            {id: v1(), title: "Add onChange setTitle", isDone: true},
            {id: v1(), title: "Add onKeyDown add Task", isDone: true},
            {id: v1(), title: "Add trimming for add task", isDone: true},
            {id: v1(), title: "Add change task-status", isDone: true},
            {id: v1(), title: "Add error message", isDone: true},
            {id: v1(), title: "Modify all functions(add,remove etc) for several todoLists ", isDone: true},
            {id: v1(), title: "Add remove todoList func", isDone: true},
            {id: v1(), title: "Modify props for several todoLists", isDone: true},
            {id: v1(), title: "Modify return(mapping main component 'todolist') ", isDone: true},
            {id: v1(), title: "Modify switch method", isDone: true},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Strawberry", isDone: true},
            {id: v1(), title: "Potato", isDone: true},
            {id: v1(), title: "New computer", isDone: true},
        ]
    })

    const removeTask = (taskID: string, todoListID: string) => {
        dispatchToTasks(removeTaskAC(taskID, todoListID))
    }
    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        dispatchToTodoLists(changeTodoListFilterAC(filter, todoListID))
    }
    const addTask = (title: string, todoListID: string) => {
        dispatchToTasks(addTaskAC(title, todoListID))
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        dispatchToTasks(changeTaskStatusAC(taskID, isDone, todoListID))
    }
    const removeTodoList = (todoListID: string) => {
        let action = (removeTodoListAC(todoListID))
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }
    const addTodoList = (title: string) => {
        let action = addTodoListAC(title)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }
    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        dispatchToTasks(changeTaskTitleAC(taskID, title, todoListID))
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        dispatchToTodoLists(changeTodoListTitleAC(title, todoListID))
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
                    <TodoList
                        todoListID={tl.todoListID}
                        title={tl.title}
                        tasks={getTasksForRender(tl, tasks)}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeTodoListFilter={changeTodoListFilter}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                        changeTodoListTitle={changeTodoListTitle}
                        changeTaskTitle={changeTaskTitle}
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
}

export default AppWithReducer;
