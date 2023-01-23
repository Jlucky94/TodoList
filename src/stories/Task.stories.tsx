import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import Task from "../Task";
import {Provider, useSelector} from "react-redux";
import {AppRootStateType, store} from "../state/store";
import ReduxStoreProviderDecorator from "./ReduxStoreProviderDecorator";
import {TaskType} from "../TodoListWithRedux";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLIST/Task',
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const TaskWithRedux = () => {
    const task = useSelector<AppRootStateType,TaskType>(state => state.tasks['todolistId1'][0])
    return (
        <>
        <Task task={task} todoListId={'todolistId1'} />
        </>
    )
}

const Template: ComponentStory<typeof TaskWithRedux> = (args) => <TaskWithRedux />;

export const TaskIsDone = Template.bind({});
TaskIsDone.args = {
    task: {id: '123', isDone: true, title: 'New task'},
    todoListId: 'asddss'
}
;



