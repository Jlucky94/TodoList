import React, {FC, PropsWithChildren} from 'react';
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./Editable Span";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void

}
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props: PropsWithChildren<TodoListPropsType>) => {
    const addTask = (title: string) => props.addTask(title, props.todoListID)

    const taskItems = props.tasks.length ? props.tasks.map((t: TaskType) => {
            const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todoListID)
            return (
                <ListItem
                    key={t.id}
                    className={t.isDone ? 'isDone' : ''}
                    style={{padding: "0"}}
                >
                    <Checkbox
                        style={{color: "red"}}
                        checked={t.isDone}
                        onChange={(e) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)}
                    />
                    <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                    <IconButton
                        size="small"
                        onClick={() => props.removeTask(t.id, props.todoListID)}
                    >
                        <DeleteForeverIcon/>
                    </IconButton>
                </ListItem>
            )
        })
        :
        <span>TaskList is empty</span>
    const onClickCreateFilter = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListID)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton
                    size="small"
                    color={"primary"}
                    onClick={() => props.removeTodoList(props.todoListID)}
                >
                    <DeleteForeverIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} errorColor={"hotpink"}/>
            <List>
                {taskItems}
            </List>
            <div>
                <ButtonGroup
                    size="small"
                    variant="contained"
                    disableElevation

                >
                    <Button
                        color={props.filter === 'all' ? "secondary" : "primary"}
                        onClick={onClickCreateFilter('all')}
                        style={{marginRight: "3px"}}
                    >All
                    </Button>
                    <Button
                        color={props.filter === 'active' ? "secondary" : "primary"}
                        onClick={onClickCreateFilter('active')}
                        style={{marginRight: "3px"}}
                    >Active
                    </Button>
                    <Button
                        color={props.filter === 'completed' ? "secondary" : "primary"}
                        onClick={onClickCreateFilter('completed')}
                        style={{marginRight: "3px"}}
                    >Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
}

export default TodoList;
