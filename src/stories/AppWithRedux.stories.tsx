import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import Task from "../Task";
import {Provider} from "react-redux";
import {store} from "../state/store";
import AppWithRedux from "../AppWithRedux";
import ReduxStoreProviderDecorator from "./ReduxStoreProviderDecorator";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLIST/AppWithRedux',
    component: AppWithRedux,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    decorators:[ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <AppWithRedux />;

export const AppWithReduxStory = Template.bind({});




