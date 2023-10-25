import Button from '@mui/material/Button';

const Logout = ({ onLogout }) => {
	function handleLogout() {
		fetch('/logout', { method: 'DELETE' }).then((r) => {
			if (r.ok) {
				onLogout();
			}
		});
	}

	return (
		<div>
			<Button
				type="submit"
				variant="contained"
				color="primary"
				onClick={handleLogout}
			>
				Logout
			</Button>
		</div>
	);
};

export default Logout;
