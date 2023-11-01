import React, { useEffect, useState } from 'react';
import StockCard from './StockCard';
import YourPortfolio from './YourPortfolio';

const StockSimulator = ({ user, setUser }) => {
	const [currentStock, setCurrentStock] = useState(null);
	const [stocks, setStocks] = useState([]);
	const [userPort, setUserPort] = useState([]);

	useEffect(() => {
		fetch('/stocks')
			.then((r) => r.json())
			.then((stocks) => {
				setStocks(stocks);
				console.log(stocks);
			});
	}, []);

	useEffect(() => {
		fetch('/portfolios')
			.then((r) => r.json())
			.then((portfolio) => {
				setUserPort(portfolio);
				console.log('Portfolio', userPort);
			});
	}, []);

	const stockList = stocks.map((stock) => (
		<StockCard
			key={stock.id}
			name={stock.name}
			value={stock.value}
			id={stock.id}
			user={user}
			userPort={userPort}
			setUserPort={setUserPort}
		/>
	));

	return (
		<div>
			<div style={{ width: '500px', height: '800px', overflow: 'scroll' }}>
				<h1>Buy Stocks</h1>
				{stockList}
			</div>
			<div>
				<YourPortfolio
					user={user}
					setUser={setUser}
					userPort={userPort}
					setUserPort={setUserPort}
				/>
			</div>
		</div>
	);
};

export default StockSimulator;
