import { useEffect, useMemo, useState } from "react";
import "./timer.css";

function Timer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [time, setTime] = useState();
  const deadline = hours * 60;
  const parsedDeadline = useMemo(() => deadline, [deadline]);
  console.log(hours * 60);
  useEffect(() => {
    const interval = setInterval(() => setTime(deadline - hours), 1000);

    return () => clearInterval(interval);
  }, [parsedDeadline]);
  return (
    <div className="wrapper">
      <input
        type="text"
        placeholder="add hours"
        onChange={(e) => setHours(e.target.value)}
      />
      <input
        type="text"
        placeholder="add minutes"
        onChange={(e) => setMinutes(e.target.value)}
      />
      <input
        type="text"
        placeholder="add seconds"
        onChange={(e) => setSeconds(e.target.value)}
      />
      <div>{time}</div>
    </div>
  );
}

export default Timer;

// import { useEffect, useMemo, useState } from "react";

// const SECOND = 1000;
// const MINUTE = SECOND * 60;
// const HOUR = MINUTE * 60;
// const DAY = HOUR * 24;

// export const Timer = ({ deadline = new Date().toString() }) => {
//     const parsedDeadline = useMemo(() => Date.parse(deadline), [deadline]);
//     const [time, setTime] = useState(parsedDeadline - Date.now());

//     useEffect(() => {
//         const interval = setInterval(
//             () => setTime(parsedDeadline - Date.now()),
//             1000,
//         );

//         return () => clearInterval(interval);
//     }, [parsedDeadline]);

//     return (
//         <div className="timer">
//             {Object.entries({
//                 Days: time / DAY,
//                 Hours: (time / HOUR) % 24,
//                 Minutes: (time / MINUTE) % 60,
//                 Seconds: (time / SECOND) % 60,
//             }).map(([label, value]) => (
//                 <div key={label} className="col-4">
//                     <div className="box">
//                         <p>{`${Math.floor(value)}`.padStart(2, "0")}</p>
//                         <span className="text">{label}</span>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };
