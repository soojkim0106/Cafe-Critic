import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from 'react-modal';

const StockCard = ({
	setStockValue,
	value,
	name,
	user,
	id,
	userPort,
	setUserPort,
	behavior,
	setStockBehavior,
	budget,
	setBudget,
}) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [quantity, setQuantity] = useState(1);
	function randomNum(min, max) {
		return Math.random() * (max - min) + min;
	}
	useEffect(() => {
		const updateStockValue = () => {
			const behaviors = {
				steadyUp: randomNum(0.995, 1.03),
				wild: randomNum(0.98, 1.02),
				moderate: randomNum(0.99, 1.1),
				steadyDown: randomNum(0.98, 1.005),
				drastic: randomNum(0.98, 0.99),
			};
			const randomChange = behaviors[behavior];
			let newValue = value * randomChange;
			if (!isNaN(newValue) && isFinite(newValue)) {
				newValue = newValue.toFixed(2);
				fetch(`/stocks/${id}`, {
					method: 'PATCH',
					headers: {
						'Content-type': 'application/json',
					},
					body: JSON.stringify({ value: newValue }),
				})
					.then((r) => {
						if (r.ok) {
							setStockValue(id, newValue);
						} else {
							console.error('Failed to update stock on server');
						}
					})
					.catch((error) => {
						console.error('Error updating the stock value:', error);
					});
			} else {
				console.error('Invalid newValue:', newValue);
			}
		};
		const intervalId = setInterval(updateStockValue, 1000);
		return () => clearInterval(intervalId);
	}, [behavior, value, id, setStockValue]);

	useEffect(() => {
		function changeBehavior() {
			const behaviors = [
				'steadyUp',
				'moderate',
				'steadyDown',
				'drastic',
				'wild',
			];
			const randomBehavior =
				behaviors[Math.floor(Math.random() * behaviors.length)];

			fetch(`/stocks/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ behavior: randomBehavior }),
			})
				.then((r) => {
					if (r.ok) {
						setStockBehavior(id, randomBehavior);
					} else {
						console.error('Failed to update behavior on the server.');
					}
				})
				.catch((error) => {
					console.error('Error updating behavior:', error);
				});
		}
		function updateBehaviorPeriodically() {
			const minInterval = 20000;
			const maxInterval = 35000;
			const randomInterval =
				Math.floor(Math.random() * (maxInterval - minInterval + 1)) +
				minInterval;

			setTimeout(() => {
				changeBehavior();
				updateBehaviorPeriodically();
			}, randomInterval);
		}
		updateBehaviorPeriodically();
	}, [changeBehavior]);

	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
		handleBuy(quantity, name);
		console.log('Quantity:', quantity);
	};

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

	const handleBuy = async (stock) => {
		try {
			console.log('Adding stock to portfolio...', stock);
			const data = {
				stock_id: id,
				user_id: user.id,
				quantity: parseInt(quantity),
				purchase_value: value,
			};

			const cost = value * quantity;

			if (budget >= cost) {
				const newBudget = budget - cost;
				updateBudget(newBudget);
				setBudget(newBudget);

				console.log('New Budget:', newBudget);

				const response = await fetch('/portfolios', {
					method: 'POST',
					headers: {
						'Content-type': 'application/json',
					},
					body: JSON.stringify(data),
				});

				if (response.ok) {
					const data = await response.json();
					if (Array.isArray(userPort)) {
						setUserPort([...userPort, data]);
					} else {
						setUserPort([data]);
					}
					console.log('Portfolio added:', data);
				} else {
					console.error('Failed to add stock to portfolio');
				}
			} else {
				alert('Not enough budget to buy this stock');
			}
		} catch (error) {
			console.error('Error adding stock:', error);
		}
	};

	return (
		<Card className="stockCard">
			<CardContent className="stockCardContent">
				<Typography variant="h4" component="div">
					{name}
				</Typography>
				<Typography color="gray" variant="h5">
					Value: ${value}
				</Typography>
				<Button
					style={{ backgroundColor: '#1fb622', color: 'white' }}
					onClick={openModal}
				>
					Buy
				</Button>
				<Modal
					isOpen={modalOpen}
					onRequestClose={closeModal}
					contentLabel="Buy Stock Modal"
					className="modal"
					overlayClassName="modalOverlay"
				>
					<div className="displayBox">
						<h2>How many would you like to buy?</h2>
						<input
							className="quantityInput"
							type="number"
							value={quantity}
							onChange={(e) => setQuantity(e.target.value)}
						/>
						<button className="confirmButton" onClick={closeModal}>
							{' '}
							Confirm{' '}
						</button>
					</div>
				</Modal>
			</CardContent>
		</Card>
	);
};
export default StockCard;
