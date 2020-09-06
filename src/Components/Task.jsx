import React, { useState, useEffect, useContext, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';

import Timer from './Timer';

import { MyContext } from './App';

const Task = (props) => {

  let timerID = useRef();
  const { task } = props;
  const { removeTask, completeTask, updateTimer } = useContext(MyContext);
  
  const [ timeStart, setTimeStart ] = useState(0);
  const [ timeTemp, setTimeTemp ] = useState(0);
  const [ timeResult, setTimeResult ] = useState(0);

  //useEffect(() => setTimeResult(task.timer), [task.timer]);
  //useEffect(() => () => clearTimeout(timerID), []);

  const tick = () => {
    setTimeResult(timeTemp + (Number(Date.now()) - timeStart));
    updateTimer(task.id, timeResult);
  }

  const onStartTimer = () => {
    console.log('start timer');
    clearTimeout(timerID.current);
    setTimeTemp(timeResult);
    setTimeStart(Number(Date.now()));

    const loop = () => {
      timerID = setTimeout(() => {
        tick();
        loop();
      }, 1000);
    };

    loop();
  };

  const onStopTimer = () => {
    console.log('stop timer');
    clearTimeout(timerID.current);
    setTimeTemp(timeResult);
  }

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
          <Timer timeResult={timeResult} onStartTimer={onStartTimer} onStopTimer={onStopTimer} />
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

