import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (formData) => {
    console.log('Logging in user:', formData);
    setUser(formData.username);
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
    console.log(timeLogData)
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
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, postTimeLog }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
