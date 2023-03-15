import { useEffect, useRef, useState } from "react";
import {
  getLocalStorage,
  setLocalStorage,
} from "../functions/functions";

import "./stopWatch.css";

function StopWatch() {
  const storageData = getLocalStorage("watch");
  const [time, setTime] = useState(storageData || 0);
  const countRef = useRef(null);

  const handleStart = () => {
    countRef.current = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
  };
  const handlePause = () => {
    clearInterval(countRef.current);
  };
  const handleReset = () => {
    clearInterval(countRef.current);
    setTime(0);
  };
  useEffect(() => {
    setLocalStorage("watch", time);
  }, [time]);

  const getReturnValues = () => {
    const totalMinutes = Math.floor(time / 60);
    const seconds = time % 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours === 12) {
      handlePause();
    }
    return [hours, minutes, seconds];
  };

  return (
    <div className="container">
      <div className="minContainer">
        {getReturnValues().map((el, index) => (
          <span key={index} className="numbers">
            {el}
          </span>
        ))}
      </div>
      <div className="btnWrapper">
        <button className="btnActions" onClick={handleStart}>
          start
        </button>
        <button className="btnActions" onClick={handlePause}>
          pause
        </button>
        <button className="btnActions" onClick={handleReset}>
          reset
        </button>
      </div>
    </div>
  );
}

export default StopWatch;
