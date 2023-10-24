import React, { useEffect, useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import NavBar from './NavBar';
import Login from './Login';
import StockSimulator from './StockSimulator';
import FinancialNews from './FinancialNews';
import TrackExpenses from './TrackExpenses';

function App() {
	return (
		<div>
			<NavBar />
			<Switch>
				<Route exact path="/" component={Login} />
				<Route exact path="/stock_simulator" component={StockSimulator} />
				<Route exact path="/financial_news" component={FinancialNews} />
				<Route exact path="/track_expenses" component={TrackExpenses} />
			</Switch>
		</div>
	);
}

export default App;
