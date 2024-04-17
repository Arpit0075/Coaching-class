/**
 * Timer Component
 */
import React from "react";
import { useState, useEffect } from "react";

/**
 * Timer Styles
 */

const classes = {
  textStyle: {
    fontSize: "1rem",
    color: "#EDEADE",
  },
};

const Timer = ({
  min,
  sec,
  isTimerCompleted,
  totalDuration,
  examTimeStart,
  setTotalDuration,
  setOpen,
}) => {
  const initialMinute = min;
  const initialSeconds = sec;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);

  //calc time that have passed during test
  let date = Date.now();
  let timediff = date - examTimeStart;
  let currentMinutes = Math.floor(timediff / 60000);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          let flag = 1;
          isTimerCompleted(true);
          clearInterval(myInterval);
          return flag;
        } else {
          if (totalDuration) {
            // for reminding that only 10 minutes are remaining
            if (totalDuration - currentMinutes <= 10) {
              setOpen(true);
              setTotalDuration(null);
            }
          }
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });
  return (
    <div style={classes.timerStyles}>
      {minutes === 0 && seconds === 0 ? (
        <h1 style={classes.textStyle}>Time Finished</h1>
      ) : (
        <>
          <h1>
            <span style={classes.textStyle}>Time Left - </span>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </h1>
        </>
      )}
    </div>
  );
};

export default Timer;
