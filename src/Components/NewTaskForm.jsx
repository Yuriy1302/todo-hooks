import React from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = (props) => {
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
};

NewTaskForm.propTypes = {
  newTask: PropTypes.string.isRequired,
  handleNewTask: PropTypes.func.isRequired,
  handleNewTaskChang: PropTypes.func.isRequired,
};

export default NewTaskForm;
