import "../App.css";

interface Props {
    id: string;
    incrementID: string;
    decrementID: string;
    lengthID: string;
    title: string;
    changeTime: (amount: number, type: string) => void;
    formatTime: (time: number) => string;
    type: string;
    time: number;
}

const Length = (props: Props) => {
    const {
        id,
        incrementID,
        decrementID,
        lengthID,
        title,
        changeTime,
        formatTime,
        type,
        time,
    } = props;

    return (
        <div>
            <h3 id={id}>{title}</h3>
            <div className="length-wrapper">
                <button
                    className="btn"
                    id={incrementID}
                    onClick={() => changeTime(-60, type)}
                >
                    ⬇
                </button>
                <span id={lengthID}>{formatTime(time).substr(0, 2)}</span>
                <button
                    className="btn"
                    id={decrementID}
                    onClick={() => changeTime(60, type)}
                >
                    ⬆
                </button>
            </div>
        </div>
    );
};

export default Length;
