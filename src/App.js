import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AppProvider } from './context/AppContext';
import Budget from './components/Budget';
import ExpenseTotal from './components/ExpenseTotal';
import ExpenseList from './components/ExpenseList';
import AllocationForm from './components/AllocationForm';
import RemainingBudget from './components/Remaining';

const App = () => {
    const [selectedCurrency, setSelectedCurrency] = useState('$'); // Default to Dollar
    const [cost, setCost] = useState(0);

    const handleCurrencyChange = (e) => {
        setSelectedCurrency(e.target.value);
    };

  

    const submitEvent = () => {
        // Handle the form submission logic here
    };

    return (
        <AppProvider>
            <div className='container'>
                <h1 className='mt-3'>Company's Budget Allocation</h1>

                <div className='row mt-3'>
                    <div className='col-sm'>
                        <label className='mr-2'>Currency:</label>
                        
                    </div>
                </div>

              

                <div className='row mt-3'>
                    <div className='col-sm'>
                        <Budget currency={selectedCurrency} />
                    </div>
                    <div className='col-sm'>
                        <RemainingBudget currency={selectedCurrency} />
                    </div>
                    <div className='col-sm'>
                        <ExpenseTotal currency={selectedCurrency} />
                    </div>
                    <div  className='col-sm'>
                    <select
            value={selectedCurrency}
            onChange={handleCurrencyChange}  style={{ border: '1px solid green', backgroundColor: 'green', color: 'white', cursor: 'pointer', padding: '5px', marginBottom: '5px' }}
        >
            <option style={{ backgroundColor: 'green', color: 'white' }} value='$'>Dollar ($)</option>
            <option style={{ backgroundColor: 'green', color: 'white' }} value='£'>Pound (£)</option>
            <option style={{ backgroundColor: 'green', color: 'white' }} value='€'>Euro (€)</option>
            <option style={{ backgroundColor: 'green', color: 'white' }} value='₹'>Rupee (₹)</option>
        </select>

                    </div>
                    
                </div>

                <h3 className='mt-3'>Allocation</h3>
                <div className='row '>
                    <div className='col-sm'>
                        <ExpenseList currency={selectedCurrency} />
                    </div>
                </div>

                <h3 className='mt-3'>Change allocation</h3>
                <div className='row mt-3'>
                    <div className='col-sm'>
                        <AllocationForm
                            currency={selectedCurrency}
                            cost={cost}
                            setCost={setCost}
                            submitEvent={submitEvent}
                        />
                    </div>
                </div>
            </div>
        </AppProvider>
    );
};

export default App;
