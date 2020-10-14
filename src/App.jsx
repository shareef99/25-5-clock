import React, { useState } from "react";
import "./App.css";
import "date-fns";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Repeat from "../src/components/repeat";

function App() {
    const todaysDate = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
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
                    />
                </div>

                <div className="formDiv">
                    <label htmlFor="">Repeat</label>
                    <Select
                        value={repeatValue}
                        onChange={handleRepeat}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                    >
                        <MenuItem value="yearly">Yearly</MenuItem>
                        <MenuItem value="monthly">Monthly</MenuItem>
                        <MenuItem value="weekly">Weekly</MenuItem>
                    </Select>
                    <Repeat repeatValue={repeatValue} />
                </div>
                <div>
                    <label htmlFor="">End</label>
                    <Select
                        value={end}
                        onChange={handleEnd}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        variant="outlined"
                    >
                        {console.log(end)}
                        <MenuItem value="never">Never</MenuItem>
                        <MenuItem value="after">After</MenuItem>
                        <MenuItem value="onDate">On date</MenuItem>
                    </Select>
                    {end === "after" && (
                        <span>
                            <TextField
                                color="primary"
                                variant="outlined"
                                size="small"
                                id="number"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <span>executions.</span>
                        </span>
                    )}
                    {end === "onDate" && (
                        <span>
                            <TextField
                                margin="none"
                                size="small"
                                id="date"
                                type="date"
                                defaultValue="2020-12-31"
                                variant="filled"
                            />
                        </span>
                    )}
                </div>
            </section>
        </>
    );
}

export default App;
