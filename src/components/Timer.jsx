import { useEffect, useRef, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import {
  deleteStorage,
  getLocalStorage,
  setLocalStorage,
} from "../functions/functions";

import "./timer.css";

function Timer() {
  const localStorageData = getLocalStorage("time");
  const [hours, setHours] = useState(localStorageData?.hours || 0);
  const [minutes, setMinutes] = useState(localStorageData?.minutes || 0);
  const [seconds, setSeconds] = useState(localStorageData?.seconds || 0);
  const [isRunning, setIsRunning] = useState(
    localStorageData?.isRunning || false
  );
  const countRef = useRef(null);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (isRunning) {
      countRef.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
        } else if (minutes > 0) {
          setMinutes((minutes) => minutes - 1);
          setSeconds(59);
        } else if (hours > 0) {
          setHours((hours) => hours - 1);
          setMinutes(59);
          setSeconds(59);
        }
      }, 1000);
    }
    return () => {
      setLocalStorage("time", { hours, minutes, seconds, isRunning });
      clearInterval(countRef.current);
    };
  }, [hours, minutes, seconds, isRunning]);

  const handleStart = () => {
    if (hours !== 0 || minutes !== 0 || seconds !== 0) {
      setReset(false);
      setIsRunning(true);
    } else {
      alert("Add time");
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };
  useEffect(() => {
    deleteStorage("time");
  }, [reset]);

  const handleReset = () => {
    setReset(true);
    setIsRunning(false);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  return (
    <div className="timer">
      <div className="first">
        <input
          className="input"
          type="number"
          placeholder="Add hours"
          onChange={(e) => setHours(e.target.value)}
          defaultValue={localStorageData?.hours}
        />
        <input
          className="input"
          type="number"
          placeholder="Add minutes"
          onChange={(e) => setMinutes(e.target.value)}
          defaultValue={localStorageData?.minutes}
        />
        <input
          className="input"
          type="number"
          placeholder="Add seconds"
          onChange={(e) => setSeconds(e.target.value)}
          defaultValue={localStorageData?.seconds}
        />
        <div>
          <button onClick={handleStart} className="startPause">
            start
          </button>
          <button onClick={handlePause} className="startPause">
            pause
          </button>
          <button onClick={handleReset} className="startPause">
            reset
          </button>
        </div>
      </div>
      <div className="circleWrapper">
        <div className="circle">
          <CountdownCircleTimer
            isPlaying={minutes === 0 && seconds === 0 && isRunning}
            duration={hours}
            colors="#9147ff"
            onComplete={() => ({
              shouldRepeat: hours > 0,
            })}
          ></CountdownCircleTimer>
          <div className="hours"> {hours || 0}</div>
        </div>
        <div className="circle">
          <CountdownCircleTimer
            isPlaying={seconds === 0 && isRunning}
            duration={minutes}
            colors="#9147ff"
            onComplete={() => ({
              shouldRepeat: minutes > 0,
            })}
          ></CountdownCircleTimer>
          <div className="minutes">{minutes || 0}</div>
        </div>
        <div className="circle">
          <CountdownCircleTimer
            isPlaying={isRunning}
            duration={seconds}
            colors="#9147ff"
            onComplete={() => ({
              shouldRepeat: seconds > 0,
            })}
          ></CountdownCircleTimer>
          <div className="seconds">{seconds || 0}</div>
        </div>
      </div>
    </div>
  );
}

export default Timer;
