import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from 'react-modal';

const StockCard = ({ value, name, user, id, userPort, setUserPort }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const [stockName, setStockName] = useState(name);
	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
		handleBuy(quantity, stockName);
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
			const response = await fetch('/portfolios', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			if (response.ok) {
				const data = await response.json();
				setUserPort([...userPort, data]);
				console.log('Portfolio added:', data);
			} else {
				console.error('Failed to add stock to portfolio');
			}
		} catch (error) {
			console.error('Error adding stock:', error);
		}
	};

	return (
		<Card className="stockCard">
			<CardContent>
				<Typography variant="h5" component="div">
					{stockName}
				</Typography>
				<Typography variant="body2">Value: {value}</Typography>
				<Button onClick={openModal}>Buy</Button>
				<Modal
					isOpen={modalOpen}
					onRequestClose={closeModal}
					contentLabel="Buy Stock Modal"
				>
					<h2>How many would you like to buy?</h2>
					<input
						type="number"
						value={quantity}
						onChange={(e) => setQuantity(e.target.value)}
					/>
					<button onClick={closeModal}> Confirm </button>
				</Modal>
			</CardContent>
		</Card>
	);
};
export default StockCard;
