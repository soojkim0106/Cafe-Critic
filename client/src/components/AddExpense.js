import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import * as Yup from 'yup';

const AddExpense = ({ expenses, setExpenses, user }) => {
	const validationSchema = Yup.object().shape({
		name: Yup.string().required('Expense name required.'),
		description: Yup.string().required('Description required.'),
		cost: Yup.number().required('Please enter cost.'),
	});

	const formik = useFormik({
		initialValues: {
			name: '',
			description: '',
			cost: '',
			user_id: user.id,
		},
		validationSchema,
		onSubmit: async (values) => {
			try {
				console.log('Submitting new expense', values);

				const response = await fetch('/expenses', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(values),
				});
				if (response.ok) {
					const data = await response.json();
					if (Array.isArray(expenses)) {
						setExpenses([...expenses, data]);
					} else {
						setExpenses([data]);
					}
					formik.resetForm();
				} else {
					console.error('Failed to add new expense');
				}
			} catch (error) {
				console.error(`Error adding expense: ${error}`);
			}
		},
	});
	if (!user) {
		return <div>Loading...</div>;
	}

	return (
		<div className="addExpenseContainer">
			<h1 className="expenseTitle">Add Expense</h1>
			<form onSubmit={formik.handleSubmit}>
				<div>
					<TextField
						label="Expense Name"
						value={formik.values.name}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						required
						name="name"
						style={{ width: '400px', backgroundColor: 'lightgray' }}
					/>
					{formik.touched.name && formik.errors.name ? (
						<div className="error">{formik.errors.name}</div>
					) : null}
				</div>
				<div>
					<TextField
						label="Description"
						value={formik.values.description}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						name="description"
						required
						style={{
							width: '400px',
							backgroundColor: 'lightgray',
						}}
					/>
					{formik.touched.description && formik.errors.description ? (
						<div className="error">{formik.errors.description}</div>
					) : null}
				</div>
				<div>
					<TextField
						label="Amount"
						value={formik.values.cost}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						name="cost"
						type="number"
						inputProps={{
							step: '0.01',
						}}
						required
						style={{ width: '400px', backgroundColor: 'lightgray' }}
					/>
					{formik.touched.cost && formik.errors.cost ? (
						<div className="error">{formik.errors.cost}</div>
					) : null}
				</div>
				<Button
					style={{
						backgroundColor: 'rgb(31,182,34)',
						width: '300px',
						height: '45px',
					}}
					type="submit"
					variant="contained"
					color="primary"
				>
					Add
				</Button>
			</form>
		</div>
	);
};

export default AddExpense;
