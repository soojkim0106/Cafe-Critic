import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Login = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [newUsername, setNewUsername] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const toggleForm = () => {
		setIsLogin(!isLogin);
	};

	return (
		<div>
			<h2>{isLogin ? 'Login' : 'Create Account'}</h2>
			<form>
				{isLogin ? (
					<>
						<div style={{ display: 'block' }}>
							<TextField
								label="Username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
						</div>
						<div style={{ display: 'block' }}>
							<TextField
								label="Password"
								value={password}
								type="password"
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
					</>
				) : (
					<>
						<div style={{ display: 'block' }}>
							<TextField
								label="Create Username"
								value={newUsername}
								onChange={(e) => setNewUsername(e.target.value)}
								required
							/>
						</div>
						<div style={{ display: 'block' }}>
							<TextField
								label="Create Password"
								value={newPassword}
								type="password"
								onChange={(e) => setNewPassword(e.target.value)}
								required
							/>
						</div>
						<div style={{ display: 'block' }}>
							<TextField
								label="Confirm Password"
								value={confirmPassword}
								type="password"
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							/>
						</div>
					</>
				)}
				<Button type="submit" variant="contained" color="primary">
					{isLogin ? 'Login' : 'Create Account'}
				</Button>
			</form>
			<Button onClick={toggleForm}>
				{isLogin ? 'Create Account' : 'Have an account? Login!'}
			</Button>
		</div>
	);
};

export default Login;
