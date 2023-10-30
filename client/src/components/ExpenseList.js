import { useState, useEffect } from 'react';
import AddExpense from './AddExpense';
import List from '@mui/material/List';
import { ListItem, ListItemText } from '@mui/material';
import Button from '@mui/material/Button';

const ExpenseList = ({ user, setUser }) => {
	const [expenses, setExpenses] = useState([]);
	// const [user, setUser] = useState(null);

	function handleDelete(expenseToDelete) {
		const updatedExpenses = expenses.filter((e) => e.id !== expenseToDelete.id);
		setExpenses(updatedExpenses);
	}

	const deleteExpense = (expense) => {
		fetch(`/expenses/${expense.id}`, {
			method: 'DELETE',
		})
			.then((response) => {
				if (response.status === 204) {
					console.log('Expense deleted succesfully.');
					handleDelete(expense);
				} else {
					console.error('Error deleting product');
				}
			})
			.catch((error) => {
				console.error('Network error:', error);
			});
	};

	useEffect(() => {
		fetch('/api/user')
			.then((response) => response.json())
			.then((userData) => {
				setUser(userData);
			});
		if (user && user.id) {
			fetch(`/expenses?user_id=${user.id}`)
				.then((r) => r.json())
				.then((expenses) => {
					setExpenses(expenses);
				});
		}
	}, []);

	return (
		<div>
			<h1>Expense List</h1>
			<List>
				{expenses.map((expense) => (
					<ListItem key={expense.id}>
						<ListItemText
							primary={expense.name}
							secondary={`${expense.description}, Cost: $${expense.cost}`}
						/>
						<Button onClick={() => deleteExpense(expense)}>Delete</Button>
					</ListItem>
				))}
			</List>
			<AddExpense
				setExpenses={setExpenses}
				expenses={expenses}
				user={user}
				setUser={setUser}
			/>
		</div>
	);
};

export default ExpenseList;
