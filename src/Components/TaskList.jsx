import React, { useContext } from 'react';

import Task from './Task';

import { TaskContext } from './service-context';

const TaskList = () => {
  const { todoList, filterState } = useContext(TaskContext);

  const onFilterTodos = (tasks, filter) => {
    const newTodoList = filter === 'all' ? tasks : tasks.filter((task) => task.state === filter);
    return newTodoList;
  };

  const filteredTodos = onFilterTodos(todoList, filterState);

  return (
    <ul className="todo-list">
      {filteredTodos.length > 0 && filteredTodos.map((task) => <Task task={task} key={task.id} />)}
    </ul>
  );
};

export default TaskList;
