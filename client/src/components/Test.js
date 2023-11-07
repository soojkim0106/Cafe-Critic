const Test = ({ budget }) => {
	return (
		<div className="stockBudget">
			<h1 className="budgetTitle">Remaining Budget</h1>
			<h1 className="budgetAmount">${budget ? budget.toFixed(2) : 'N/A'} </h1>
		</div>
	);
};

export default Test;
