import React from 'react';

const newTaskForm = (props) => {

  const { newTask, handleNewTaskChang, handleNewTask } = props;

  return (
    <form onSubmit={handleNewTask}>
      <input
        className="new-todo"
        onChange={handleNewTaskChang}
        value={newTask}
        placeholder="What needs to be done?"
        required
      />
    </form>
  );
}

export default newTaskForm;