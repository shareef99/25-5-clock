import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function Repeat(props) {
    // Constants
    const currentYr = new Date().getFullYear();
    const months = [
        { id: 1, month: "Jan" },
        { id: 2, month: "Feb" },
        { id: 3, month: "Mar" },
        { id: 4, month: "Apr" },
        { id: 5, month: "May" },
        { id: 6, month: "Jun" },
        { id: 7, month: "Jul" },
        { id: 8, month: "Aug" },
        { id: 9, month: "Sep" },
        { id: 10, month: "Oct" },
        { id: 11, month: "Nov" },
        { id: 12, month: "Dec" },
    ];
    /**
     *
     * @param {number} monthId
     * @param {number} year
     */
    const getDaysList = (monthId, year) => {
        const totalDays = new Date(year, monthId, 0).getDate();
        let daysList = [];
        for (let i = 1; i <= totalDays; i++) {
            daysList.push(i);
        }
        return daysList;
    };
    const daysInAWeek = [
        { id: 1, weekday: "Mon" },
        { id: 2, weekday: "Tue" },
        { id: 3, weekday: "Wed" },
        { id: 4, weekday: "Thu" },
        { id: 5, weekday: "Fri" },
        { id: 6, weekday: "Sat" },
        { id: 7, weekday: "Sun" },
    ];

    // States
    const [radioButtonValue, setRadioButtonValue] = useState("on");
    const [monthId, setMonthId] = useState(1); //default
    const [selectedDate, setSelectedDate] = useState(1); //default
    const [selectedValue, setSelectedValue] = useState("first"); //default
    const [days, setDays] = useState([...getDaysList(monthId, currentYr)]);
    const [weekdays, setWeekdays] = useState("monday");

    //Actions
    const handleRadioButton = (e) => {
        setRadioButtonValue(e.target.value);
    };

    const handleMonthsChange = (e) => {
        // console.log(e.target.value);
        const selectedMonthId = e.target.value;
        setMonthId(selectedMonthId);
        setDays([...getDaysList(selectedMonthId, currentYr)]);
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleChange = (e) => {
        setSelectedValue(e.target.value);
    };

    const handleWeekdays = (e) => {
        setWeekdays(e.target.value);
    };

    //Render
    const renderMonths = () => {
        return (
            <Select
                value={monthId}
                onChange={handleMonthsChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
            >
                {months.map((x) => (
                    <MenuItem key={x.id} value={x.id}>
                        {x.month}
                    </MenuItem>
                ))}
            </Select>
        );
    };

    /**
     *
     * @param {string} name
     */
    const renderFrequency = (name) => {
        return (
            <div>
                <span>every</span>
                {renderNumberInputField()}
                <span>{name}(s)</span>
            </div>
        );
    };
    const renderNumberInputField = () => {
        return (
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
        );
    };
    const renderWeekdays = () => {
        return (
            <>
                <Select
                    value={weekdays}
                    onChange={handleWeekdays}
                    displayEmpty
                    inputProps={{
                        "aria-label": "Without label",
                    }}
                >
                    <MenuItem value="monday">Monday</MenuItem>
                    <MenuItem value="tuesday">Tuesday</MenuItem>
                    <MenuItem value="wednesday">Wednesday</MenuItem>
                    <MenuItem value="Thursday">Thursday</MenuItem>
                    <MenuItem value="Friday">Friday</MenuItem>
                    <MenuItem value="Saturday">Saturday</MenuItem>
                    <MenuItem value="Sunday">Sunday</MenuItem>
                    <MenuItem value="Day">Day</MenuItem>
                    <MenuItem value="Weekday">Weekday</MenuItem>
                    <MenuItem value="Weekend day">Weekend day</MenuItem>
                </Select>
            </>
        );
    };

    return (
        <>
            <div>
                <RadioGroup
                    value={radioButtonValue}
                    onChange={handleRadioButton}
                >
                    {props.repeatValue === "yearly" && (
                        <div>
                            <div>
                                <FormControlLabel
                                    value="on"
                                    control={<Radio />}
                                    label="on"
                                />
                                {renderMonths()}
                                <Select
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    displayEmpty
                                    inputProps={{
                                        "aria-label": "Without label",
                                    }}
                                >
                                    {days.map((x, index) => (
                                        <MenuItem key={index} value={x}>
                                            {x}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                            <div>
                                <FormControlLabel
                                    value="onThe"
                                    control={<Radio />}
                                    label="on the"
                                />
                                <Select
                                    value={selectedValue}
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{
                                        "aria-label": "Without label",
                                    }}
                                >
                                    <MenuItem value="first">First</MenuItem>
                                    <MenuItem value="second">Second</MenuItem>
                                    <MenuItem value="third">Third</MenuItem>
                                    <MenuItem value="forth">Fourth</MenuItem>
                                    <MenuItem value="last">Last</MenuItem>
                                </Select>
                                {renderWeekdays()}
                                <span>of</span>
                                {renderMonths()}
                            </div>
                        </div>
                    )}
                    {props.repeatValue === "monthly" && (
                        <div>
                            {renderFrequency("month")}
                            <div>
                                <FormControlLabel
                                    value="on"
                                    control={<Radio />}
                                    label="on day"
                                />
                                {renderNumberInputField()}
                            </div>
                            <div>
                                <FormControlLabel
                                    value="onThe"
                                    control={<Radio />}
                                    label="on the"
                                />
                                <Select
                                    value={selectedValue}
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{
                                        "aria-label": "Without label",
                                    }}
                                >
                                    <MenuItem value="first">First</MenuItem>
                                    <MenuItem value="second">Second</MenuItem>
                                    <MenuItem value="third">Third</MenuItem>
                                    <MenuItem value="forth">Fourth</MenuItem>
                                    <MenuItem value="last">Last</MenuItem>
                                </Select>
                                {renderWeekdays()}
                            </div>
                        </div>
                    )}
                    {props.repeatValue === "weekly" && (
                        <div>
                            {renderFrequency("week")}
                            <div>
                                {daysInAWeek.map((x) => (
                                    <Button
                                        key={x.id}
                                        variant="contained"
                                        color="primary"
                                    >
                                        {x.weekday}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}
                </RadioGroup>
            </div>
        </>
    );
}
