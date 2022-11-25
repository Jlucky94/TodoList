import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

type AddItemFormPropsType = {
    addItem: (title: string) => void
    errorColor: string
}

const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {

            props.addItem(title)
        } else setError(true)
        setTitle('')
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyDownAddItem = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickAddItem()

    return (
        <div>
            <TextField
                variant={"outlined"}
                value={title}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownAddItem}
                error={error}
                size={"small"}
                label={"Your title here"}
                helperText={error && <span style={{color: props.errorColor}}>Type something</span>}
            />
            <IconButton

                size={"small"}
                onClick={onClickAddItem}
            >
                <AddCircleOutlineIcon style={{color: 'salmon'}}/>
            </IconButton>
        </div>
    );
};

export default AddItemForm;