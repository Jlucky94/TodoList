import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

const EditableSpan = memo((props: EditableSpanPropsType) => {
    console.log("Editable span")
    const [title, setTitle] = useState<string>(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)
    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyDownAddItem = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && offEditMode()
    return (editMode ?
            <TextField
                variant={"standard"}
                value={title}
                autoFocus={true}
                onBlur={offEditMode}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownAddItem}

            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>

    );
})

export default EditableSpan;