import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (formData) => {
    // Implement your login logic here
    // This function should handle login logic, such as making API requests
    // to your backend server to authenticate the user
    console.log('Logging in user:', formData);
    // Example of setting the user after successful login
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
  
      // Registration successful
      console.log('User registered successfully');
      // Optionally, you can handle the response from the server here
    } catch (error) {
      console.error('Error registering user:', error);
      // Optionally, you can handle errors here, such as displaying an error message to the user
    }
  };

  const logout = async () => {
    // Implement your logout logic here
    // This function should handle logout logic, such as clearing user data
    console.log('Logging out user');
    // Example of clearing the user after logout
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
