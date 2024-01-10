import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import NavBar from './NavBar';
import Login from './Login';
import StockSimulator from './StockSimulator';
// import FinancialNews from './FinancialNews';
import ExpenseList from './ExpenseList';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Home from './Home';
import { UserContext } from './UserContext';

function App() {
	const [user, setUser] = useState(null);
	const history = useHistory();
	const location = useLocation();

	const setBudget = (budget) => {
		setUser((u) => ({ ...u, stock_budget: budget }));
	};

	function handleLogout() {
		setUser(null);
		history.push('/');
	}
	const getTitleForLocation = (pathname) => {
		switch (pathname) {
			case '/stock_simulator':
				return 'Stock Simulator';
			case '/financial_news':
				return 'Financial News';
			case '/logout':
				return 'Logout';
			case '/track_expenses':
				return 'Track Expenses';
			default:
				return 'Homepage';
		}
	};
	useEffect(() => {
		fetch('check_session').then((response) => {
			if (response.ok) {
				response.json().then((user) => setUser(user));
				console.log('user is set');
			}
		});
	}, []);

	if (user) {
		return (
			<div>
				<UserContext.Provider value={user.username}>
					<NavBar
						onLogout={handleLogout}
						title={getTitleForLocation(location.pathname)}
					/>
				</UserContext.Provider>

				<Switch>
					<Route exact path="/">
						<Home user={user} />
					</Route>
					{/* <Route exact path="/financial_news">
						<FinancialNews />
					</Route> */}
					<Route exact path="/stock_simulator">
						<StockSimulator
							user={user}
							setUser={setUser}
							setBudget={setBudget}
						/>
					</Route>
					<Route exact path="/track_expenses">
						<ExpenseList setUser={setUser} user={user} />
					</Route>
				</Switch>
			</div>
		);
	} else {
		return <Login onLogin={setUser} user={user} />;
	}
}

export default App;
