import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const userContext = createContext({});

export default userContext;

export const UserContextProvider = ({ children }) => {
  // Your context provider logic here

  // Example: Initialize user state and setUser function
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate an asynchronous authentication check
    const fakeAuthenticationCheck = async () => {
      try {
        const response = await axios.get('/profile');
        setUser(response.data);
      } catch (error) {
        console.error('Authentication check failed:', error.message);
      }
    };

    fakeAuthenticationCheck(); // Call the authentication check on component mount

    // Clean up logic if needed

  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};
