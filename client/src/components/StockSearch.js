import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import StockCard from './StockCard';

const StockSearch = () => {
	const [symbol, setSymbol] = useState('');
	const [currentValue, setCurrentValue] = useState('');
	// const [refresh, setRefresh] = useState('')
	// const [data, setData] = ([])
	const initialValues = {
		symbol: '',
	};

	const validationSchema = Yup.object().shape({
		symbol: Yup.string()
			.required('Stock symbol is required.')
			.max(10, 'Symbol must be 10 characters or less.'),
	});

	const handleFormSubmit = async (values, { resetForm }) => {
		try {
			const response = await fetch(`/stock_data?symbol=${values.symbol}`);
			if (response.ok) {
				const data = await response.json();
				if (data && data['Time Series (5min)']) {
					const symbol = data['Meta Data']['2. Symbol'];
					const timeSeries = data['Time Series (5min)'];
					const mostRecentTimestamp = Object.keys(timeSeries)[0];
					const mostRecentData =
						data['Time Series (5min)'][mostRecentTimestamp];
					const openPrice = mostRecentData['1. open'];
					console.log('Most recent open price:', openPrice);
					setSymbol(symbol);
					setCurrentValue(openPrice);
				} else {
					console.error('Data not found in response');
				}
			} else {
				console.error('API request failed:', response.status);
			}
		} catch (error) {
			console.error('Request error:', error);
		}
	};

	return (
		<div>
			<h1>Stock Search</h1>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleFormSubmit}
			>
				<Form>
					<div className="form-group">
						<Field
							as={TextField}
							type="text"
							name="symbol"
							id="symbol"
							label="Enter stock Symbol"
							variant="outlined"
							fullWidth
							margin="normal"
							helperText={<ErrorMessage name="symbol" />}
						/>
					</div>
					<Button type="submit" variant="contained" color="primary">
						Search
					</Button>
				</Form>
			</Formik>
		</div>
	);
};

export default StockSearch;
