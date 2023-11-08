import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Login = ({ onLogin, setUser, user }) => {
	const [isLogin, setIsLogin] = useState(true);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [newUsername, setNewUsername] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');

	const toggleForm = () => {
		setIsLogin(!isLogin);
	};

	function handleLoginSubmit(e) {
		e.preventDefault();
		fetch('/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		}).then((r) => {
			if (r.ok) {
				r.json().then((user) => onLogin(user));
			}
		});
	}

	function handleSignupSubmit(e) {
		e.preventDefault();
		fetch('/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				newUsername,
				newPassword,
				password_confirmation: passwordConfirmation,
			}),
		}).then((r) => {
			if (r.ok) {
				setIsLogin(!isLogin);
			}
		});
	}

	return (
		<div className="pageContainer">
			<div className="loginSignupContainer">
				<h2 className="loginHeader">{isLogin ? 'Login' : 'Create Account'}</h2>
				<form onSubmit={isLogin ? handleLoginSubmit : handleSignupSubmit}>
					{isLogin ? (
						<>
							<div style={{ display: 'block' }}>
								<TextField
									label="Username"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									required
									style={{
										width: '400px',
										backgroundColor: 'lightgray',
										borderBottomLeftRadius: '10px',
										borderBottomRightRadius: '10px',
									}}
								/>
							</div>
							<div style={{ display: 'block' }}>
								<TextField
									label="Password"
									value={password}
									type="password"
									onChange={(e) => setPassword(e.target.value)}
									required
									style={{
										width: '400px',
										backgroundColor: 'lightgray',
										borderBottomLeftRadius: '10px',
										borderBottomRightRadius: '10px',
										marginBottom: '6px',
									}}
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
									style={{
										width: '400px',
										backgroundColor: 'lightgray',
										borderBottomLeftRadius: '10px',
										borderBottomRightRadius: '10px',
									}}
								/>
							</div>
							<div style={{ display: 'block' }}>
								<TextField
									label="Create Password"
									value={newPassword}
									type="password"
									onChange={(e) => setNewPassword(e.target.value)}
									required
									style={{
										width: '400px',
										backgroundColor: 'lightgray',
										borderBottomLeftRadius: '10px',
										borderBottomRightRadius: '10px',
									}}
								/>
							</div>
							<div style={{ display: 'block' }}>
								<TextField
									label="Confirm Password"
									value={passwordConfirmation}
									type="password"
									onChange={(e) => setPasswordConfirmation(e.target.value)}
									required
									style={{
										width: '400px',
										backgroundColor: 'lightgray',
										borderBottomLeftRadius: '10px',
										borderBottomRightRadius: '10px',
										marginBottom: '6px',
									}}
								/>
							</div>
						</>
					)}
					<Button
						style={{
							backgroundColor: 'rgb(31, 182, 34)',
							width: '200px',
							height: '45px',

							borderRadius: '20px',
						}}
						type="submit"
						variant="contained"
						color="primary"
					>
						{isLogin ? 'Login' : 'Create Account'}
					</Button>
				</form>
				<Button onClick={toggleForm}>
					{isLogin ? 'Create Account' : 'Have an account? Login!'}
				</Button>
			</div>
		</div>
	);
};

export default Login;
