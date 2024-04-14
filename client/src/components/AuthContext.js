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
    // Implement your registration logic here
    // This function should handle registration logic, such as making API requests
    // to your backend server to register the user
    console.log('Registering user:', formData);
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
