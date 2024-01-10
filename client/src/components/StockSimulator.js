import React, { useEffect, useState } from 'react';
import StockCard from './StockCard';
import YourPortfolio from './YourPortfolio';
import StockBudget from './StockBudget';

const StockSimulator = ({ user, setUser }) => {
	const [stocks, setStocks] = useState([]);
	const [userPort, setUserPort] = useState([]);
	const [budget, setBudget] = useState(user.stock_budget);

	useEffect(() => {
		fetch('/stocks')
			.then((r) => r.json())
			.then((stocks) => {
				setStocks(stocks);
				console.log(stocks);
			});
	}, []);

	useEffect(() => {
		fetch(`/portfolios/${user.id}`)
			.then((r) => r.json())
			.then((portfolio) => {
				setUserPort(portfolio);
			});
	}, [user.id]);

	const setStockValue = (id, value) => {
		setStocks((prevStocks) => {
			return prevStocks.map((s) => {
				if (s.id === id) {
					return { ...s, value };
				} else {
					return s;
				}
			});
		});
	};
	const setStockBehavior = (id, behavior) => {
		setStocks((prevStocks) => {
			return prevStocks.map((s) => {
				if (s.id === id) {
					return { ...s, behavior };
				} else {
					return s;
				}
			});
		});
	};
	const stockList = stocks.map((stock) => {
		return (
			<StockCard
				key={stock.id}
				name={stock.name}
				value={stock.value}
				id={stock.id}
				behavior={stock.behavior}
				setStockBehavior={setStockBehavior}
				user={user}
				userPort={userPort}
				setUserPort={setUserPort}
				setBudget={setBudget}
				budget={budget}
				setStockValue={setStockValue}
			/>
		);
	});

	return (
		<div className="simulatorContainer">
			<div className="buyStocks">
				<h1>Buy Stocks</h1>
				<div className="stockCardList">{stockList}</div>
			</div>
			<div>
				<StockBudget budget={budget} setBudget={setBudget} />
			</div>
			<div>
				<YourPortfolio
					user={user}
					setUser={setUser}
					userPort={userPort}
					setUserPort={setUserPort}
					budget={budget}
					setBudget={setBudget}
				/>
			</div>
		</div>
	);
};

export default StockSimulator;
