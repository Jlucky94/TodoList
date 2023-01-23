import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AddItemForm from "../AddItemForm";
import {action} from "@storybook/addon-actions";
import {IconButton, TextField} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLIST/AddItemForm',
  component: AddItemForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    addItem: {
      description: 'Add button clicked '
    },
  },
} as ComponentMeta<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

const TemplateWithError: ComponentStory<typeof AddItemForm> = (args) => {
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<boolean>(true)
  const onClickAddItem =  () => {
    const trimmedTitle = title.trim()
    if (trimmedTitle) {

      args.addItem(title)
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
            helperText={error && <span style={{color: args.errorColor}}>Type something</span>}
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

export const AddItemFormBasic = Template.bind({});
AddItemFormBasic.args = {
  addItem:action('Add button clicked')
}
;
export const AddItemFormWithError = TemplateWithError.bind({});
AddItemFormWithError.args = {
  addItem:action('Add button clicked')
}
;


