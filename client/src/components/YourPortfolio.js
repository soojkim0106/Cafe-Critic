import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import { ListItem, ListItemText, TextField } from '@mui/material';
import Button from '@mui/material/Button';

const YourPortfolio = ({ user, setUser, userPort, setUserPort }) => {
	console.log('User', user);

	function handleDelete(portfolioToDelete) {
		const updatedPortfolio = userPort.filter(
			(e) => e.id !== portfolioToDelete.id
		);
		setUserPort(updatedPortfolio);
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

	return (
		<div>
			<h1>Your Portfolio</h1>
			<List>
				{Array.isArray(userPort) && userPort.length > 0 ? (
					userPort.map((port) => (
						<>
							<ListItem key={port.id}>
								<ListItemText
									primary={`${port.stock.name} Quantity: ${port.quantity} `}
									secondary={`Purchase Price: ${port.purchase_value}`}
								/>
								<Button onClick={() => deletePortfolio(port)}>Sell!</Button>
							</ListItem>
						</>
					))
				) : (
					<p>No stocks in your portfolio.</p>
				)}
			</List>
		</div>
	);
};

export default YourPortfolio;
