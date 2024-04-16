import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (formData) => {
    console.log('Logging in user:', formData);
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        console.log('Logged in successfully');
    } catch (error) {
        console.error('Login error:', error);
    }
};

  const register = async (formData) => {
    console.log(formData)
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Registration failed');
      }
  
      console.log('User registered successfully');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const postTimeLog = async (timeLogData) => {
    console.log('timelogsdataobject',timeLogData[0])
    try {
      const response = await fetch('/timelogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(timeLogData),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to post time log');
      }
  
      console.log('Time log posted successfully');
      return response.json(); // Assuming the backend sends back some data
    } catch (error) {
      console.error('Error posting time log:', error.message);
      throw error; // Rethrow for handling by calling components
    }
  };
  const logout = async () => {
    console.log('Logging out user');
    try {
        const response = await fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include JWT token
            },
        });

        if (!response.ok) {
            throw new Error('Logout failed');
        }

        // Clear user state after successful logout
        setUser(null);
        console.log('Logged out successfully');
    } catch (error) {
        console.error('Logout error:', error);
    }
};
  return (
    <AuthContext.Provider value={{ user, login, register, logout, postTimeLog }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
