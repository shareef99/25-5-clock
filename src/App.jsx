import React, { useState } from "react";
import "./App.css";
import "date-fns";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Repeat from "../src/components/repeat";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    marginRightAndBottom: {
        marginRight: "10px",
        marginBottom: "10px",
    },
    marginRight: {
        marginRight: "10px",
    },
    marginTop: {
        marginTop: "10px",
    },
    width: {
        width: "70%",
    },
});

function App() {
    // Constants
    const classes = useStyles();
    const todaysDate = new Date().toISOString().split("T")[0];
    console.log(todaysDate);

    // State
    const [repeatValue, setRepeatValue] = useState("yearly"); //Default
    const [end, setEnd] = useState("never"); //Default

    // Action
    const handleRepeat = (e) => {
        setRepeatValue(e.target.value);
        console.log(e.target.value);
    };

    const handleEnd = (e) => {
        setEnd(e.target.value);
    };

    return (
        <>
            <h1>Static form</h1>
            <section className="mainSection">
                <div className="formDiv start">
                    <label htmlFor="">Start</label>
                    <TextField
                        margin="none"
                        size="small"
                        id="date"
                        type="date"
                        format="yyyy-mm-dd"
                        defaultValue={todaysDate}
                        variant="filled"
                        className={classes.marginTop}
                    />
                </div>

                <div className="formDiv repeat">
                    <label htmlFor="">Repeat</label>
                    <div>
                        <Select
                            value={repeatValue}
                            onChange={handleRepeat}
                            variant="outlined"
                            displayEmpty
                            className={classes.width}
                            inputProps={{ "aria-label": "Without label" }}
                        >
                            <MenuItem value="yearly">Yearly</MenuItem>
                            <MenuItem value="monthly">Monthly</MenuItem>
                            <MenuItem value="weekly">Weekly</MenuItem>
                        </Select>
                        <Repeat repeatValue={repeatValue} />
                    </div>
                </div>
                <div className="formDiv end">
                    <label htmlFor="">End</label>
                    <div className="displayCenter">
                        <Select
                            value={end}
                            onChange={handleEnd}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                            variant="outlined"
                            className={classes.marginRightAndBottom}
                        >
                            {console.log(end)}
                            <MenuItem value="never">Never</MenuItem>
                            <MenuItem value="after">After</MenuItem>
                            <MenuItem value="onDate">On date</MenuItem>
                        </Select>
                        {end === "after" && (
                            <div className="displayCenter">
                                <TextField
                                    color="primary"
                                    variant="outlined"
                                    size="small"
                                    id="number"
                                    type="number"
                                    className={classes.marginRight}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <p>executions</p>
                            </div>
                        )}
                        {end === "onDate" && (
                            <div>
                                <TextField
                                    margin="none"
                                    size="small"
                                    id="date"
                                    type="date"
                                    defaultValue={todaysDate}
                                    variant="filled"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default App;
