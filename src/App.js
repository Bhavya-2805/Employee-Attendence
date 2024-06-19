import React, { useState, useEffect } from "react";
import './App.css';

function NameForm(props) {
    const [checkInData, setCheckInData] = useState({ name: "" });
    const [checkOutData, setCheckOutData] = useState({ name: "" });

    function handleCheckInChange(e) {
        setCheckInData({ ...checkInData, [e.target.name]: e.target.value });
    }

    function handleCheckOutChange(e) {
        setCheckOutData({ ...checkOutData, [e.target.name]: e.target.value });
    }

    function handleCheckInSubmit(e) {
        e.preventDefault();
        const currentTime = new Date().toLocaleTimeString(); // Get the current system time
        props.onCheckIn({ ...checkInData, time: currentTime });
        setCheckInData({ name: "" });
    }

    function handleCheckOutSubmit(e) {
        e.preventDefault();
        const currentTime = new Date().toLocaleTimeString(); // Get the current system time
        // Check if the worker is currently checked in
        if (props.checkedInWorkers.includes(checkOutData.name)) {
            props.onCheckOut({ ...checkOutData, time: currentTime });
            setCheckOutData({ name: "" });
        } else {
            alert(`Cannot check out. ${checkOutData.name} has not checked in.`);
        }
    }

    return (
        <>
            <h1>Employee Attendance</h1>
            <div className="form-section">
                <form onSubmit={handleCheckInSubmit}>
                    <h2>Check In</h2>
                    <input type="text" name="name" placeholder="Name" value={checkInData.name} onChange={handleCheckInChange} required />
                    <button type="submit" disabled={!checkInData.name}>Check In</button>
                </form>
                <form onSubmit={handleCheckOutSubmit}>
                    <h2>Check Out</h2>
                    <input type="text" name="name" placeholder="Name" value={checkOutData.name} onChange={handleCheckOutChange} required />
                    <button type="submit" disabled={!checkOutData.name}>Check Out</button>
                </form>
            </div>
        </>
    );
}

function ListofPeople(props) {
    // Function to find the corresponding check-in entry for a worker
    function findCheckInEntry(workerName) {
        return props.checkInData.find(entry => entry.name === workerName);
    }

    return (
        <div className="list-container">
            <div className="list-section">
                <h2>Check In/Out Data</h2>
                <ul>
                    {/* Map through check-out data to display */}
                    {props.checkOutData.map((worker, index) => (
                        <li key={index}>
                            <span>{worker.name} checked out at {worker.time}</span>
                            {/* Find corresponding check-in entry */}
                            {findCheckInEntry(worker.name) &&
                                <span> (Checked in at {findCheckInEntry(worker.name).time})</span>
                            }
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function ResetForm(props) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    function handleIdChange(e) {
        setId(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleResetSubmit(e) {
        e.preventDefault();
        if (id === "123456" && password === "Kavya") {
            props.onReset();
            setId("");
            setPassword("");
        } else {
            alert("Invalid ID or Password.");
        }
    }

    return (
        <form className="reset-form" onSubmit={handleResetSubmit}>
            <h2>Reset Data</h2>
            <input type="text" placeholder="ID" value={id} onChange={handleIdChange} required />
            <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required />
            <button type="submit">Reset</button>
        </form>
    );
}

function App() {
    const [checkInData, setCheckInData] = useState([]);
    const [checkOutData, setCheckOutData] = useState([]);
    const [checkedInWorkers, setCheckedInWorkers] = useState([]);

    // Load data from localStorage on mount
    useEffect(() => {
        const storedCheckInData = JSON.parse(localStorage.getItem("checkInData")) || [];
        const storedCheckOutData = JSON.parse(localStorage.getItem("checkOutData")) || [];
        const storedCheckedInWorkers = JSON.parse(localStorage.getItem("checkedInWorkers")) || [];
        setCheckInData(storedCheckInData);
        setCheckOutData(storedCheckOutData);
        setCheckedInWorkers(storedCheckedInWorkers);
    }, []);

    // Save data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("checkInData", JSON.stringify(checkInData));
        localStorage.setItem("checkOutData", JSON.stringify(checkOutData));
        localStorage.setItem("checkedInWorkers", JSON.stringify(checkedInWorkers));
    }, [checkInData, checkOutData, checkedInWorkers]);

    function handleCheckIn(newCheckIn) {
        setCheckInData(prevCheckIns => [...prevCheckIns, newCheckIn]);
        setCheckedInWorkers(prevWorkers => [...prevWorkers, newCheckIn.name]);
    }

    function handleCheckOut(newCheckOut) {
        setCheckOutData(prevCheckOuts => [...prevCheckOuts, newCheckOut]);
        setCheckedInWorkers(prevWorkers => prevWorkers.filter(name => name !== newCheckOut.name));
    }

    function handleReset() {
        setCheckInData([]);
        setCheckOutData([]);
        setCheckedInWorkers([]);
        localStorage.removeItem("checkInData");
        localStorage.removeItem("checkOutData");
        localStorage.removeItem("checkedInWorkers");
    }

    return (
        <div className="App">
            <NameForm onCheckIn={handleCheckIn} onCheckOut={handleCheckOut} checkInData={checkInData} checkedInWorkers={checkedInWorkers} />
            <ListofPeople checkInData={checkInData} checkOutData={checkOutData} />
            <ResetForm onReset={handleReset} />
        </div>
    );
}

export default App;
