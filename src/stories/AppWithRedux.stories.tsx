import React from 'react';
import { Story, Meta } from '@storybook/react';

import AppWithRedux from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";

export default {
    title: 'TodoList/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator],
    argTypes: {},
} as Meta;

const Template: Story = (args) => <AppWithRedux {...args} />;

export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {}

