import React from 'react';
import {Meta, Story} from '@storybook/react';

import {Task, TaskPropsType} from "../Task";
import {action} from "@storybook/addon-actions";
import {TaskPriorities, TaskStatuses} from "../api/api";

export default {
    title: 'TodoList/Task',
    component: Task,
} as Meta;

const changeTaskStatusCallback = action('Status changed inside Task')
const changeTaskTitleCallback = action('Title changed inside Task')
const removeTasksCallback = action('Remove Button inside Task clicked')

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTasks: removeTasksCallback,
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: '1', title: 'JS', status: TaskStatuses.Completed, deadline: "", startDate: "", addedDate: "", description: "", order: 1, priority: TaskPriorities.Low, todoListId: ""},
}

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: '1', title: 'JS', status: TaskStatuses.New, deadline: "", startDate: "", addedDate: "", description: "", order: 1, priority: TaskPriorities.Low, todoListId: ""},
}
