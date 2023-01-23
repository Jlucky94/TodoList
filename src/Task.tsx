import React, {ChangeEvent, memo, useCallback} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import EditableSpan from "./Editable Span";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {TaskType} from "./TodoList";
import {useDispatch} from "react-redux";

export type TaskPropsType = {
    task: TaskType
    todoListId: string
}

const Task = memo(({task,todoListId}: TaskPropsType) => {

    const dispatch = useDispatch()
    const onTitleChangeHandler = (title: string) => dispatch(changeTaskTitleAC(task.id, title, todoListId))
    const onClickHandler = () => dispatch(removeTaskAC(task.id, todoListId))
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, todoListId))
    return (
        <ListItem
            key={task.id}
            className={task.isDone ? 'isDone' : ''}
            style={{padding: "0"}}
        >
            <Checkbox
                style={{color: "red"}}
                checked={task.isDone}
                onChange={onChangeHandler}
            />
            <EditableSpan title={task.title} changeTitle={onTitleChangeHandler}/>
            <IconButton
                size="small"
                onClick={onClickHandler}
            >
                <DeleteForeverIcon/>
            </IconButton>
        </ListItem>
    )
})


export default Task;