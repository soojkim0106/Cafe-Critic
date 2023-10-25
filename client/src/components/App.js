import React, { useEffect, useState } from 'react';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import NavBar from './NavBar';
import Login from './Login';
import StockSimulator from './StockSimulator';
import FinancialNews from './FinancialNews';
import TrackExpenses from './TrackExpenses';
import Logout from './Logout';

function App() {
	const [user, setUser] = useState(null);
	const history = useHistory();

	function handleLogin(user) {
		setUser(user);
	}

	function handleLogout() {
		setUser(null);
		history.push('/');
	}
	// useEffect(() => {
	// 	fetch('check_session').then((response) => {
	// 		if (response.ok) {
	// 			response.json().then((user) => setUser(user));
	// 		}
	// 	});
	// }, []);

	// if (user) {
	return (
		<div>
			<NavBar />
			<Switch>
				<Route exact path="/">
					<Login onLogin={handleLogin} setUser={setUser} />
				</Route>
				<Route exact path="/stock_simulator">
					<StockSimulator />
				</Route>
				<Route exact path="/financial_news">
					<FinancialNews />
				</Route>
				<Route exact path="/track_expenses">
					<TrackExpenses />
				</Route>
				<Route exact path="/logout">
					<Logout onLogout={handleLogout} />
				</Route>
			</Switch>
		</div>
	);
	// } else {
	// 	return <Login onLogin={setUser} />;
	// }
}

export default App;
