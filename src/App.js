import React, { useState } from "react";
import './App.css';

function NameForm(props) {
    const [formData, setFormData] = useState({ name: "", time: "" });

    function changeHandle(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function submitHandler(e) {
        e.preventDefault();
        const currentTime = new Date().toLocaleTimeString(); // Get the current system time
        props.onAdd({ ...formData, time: currentTime });
        setFormData({ name: "", time: "" });
    }

    return (
        <>
            <h1>Employee Attendance</h1>
            <form onSubmit={submitHandler}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={changeHandle} required />
                <button type="submit" disabled={!formData.name}>Add The Attendance</button>
            </form>
        </>
    );
}

function ListofPeople(props) {
    return (
        <div className="list-container">
            <ul>
                {props.allWorkers.map((worker, index) => (
                    <li key={index}>
                        <span>{worker.name} checked in at {worker.time}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function App() {
    const [allWorkers, updateAllWorkers] = useState([]);

    function addName(newWorker) {
        updateAllWorkers(prevWorkers => [...prevWorkers, newWorker]);
    }

    return (
        <div className="App">
            <NameForm onAdd={addName} />
            <ListofPeople allWorkers={allWorkers} />
        </div>
    );
}

export default App;
