import React, {memo, useCallback, useEffect} from 'react';
import {FilterValuesType, TodoListType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./Editable Span";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC} from "./state/todo-lists-reducer";
import Task from "./Task";


type TodoListPropsType = {
    todoList: TodoListType
}
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

const TodoListWithRedux = memo(({todoList}: TodoListPropsType) => {
    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todoList.todoListID])
    const dispatch = useDispatch()
    const addTask = useCallback((title: string) => dispatch(addTaskAC(title, todoList.todoListID)), [dispatch, todoList.todoListID])
    switch (todoList.filter) {
        case 'completed':
            tasks = tasks.filter(t => t.isDone);
            break;
        case 'active':
            tasks = tasks.filter(t => !t.isDone);
            break;
        default:
            break;
    }

    const onClickCreateFilter = (filter: FilterValuesType) => () => {
        dispatch(changeTodoListFilterAC(filter, todoList.todoListID))
    }
    const changeTodoListTitle = useCallback((title: string) => dispatch(changeTodoListTitleAC(title, todoList.todoListID)), [dispatch, todoList.todoListID])
    return (
        <div>
            <h3>
                <EditableSpan title={todoList.title} changeTitle={changeTodoListTitle}/>
                <IconButton
                    size="small"
                    color={"primary"}
                    onClick={() => dispatch(removeTodoListAC(todoList.todoListID))}
                >
                    <DeleteForeverIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} errorColor={"hotpink"}/>
            <List>
                {tasks.length ? tasks.map((t: TaskType) => <Task key={t.id} task={t} todoListId={todoList.todoListID}/>)
                    :
                    <span>TaskList is empty</span>}
            </List>
            <div>
                <ButtonGroup
                    size="small"
                    variant="contained"
                    disableElevation
                >
                    <Button
                        color={todoList.filter === 'all' ? "secondary" : "primary"}
                        onClick={onClickCreateFilter('all')}
                        style={{marginRight: "3px"}}
                    >All
                    </Button>
                    <Button
                        color={todoList.filter === 'active' ? "secondary" : "primary"}
                        onClick={onClickCreateFilter('active')}
                        style={{marginRight: "3px"}}
                    >Active
                    </Button>
                    <Button
                        color={todoList.filter === 'completed' ? "secondary" : "primary"}
                        onClick={onClickCreateFilter('completed')}
                        style={{marginRight: "3px"}}
                    >Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
})

export default TodoListWithRedux;
