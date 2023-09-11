
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = (props) => {
    const { budget } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);
    const [errorMessage, setErrorMessage] = useState('');

    const handleBudgetChange = (event) => {
        const newValue = event.target.value;
        if (newValue > 20000) {
            alert('Budget cannot exceed 20000');
        } else {
            setErrorMessage('');
            setNewBudget(newValue);
        }
    }

    return (
        <div className='alert alert-secondary'>
            <span>Budget: {props.currency} </span>
            <input type="number" step="10" value={newBudget} onChange={handleBudgetChange}></input>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default Budget;
