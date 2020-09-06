import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { formatDistanceToNow } from 'date-fns';

import Timer from './Timer';

import { MyContext } from './App';

const Task = (props) => {

  //let timerID = useRef();
  let timerID = useRef(null);
  const { task } = props;
  const { removeTask, completeTask, updateTimer } = useContext(MyContext);
  
  //const [ timeResult, setTimeResult ] = useState(0);
  const [ seconds, setSeconds ] = useState(task.timer);
  const [ isActive, setIsActive ] = useState(false);

  /* const tick = () => {
    setSeconds(sec => sec + 1);
    updateTimer(task.id, seconds);
  } */

  const onStartTimer = (timerID) => {
    console.log('start timer');
    clearTimeout(timerID.current);
    setIsActive(true);
  };

  const onStopTimer = () => {
    console.log('stop timer');
    clearTimeout(timerID.current);
    setIsActive(false);
  }

  //const start = useCallback(() => onStartTimer(), [onStartTimer]);
  //const stop = useCallback(() => onStopTimer(), [onStopTimer]);
  //const updateTick = useCallback(() => tick());
  //const update = useCallback(() => updateTimer(task.id, seconds), [task.id, seconds, updateTimer]);

  

  useEffect(() => {
    //let timerID = null;
    
    if (isActive) {
      clearTimeout(timerID.current);
      timerID.current = setTimeout(() => {
        setSeconds(sec => sec + 1);
        //update(task.id, seconds);
      }, 1000);
    } else if (!isActive) {
      clearTimeout(timerID.current);
      //update(task.id, seconds);
    }

    if (task.isCompleted) {
      clearTimeout(timerID.current);
      setIsActive(false);
      //update(task.id, seconds);
    }

    //update();
    //update(task.id, seconds);

    updateTimer(task.id, seconds);

    return () => clearTimeout(timerID.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, seconds, task.isCompleted, task.id]);

  

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

