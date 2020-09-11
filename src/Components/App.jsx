import React, { useState } from 'react';
import uniqueId from 'lodash/uniqueId';

import NewTaskForm from './NewTaskForm';
import TaskList from './TaskList';
import Footer from './Footer';

import { TaskContext, FooterContex } from './service-context';

export default function App() {
  const [newTask, setNewTask] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [filterState, setFilterState] = useState('all');

  // Работа с NewTaskForm - start
  const handleNewTaskChang = (event) => {
    event.preventDefault();
    setNewTask(event.target.value);
  };

  const handleNewTask = (event) => {
    event.preventDefault();
    if (newTask === '') return;
    setTodoList([
      {
        id: uniqueId(),
        message: newTask,
        state: 'active',
        isCompleted: false,
        created: Date.now(),
        timer: 0,
      },
      ...todoList,
    ]);
    setNewTask('');
  };
  // Работа с NewTaskForm - end

  // Удаление задачи
  const removeTask = (id) => {
    setTodoList(todoList.filter((task) => task.id !== id));
  };

  // Выполнение задачи
  const completeTask = (event) => {
    const { name } = event.target;
    const index = todoList.findIndex((task) => task.id === name);
    const oldTask = todoList[index];
    const updatedTask = {
      ...oldTask,
      isCompleted: !oldTask.isCompleted,
      state: oldTask.state === 'active' ? 'finished' : 'active',
    };
    const newList = [...todoList.slice(0, index), updatedTask, ...todoList.slice(index + 1)];
    setTodoList(newList);
  };

  // For Footer & TaskFilter
  const countItems = todoList.filter((task) => task.state === 'active').length;

  const onClearCompleted = () => {
    const newList = todoList.filter((task) => task.state === 'active');
    setTodoList(newList);
  };

  const onFilterStateRename = (name) => {
    setFilterState(name);
  };

  // Timer
  const updateTimer = (id, timeResult) => {
    const index = todoList.findIndex((task) => task.id === id);
    const oldTodo = todoList[index];
    const newTodo = {
      ...oldTodo,
      timer: timeResult,
    };
    const newList = [...todoList.slice(0, index), newTodo, ...todoList.slice(index + 1)];
    setTodoList(newList);
  };

  // Save Editing
  const onSaveEditing = (id, title) => {
    const index = todoList.findIndex((task) => task.id === id);
    const oldTodo = todoList[index];
    const newTodo = {
      ...oldTodo,
      message: title,
    };
    const newList = [...todoList.slice(0, index), newTodo, ...todoList.slice(index + 1)];
    setTodoList(newList);
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm handleNewTaskChang={handleNewTaskChang} handleNewTask={handleNewTask} newTask={newTask} />
      </header>
      <section className="main">
        <TaskContext.Provider value={{ todoList, removeTask, completeTask, filterState, updateTimer, onSaveEditing }}>
          <TaskList />
        </TaskContext.Provider>
        <FooterContex.Provider value={{ countItems, onClearCompleted, onFilterStateRename, filterState }}>
          <Footer />
        </FooterContex.Provider>
      </section>
    </section>
  );
}
