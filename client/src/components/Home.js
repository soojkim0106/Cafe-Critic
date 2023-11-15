import { Typography } from '@mui/material';

const Home = () => {
	return (
		<div className="fullHome">
			<div className="homeContainer">
				<Typography className="homeInfo" variant="h4" gutterBottom>
					Welcome to FinEd, a website designed to help people better understand
					finances. Learn to make better financial decisions on the Financial
					News page, keep track of your budget in Track Expenses, or practice
					buying and selling stocks with the Stock Simulator.
				</Typography>
			</div>

			<div className="infoContainer">
				<div className="sectionContainer">
					<a href="stock_simulator">
						<h1>Stock Simulator</h1>
					</a>
					<p>
						Practice buying and selling stocks in a simulator designed to mimic
						trends of the real stock market. Start with a budget of $30,000 and
						see what you can turn it into.
					</p>
				</div>
				<div className="sectionContainer">
					<a href="financial_news">
						<h1>Financial News</h1>
					</a>
					<p>
						Learn about topics ranging from current stock market trends to tips
						on how you can better save money with articles updated frequently
						with the help of the AlphaAdvantage API.
					</p>
				</div>
				<div className="sectionContainer">
					<a href="track_expenses">
						<h1>Track Expenses</h1>
					</a>

					<p>
						See where the money from your paycheck is going by entering your
						monthly budget, then add your expenses to see how much you have left
						over. Expenses are tied to users and can be modified or deleted at
						any point.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Home;
