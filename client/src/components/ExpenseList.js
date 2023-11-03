import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AddExpense from './AddExpense';
import List from '@mui/material/List';
import { ListItem, ListItemText, TextField } from '@mui/material';
import Button from '@mui/material/Button';

const ExpenseList = ({ user, setUser }) => {
	const [expenses, setExpenses] = useState([]);
	const [editingExpense, setEditingExpense] = useState(null);
	const [startingBudget, setStartingBudget] = useState(0);
	const [endBudget, setEndBudget] = useState(0);

	useEffect(() => {
		if (Array.isArray(expenses) && expenses.length > 0) {
			const totalExpenseCost = expenses.reduce(
				(total, expense) => total + expense.cost,
				0
			);

			// Calculate the remaining budget
			setEndBudget((startingBudget - totalExpenseCost).toFixed(2));
		}
	}, [startingBudget, expenses]);

	const handleBudgetChange = (event) => {
		setStartingBudget(event.target.value);
	};

	const updateExpense = (expense, updatedExpense) => {
		fetch(`/expenses/${expense.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedExpense),
		})
			.then((response) => {
				if (response.status === 202) {
					console.log('Expense updated successfully');
					const updatedExpenses = expenses.map((e) => {
						if (e.id === expense.id) {
							return { ...e, ...updatedExpense };
						}
						return e;
					});
					setExpenses(updatedExpenses);
				} else {
					console.error('Error updating expense');
				}
			})
			.catch((error) => {
				console.error('Network error', error);
			});
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string().required('Expense name required.'),
		description: Yup.string().required('Description is required'),
		cost: Yup.number().required('Cost is required.'),
	});

	const formik = useFormik({
		initialValues: {
			name: '',
			description: '',
			cost: '',
		},
		validationSchema,
		onSubmit: (values) => {
			updateExpense(editingExpense, values);
			setEditingExpense(null);
		},
	});
	const handleEditExpense = (expense) => {
		setEditingExpense(expense);

		formik.setValues({
			name: expense.name,
			description: expense.description,
			cost: expense.cost,
		});
	};

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
		fetch(`/expenses/${user.id}`)
			.then((r) => r.json())
			.then((expense) => {
				setExpenses(expense);
				console.log('Expenses', expenses);
			});
	}, []);

	console.log('User', user);

	return (
		<div>
			<h1>Expense List</h1>
			<TextField
				label="Monthly Budget"
				type="number"
				value={startingBudget}
				onChange={handleBudgetChange}
			/>
			<TextField
				label="Remaining Budget"
				type="number"
				value={endBudget}
				disabled
			/>
			<List>
				{Array.isArray(expenses) && expenses.length > 0 ? (
					expenses.map((expense) => (
						<ListItem key={expense.id}>
							{editingExpense === expense ? (
								<form onSubmit={formik.handleSubmit}>
									<TextField
										name="name"
										label="Expense Name"
										value={formik.values.name}
										onChange={formik.handleChange}
									/>
									{formik.touched.name && formik.errors.name ? (
										<div className="error">{formik.errors.name}</div>
									) : null}
									<TextField
										name="description"
										label="Expense description"
										value={formik.values.description}
										onChange={formik.handleChange}
									/>
									{formik.touched.description && formik.errors.description ? (
										<div className="error">{formik.errors.description}</div>
									) : null}
									<TextField
										name="cost"
										label="Expense cost"
										value={formik.values.cost}
										onChange={formik.handleChange}
										type="number"
										inputProps={{ step: '0.01' }}
									/>
									{formik.touched.cost && formik.errors.cost ? (
										<div className="error"> {formik.errors.cost}</div>
									) : null}
									<Button type="submit" variant="contained" color="primary">
										Save
									</Button>
								</form>
							) : (
								<>
									<ListItemText
										primary={expense.name}
										secondary={`${expense.description}, Cost: $${expense.cost}`}
									/>
									<Button onClick={() => deleteExpense(expense)}>Delete</Button>
									<Button onClick={() => handleEditExpense(expense)}>
										Edit Expense
									</Button>
								</>
							)}
						</ListItem>
					))
				) : (
					<p>No expenses.</p>
				)}
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
