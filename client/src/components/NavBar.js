import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const NavBar = ({ title, onLogout }) => {
	const [drawerOpen, setDrawerOpen] = useState(false);

	const toggleDrawer = () => {
		setDrawerOpen(!drawerOpen);
	};

	function handleLogout() {
		fetch('/logout', { method: 'DELETE' }).then((r) => {
			if (r.ok) {
				onLogout();
			}
		});
	}

	return (
		<div>
			<AppBar position="static" style={{ backgroundColor: 'rgb(31,182,34)' }}>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="menu"
						onClick={toggleDrawer}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" style={{ flex: 1, fontSize: '24px' }}>
						{title}
					</Typography>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						onClick={handleLogout}
						style={{ backgroundColor: 'rgb(50,50,60' }}
					>
						Logout
					</Button>
				</Toolbar>
			</AppBar>

			<Drawer open={drawerOpen} onClose={toggleDrawer}>
				<List>
					<ListItem
						button
						onClick={toggleDrawer}
						component={Link}
						to="/stock_simulator"
					>
						<ListItemText primary="Stock Simulator" />
					</ListItem>
					<ListItem
						button
						onClick={toggleDrawer}
						component={Link}
						to="/financial_news"
					>
						<ListItemText primary="Financial News" />
					</ListItem>
					<ListItem
						button
						onClick={toggleDrawer}
						component={Link}
						to="/track_expenses"
					>
						<ListItemText primary="Track Expenses" />
					</ListItem>
				</List>
			</Drawer>
		</div>
	);
};

export default NavBar;
