import ExpenseList from './ExpenseList';

const ExpenseContainer = ({ user, setUser }) => {
	return (
		<div>
			<h1>ExpenseContainer</h1>
			<ExpenseList user={user} setUser={setUser} />
		</div>
	);
};

export default ExpenseContainer;
