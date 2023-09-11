import React, { useContext } from 'react';
import { TiDelete } from 'react-icons/ti';
import { AppContext } from '../context/AppContext';
import { AiFillPlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
const ExpenseItem = (props) => {
    const { dispatch } = useContext(AppContext);

    // Function to increase allocation
    const increaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 5,
        };

        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense
        });
    };

    // Function to decrease allocation
    const decreaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: -5,
        };

        dispatch({
            type: 'ADD_EXPENSE', // This might be a mistake, should it be 'DECREASE_EXPENSE'?
            payload: expense
        });
    };

    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: props.id, // Assuming props.id is the ID of the expense to delete
        });
    };

    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.currency}{props.cost}</td>
            <td><AiFillPlusCircle size='2.2em' color="green" onClick={() => increaseAllocation(props.name)}></AiFillPlusCircle></td>
            <td><AiOutlineMinusCircle size='2.2em' color="red" onClick={() => decreaseAllocation(props.name)}></AiOutlineMinusCircle></td>
            
            <td><TiDelete size='1.5em' onClick={handleDeleteExpense} /></td>
        </tr>
    );
};

export default ExpenseItem;
