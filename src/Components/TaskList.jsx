import React from 'react';

import Task from './Task';

const TaskList = (props) => {
  
  const { todoList, removeTask, completeTask } = props;
  
  return (
    <ul className="todo-list">
      {
        todoList.length > 0 &&
        todoList.map((task) => <Task task={task} key={task.id} removeTask={removeTask} completeTask={completeTask} />)}
    </ul>
  );
};

export default TaskList;
