import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from 'uuid'
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValuesType = 'all' | 'active' | 'completed'
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
    [todoList_ID: string]: Array<TaskType>
}

function App() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: "I am in Turkey now", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"}
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
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

    // const [filter, setFilter] = useState<FilterValuesType>('all')


    const removeTask = (taskID: string, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== taskID)})
    }
    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id !== todoListID ? tl : {...tl, filter: filter}))
    }
    const addTask = (title: string, todoListID: string) => {
        setTasks({
            ...tasks,
            [todoListID]: [{id: v1(), title, isDone: false}, ...tasks[todoListID]]
        })
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id !== taskID ? t : {...t, isDone})})
    }
    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }
    const addTodoList = (title: string) => {
        console.log(todoLists)
        const newTodoListID = v1()
        setTodoLists([{id: newTodoListID, title, filter: 'all'}, ...todoLists])
        setTasks({[newTodoListID]: [], ...tasks})

        console.log(todoLists)
    }
    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id !== taskID ? t : {...t, title})})
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id !== todoListID ? tl : {...tl, title}))
    }

    const todoListComponents = todoLists.map(tl => {
        let tasksForRender: Array<TaskType>;
        switch (tl.filter) {
            case 'completed':
                tasksForRender = tasks[tl.id].filter(t => t.isDone);
                break;
            case 'active':
                tasksForRender = tasks[tl.id].filter(t => !t.isDone);
                break;
            default:
                tasksForRender = tasks[tl.id]
        }
        return (
            <TodoList
                todoListID={tl.id}
                title={tl.title}
                tasks={tasksForRender}
                addTask={addTask}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                changeTaskStatus={changeTaskStatus}
                filter={tl.filter}
                removeTodoList={removeTodoList}
                changeTodoListTitle={changeTodoListTitle}
                changeTaskTitle={changeTaskTitle}
            />
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
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>

            </AppBar>
            <Container fixed>
                <Grid container style={{padding:"20px 0px"}}>
                <AddItemForm addItem={addTodoList} errorColor={"blue"}/>
                </Grid>
                <Grid container>
                {todoListComponents}
                </Grid>
            </Container>
        </div>
    )
}

export default App;
