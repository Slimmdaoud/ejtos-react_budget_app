import React, { createContext, useReducer } from 'react';

// 5. The reducer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            let total_budget_add = state.expenses.reduce(
                (previousExp, currentExp) => previousExp + currentExp.cost,
                0
            );
            total_budget_add += action.payload.cost;

            if (total_budget_add <= state.budget) {
                const updatedExpensesAdd = state.expenses.map((currentExp) => {
                    if (currentExp.name === action.payload.name) {
                        currentExp.cost += action.payload.cost;
                    }
                    return currentExp;
                });

                return {
                    ...state,
                    expenses: updatedExpensesAdd,
                };
            } else {
                alert("Cannot increase the allocation! Out of funds");
                return state;
            }
        case 'DELETE_EXPENSE':
            let total_budget_delete = state.expenses.reduce(
                (previousExp, currentExp) => previousExp - currentExp.cost,
                0
            );
            total_budget_delete -= action.payload.cost;

            if (total_budget_delete >= 0) {
                const updatedExpensesDelete = state.expenses.map((currentExp) => {
                    if (currentExp.name === action.payload.name) {
                        currentExp.cost -= action.payload.cost;
                    }
                    return currentExp;
                });

                return {
                    ...state,
                    expenses: updatedExpensesDelete,
                };
            } else {
                alert("Cannot decrease the allocation! Insufficient funds");
                return state;
            }
        case 'REDUCE_EXPENSE':
            const updatedExpensesReduce = state.expenses.map((currentExp) => {
                if (currentExp.name === action.payload.name && currentExp.cost - action.payload.cost >= 0) {
                    currentExp.cost -= action.payload.cost;
                    state.budget += action.payload.cost; // Update budget
                }
                return currentExp;
            });

            return {
                ...state,
                expenses: updatedExpensesReduce,
            };
        case 'SET_BUDGET':
            const newBudget = action.payload;
            const totalExpenses = state.expenses.reduce((total, item) => total + item.cost, 0);

            if (newBudget >= totalExpenses) {
                return { ...state, budget: newBudget };
            } else {
                alert("Budget cannot be set lower than total spending.");
                return state;
            }
        case 'CHANGE_CURRENCY':
            return {
                ...state,
                currency: action.payload,
            };
        default:
            return state;
    }
};

// 1. Sets the initial state when the app loads
const initialState = {
    budget: 2000,
    expenses: [
        { id: "Marketing", name: 'Marketing', cost: 50 },
        { id: "Finance", name: 'Finance', cost: 300 },
        { id: "Sales", name: 'Sales', cost: 70 },
        { id: "Human Resource", name: 'Human Resource', cost: 40 },
        { id: "IT", name: 'IT', cost: 500 },
    ],
    currency: '£',
};

// 2. Creates the context - this is what our components import and use to get the state
export const AppContext = createContext();

// 3. AppProvider component - wraps the components we want to give access to the state
export const AppProvider = ({ children }) => {
    // Reducer for state management
    const [state, dispatch] = useReducer(AppReducer, initialState);

    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                budget: state.budget,
                currency: state.currency,
                dispatch,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
