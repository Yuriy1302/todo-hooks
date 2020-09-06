import React, { useContext } from 'react';

import Task from './Task';

import { MyContext } from './App';

const TaskList = (props) => {
  
  const { todoList, filterState } = useContext(MyContext);

  const onFilterTodos = (tasks, filterState) => {
    const newTodoList = filterState === 'all' ? tasks : tasks.filter((task) => task.state === filterState);
    return newTodoList;
  }

  const filteredTodos = onFilterTodos(todoList, filterState);
  return (
    <ul className="todo-list">
      {
        filteredTodos.length > 0 &&
        filteredTodos.map((task) => <Task task={task} key={task.id} />)
      }
    </ul>
  );
};

export default TaskList;
