import { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Link } from '@mui/material';

const FinancialNews = () => {
	const [news, setNews] = useState([]);

	useEffect(() => {
		const apiKey = '2043ad26ed0541fe992e43db840eda01';
		const apiUrl = `https://newsapi.org/v2/everything?q=financial&apiKey=${apiKey}`;

		fetch(apiUrl)
			.then((r) => r.json())
			.then((data) => {
				const newsData = data.articles || [];
				setNews(newsData);
			})
			.catch((error) => {
				console.error('Error fecthing financial news.:', error);
			});
	}, []);

	return (
		<div className="newsContainer">
			<h1 className="newsHeader">Financial News</h1>
			<List className="newsList">
				{news.map((item, index) => (
					<ListItem key={index} className="newsItem">
						<ListItemText
							primary={
								<Link href={item.url} target="_blank" rel="noopener noreferrer">
									<h3 className="newsTitle">{item.title}</h3>
									<img
										src={item.urlToImage}
										alt={item.urlToImage}
										className="newsImage"
									/>
								</Link>
							}
							secondary={
								<div>
									<p className="newsSource">{item.source.name}</p>
									<p className="newsDescription">{item.description}</p>
								</div>
							}
						/>
					</ListItem>
				))}
			</List>
		</div>
	);
};

export default FinancialNews;
