import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import { ListItem, ListItemText, TextField } from '@mui/material';
import Button from '@mui/material/Button';

const YourPortfolio = ({
	user,
	setUser,
	userPort,
	setUserPort,
	setBudget,
	budget,
}) => {
	const updateBudget = (newBudget) => {
		fetch('/api/user', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ stock_budget: newBudget }),
		})
			.then((r) => {
				if (r.ok) {
					console.log('Budget updated successfully');
				} else {
					console.error('Failed to update new budget');
				}
			})
			.catch((error) => {
				console.error('Error updating budget:', error);
			});
	};

	async function handleDelete(portfolioToDelete) {
		try {
			const updatedPortfolio = userPort.filter(
				(e) => e.id !== portfolioToDelete.id
			);
			setUserPort(updatedPortfolio);

			const stockId = portfolioToDelete.stock.id;
			const response = await fetch(`/stocks/${stockId}`);
			if (response.ok) {
				const stockData = await response.json();
				const stockValue = stockData.value;
				console.log(stockValue);
				const profit = stockValue * portfolioToDelete.quantity;

				const newBudget = profit + budget;
				setUser({ ...user, stock_budget: newBudget });
				setBudget(newBudget);

				updateBudget(newBudget);
			} else {
				console.error('Failed to fetch current stock value');
			}
		} catch (error) {
			console.error('Error handling delete:', error);
		}
	}

	const deletePortfolio = (port) => {
		fetch(`/portfolios/${port.id}`, {
			method: 'DELETE',
		})
			.then((response) => {
				if (response.status === 204) {
					console.log('Stock sold succesfully.');
					handleDelete(port);
				} else {
					console.error('Error deleting portfolio');
				}
			})
			.catch((error) => {
				console.error('Network error:', error);
			});
	};
	// console.log(budget);

	return (
		<div className="portfolio">
			<div className="portfolioTitle">
				<h1>Your Portfolio</h1>
			</div>
			<List className="portfolioList">
				{Array.isArray(userPort) && userPort.length > 0 ? (
					userPort.map((port) => (
						<>
							<ListItem key={port.id} className="portfolioStocks">
								<ListItemText
									primary={`${port.stock.name} Quantity: ${port.quantity} `}
									secondary={`Purchase Price: ${port.purchase_value}`}
									primaryTypographyProps={{
										style: { fontSize: '28px', textAlign: 'center' },
									}}
									secondaryTypographyProps={{
										style: { fontSize: '20px', textAlign: 'center' },
									}}
								/>
								<Button
									style={{ backgroundColor: '#1fb622', color: 'white' }}
									onClick={() => deletePortfolio(port)}
								>
									Sell!
								</Button>
							</ListItem>
						</>
					))
				) : (
					<p className="emptyPortfolio">No stocks in your portfolio.</p>
				)}
			</List>
		</div>
	);
};

export default YourPortfolio;
