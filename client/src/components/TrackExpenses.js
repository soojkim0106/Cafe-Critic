import ExpenseContainer from './ExpenseContainer';

const TrackExpenses = ({ user, setUser }) => {
	return (
		<div>
			<h1>Expenses</h1>
			<ExpenseContainer user={user} setUser={setUser} />
		</div>
	);
};

export default TrackExpenses;
