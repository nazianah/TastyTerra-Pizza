import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const userContext = createContext({});

export default userContext;

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fakeAuthenticationCheck = async () => {
      try {
        const response = await axios.get('/profile');
        setUser(response.data);
      } catch (error) {
        console.error('Authentication check failed:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fakeAuthenticationCheck();

    // Clean up logic if needed

  }, []);

  return (
    <userContext.Provider value={{ user, setUser, loading }}>
      {children}
    </userContext.Provider>
  );
};
