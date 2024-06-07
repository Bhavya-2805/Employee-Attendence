import { useState } from 'react';

function InputForm() {
    const [form, setForm] = useState({
        EmployeeId: ' ',
        Time: ' ',
    });

    const updateTime = () => {
        const currentTime = new Date().toLocaleTimeString();
        setForm(prevForm => ({
            ...prevForm,
            Time: currentTime
        }));
    };

    return (
        <>
            <label>
                Employee_ID:
                <input
                    value={form.EmployeeId}
                    onChange={e => {
                        setForm({
                            ...form,
                            EmployeeId: e.target.value
                        });
                    }}
                />
            </label>
            <label>
                Time:
                <input
                    value={form.Time}
                    readOnly
                />
            </label>
            <button onClick={updateTime}>Update Time</button>
            <p>
                Employee ID is {form.EmployeeId}{' '}
                <br />
                In Time is {form.Time}
            </p>
        </>
    );
}

export { InputForm };
