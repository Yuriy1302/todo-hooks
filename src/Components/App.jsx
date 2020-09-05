import React, { useState, useEffect } from 'react';
import uniqueId from 'lodash/uniqueId';

import NewTaskForm from './NewTaskForm';
import TaskList from './TaskList';

const testTask = [
  { id: 1, message: 'Task 1', state: 'active', isCompleted: false },
  { id: 2, message: 'Task 2', state: 'completed', isCompleted: true },
  { id: 3, message: 'Task 3', state: 'active', isCompleted: false },
];

function App() {

  const [ newTask, setNewTask ] = useState('');
  const [ todoList, setTodoList ] = useState([]);

  // Работа с NewTaskForm - start
  const handleNewTaskChang = (event) => {
    event.preventDefault();
    setNewTask(event.target.value);
  };

  const handleNewTask = (event) => {
    event.preventDefault();
    console.log(newTask);
    if (newTask === '') return;
    setTodoList([ {
      id: uniqueId(),
      message: newTask,
      state: 'active',
      isCompleted: false,
      created: Date.now(),
      timer: 0,
    }, ...todoList]);
    setNewTask('');
  }
  // Работа с NewTaskForm - end

  // Удаление задачи
  const removeTask = (id) => {
    setTodoList(todoList.filter((task) => task.id !== id));
  }

  // Выполнение задачи
  const completeTask = (event) => {
    const { name } = event.target;
    const index = todoList.findIndex((task) => task.id === name);
    const oldTask = todoList[index];
    const updatedTask = {
      ...oldTask,
      isCompleted: !oldTask.isCompleted,
      state: oldTask.state === 'active' ? 'finished' : 'active'
    }
    const newList = [
      ...todoList.slice(0, index),
      updatedTask,
      ...todoList.slice(index + 1)
    ];
    setTodoList(newList);
  };


  return (
    <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm handleNewTaskChang={handleNewTaskChang} handleNewTask={handleNewTask} newTask={newTask} />
        </header>
        <section className="main">
          <TaskList todoList={todoList} removeTask={removeTask} completeTask={completeTask} />
          
        </section>
      </section>
  );
}

export default App;
