import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const Task = (props) => {

  const { task, removeTask, completeTask } = props;
  
  let classNames = 'completed';

  if (task.state === 'active') {
    classNames = '';
  }

  return (
    <li className={classNames}>
      <div className="view">
        <input className="toggle" type="checkbox" name={task.id} checked={task.isCompleted} onChange={completeTask} />
        <label>
          <span className="title">{task.message}</span>
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
            onClick={completeTask}
            aria-label="Edite task"
        />
        <button
          type="button"
          className="icon icon-destroy"
          onClick={() => removeTask(task.id)}
          aria-label="Delete task"
        />
      </div>
    </li>
  );
};



export default Task;

