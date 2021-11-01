import { useState } from "react";
import "./App.css";
import Length from "./components/Length";

function App() {
    const [displayTime, setDisplayTime] = useState<number>(25 * 60);
    const [breakTime, setBreakTime] = useState<number>(5 * 60);
    const [sessionTime, setSessionTime] = useState<number>(25 * 60);
    const [timerOn, setTimeOn] = useState<boolean>(false);
    const [onBreak, setOnBreak] = useState<boolean>(false);
    const [breakAudio] = useState<HTMLAudioElement>(
        new Audio("../sounds/beep.mp3")
    );

    const playBreakSound = () => {
        breakAudio.currentTime = 0;
        breakAudio.play();
    };

    function formatTime(time: number) {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        let timer: string =
            (minutes < 10 ? "0" + minutes : minutes) +
            ":" +
            (seconds < 10 ? "0" + seconds : seconds);
        return timer;
    }

    const changeTime = (amount: number, type: string) => {
        if (type === "break") {
            if (breakTime < 60 && amount < 0) {
                return;
            }
            setBreakTime(breakTime + amount);
        } else {
            if (sessionTime < 60 && amount < 0) return;

            setSessionTime(sessionTime + amount);

            if (!timerOn) setDisplayTime(sessionTime + amount);
        }
    };

    const controlTime = () => {
        let second = 1000;
        let date = new Date().getTime();
        let nextDate = new Date().getTime() + second;
        let onBreakVariable = onBreak;

        if (!timerOn) {
            let interval = setInterval(() => {
                date = new Date().getTime();

                if (date > nextDate) {
                    setDisplayTime((prev) => {
                        if (prev <= 0 && !onBreakVariable) {
                            playBreakSound();
                            onBreakVariable = true;
                            setOnBreak(true);
                            return breakTime;
                        } else if (prev <= 0 && onBreakVariable) {
                            playBreakSound();
                            onBreakVariable = false;
                            setOnBreak(false);
                            return sessionTime;
                        }
                        return prev - 1;
                    });
                    nextDate += second;
                }
            }, 30);

            localStorage.clear();
            localStorage.setItem("interval-id", interval.toString());
        }

        if (timerOn) {
            let interval = Number(localStorage.getItem("interval-id"));
            clearInterval(interval);
        }

        setTimeOn(!timerOn);
    };

    const resetTime = () => {
        setTimeOn(false);
        setDisplayTime(25 * 60);
        setBreakTime(5 * 60);
        setSessionTime(25 * 60);
    };

    return (
        <section className="main">
            <div className="colCenter">
                <h1 className="title">25 + 5 Clock</h1>
                <div className="rowCenter">
                    <Length
                        id="break-label"
                        incrementID="break-increment"
                        decrementID="break-decrement"
                        lengthID="break-length"
                        title="Break Length"
                        formatTime={formatTime}
                        time={breakTime}
                        changeTime={changeTime}
                        type="break"
                    />
                    <Length
                        id="session-label"
                        incrementID="session-increment"
                        decrementID="session-decrement"
                        lengthID="session-length"
                        title="Session Length"
                        formatTime={formatTime}
                        time={sessionTime}
                        changeTime={changeTime}
                        type="session"
                    />
                </div>
                <div className="session-layout">
                    <div className="session-wrapper">
                        <span id="timer-label">
                            {onBreak ? "Break" : "Session"}
                        </span>
                        <div>
                            <span id="time-left">
                                {formatTime(displayTime)}
                            </span>
                        </div>
                    </div>
                    <div className="function-wrapper">
                        <button
                            className="btn"
                            id="start_stop"
                            onClick={controlTime}
                        >
                            {timerOn ? (
                                <i className="material-icons">pause</i>
                            ) : (
                                <i className="material-icons">play_arrow</i>
                            )}
                        </button>
                        <button className="btn" id="reset" onClick={resetTime}>
                            <i className="material-icons">loop</i>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default App;
