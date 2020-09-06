import React from 'react';
// import PropTypes from 'prop-types';

const Timer = (props) => {

  const transformMsToTime = (ms) => {
    let sec = Math.floor((ms / 1000) % 60);
    let min = Math.floor((ms / (1000 * 60)) % 60);
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    sec = sec < 10 ? `0${sec}` : sec;
    min = min < 10 ? `0${min}` : min;

    if (ms >= 3600000) {
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

/* Timer.propTypes = {
  timeResult: PropTypes.string.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
}; */

export default Timer;