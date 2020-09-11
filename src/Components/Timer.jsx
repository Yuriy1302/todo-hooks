import React from 'react';
import PropTypes from 'prop-types';

const Timer = (props) => {
  const transformMsToTime = (seconds) => {
    let sec = seconds;
    let min = Math.floor(seconds / 60);
    let hours = Math.floor(seconds / 60 / 60);
    sec = sec < 10 ? `0${sec}` : sec;
    min = min < 10 ? `0${min}` : min;

    if (seconds >= 3600) {
      hours = hours < 10 ? `0${hours}` : hours;
      return `${hours}:${min}:${sec}`;
    }
    return `${min}:${sec}`;
  };

  const { timeResult, onStartTimer, onStopTimer } = props;

  return (
    <span className="description">
      <button type="button" className="icon icon-play" onClick={onStartTimer} aria-label="Start timer" />
      <button type="button" className="icon icon-pause" onClick={onStopTimer} aria-label="Stop timer" />
      {transformMsToTime(timeResult)}
    </span>
  );
};

Timer.propTypes = {
  timeResult: PropTypes.number.isRequired,
  onStartTimer: PropTypes.func.isRequired,
  onStopTimer: PropTypes.func.isRequired,
};

export default Timer;
