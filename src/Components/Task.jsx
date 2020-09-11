import React, { useState, useEffect, useContext, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import Timer from './Timer';

import { TaskContext } from './service-context';

const Task = (props) => {
  const { task } = props;
  const { removeTask, completeTask, updateTimer, onSaveEditing } = useContext(TaskContext);

  const [seconds, setSeconds] = useState(task.timer);
  const [isActive, setIsActive] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState(task.message);

  const timerID = useRef(null);

  const onStartTimer = () => {
    clearTimeout(timerID.current);
    setIsActive(true);
  };

  const onStopTimer = () => {
    clearTimeout(timerID.current);
    setIsActive(false);
  };

  useEffect(() => {
    if (isActive) {
      clearTimeout(timerID.current);
      timerID.current = setTimeout(() => {
        setSeconds((sec) => sec + 1);
      }, 1000);
    } else if (!isActive) {
      clearTimeout(timerID.current);
    }

    if (task.isCompleted) {
      clearTimeout(timerID.current);
      setIsActive(false);
    }

    updateTimer(task.id, seconds);

    return () => clearTimeout(timerID.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, seconds, task.isCompleted, task.id]);

  let classNames = 'completed';

  if (task.state === 'active') {
    classNames = '';
  }

  if (editMode) {
    classNames = 'editing';
  }

  return (
    <li className={classNames}>
      <div className="view">
        <input className="toggle" type="checkbox" name={task.id} checked={task.isCompleted} onChange={completeTask} />
        <label>
          <span className="title">{task.message}</span>
          <Timer timeResult={seconds} onStartTimer={onStartTimer} onStopTimer={onStopTimer} />
          <span className="description">
            created&nbsp;
            {formatDistanceToNow(task.created, { includeSeconds: true })}
            &nbsp;ago
          </span>
        </label>
        <button
          type="button"
          className="icon icon-edit"
          name={task.id}
          onClick={() => setEditMode(!editMode)}
          aria-label="Edite task"
        />
        <button
          type="button"
          className="icon icon-destroy"
          onClick={() => removeTask(task.id)}
          aria-label="Delete task"
        />
      </div>
      {editMode && (
        <EditInput
          task={task}
          editValue={editValue}
          editMode={editMode}
          setEditValue={setEditValue}
          setEditMode={setEditMode}
          onSaveEditing={onSaveEditing}
        />
      )}
    </li>
  );
};

const EditInput = (props) => {
  const { task, editValue, editMode, setEditValue, onSaveEditing, setEditMode } = props;

  const onChangeEditValue = (event) => {
    event.preventDefault();
    setEditValue(event.target.value);
  };

  const onSaveEditTaskInBlur = (event) => {
    event.preventDefault();
    const title = event.currentTarget.value;
    const id = event.currentTarget.name;
    onSaveEditing(id, title);
    setEditMode(!editMode);
  };

  const onSubmitEditTask = (id, title) => (event) => {
    event.preventDefault();
    onSaveEditing(id, title);
    setEditMode(!editMode);
  };

  return (
    <form onSubmit={onSubmitEditTask(task.id, editValue)}>
      <input
        type="text"
        className="edit"
        name={task.id}
        value={editValue}
        onChange={onChangeEditValue}
        onBlur={onSaveEditTaskInBlur}
      />
    </form>
  );
};

Task.propTypes = {
  task: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};
EditInput.propTypes = {
  task: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  editValue: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
  setEditValue: PropTypes.func.isRequired,
  onSaveEditing: PropTypes.func.isRequired,
  setEditMode: PropTypes.func.isRequired,
};

export default Task;
